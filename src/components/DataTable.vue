<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, SortingState, ColumnFiltersState, VisibilityState, } from '@tanstack/vue-table'
import { Pagination, PaginationEllipsis, PaginationFirst, PaginationLast, PaginationList, PaginationListItem, PaginationNext, PaginationPrev, } from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/vue-table'
import { Button } from './ui/button';
import { valueUpdater } from '@/lib/utils'
import { ref } from 'vue';

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  dataInfo: any
  page: number;
  pageSize: number;
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
  },
})

const emit = defineEmits(['page-change', 'page-size-change']);

const onPageChange = (newPage: number) => {
  emit('page-change', newPage);
};

const onPageSizeChange = (newPageSize: number) => {
  emit('page-size-change', newPageSize);
};
</script>

<template>
  <div class="flex items-center py-4">
    <Input class="max-w-sm" placeholder="Filter Product Code..."
      :model-value="table.getColumn('productCode')?.getFilterValue() as string"
      @update:model-value=" table.getColumn('productCode')?.setFilterValue($event)" />
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline" class="ml-auto">
          Columns
          <ChevronDown class="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
          :key="column.id" class="capitalize" :checked="column.getIsVisible()" @update:checked="(value) => {
            column.toggleVisibility(!!value)
          }">
          {{ column.id }}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
              :props="header.getContext()" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined">
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <!-- custom indexing -->
              <template v-if="cell.column.id === 'No'">
                {{ (row.index+1) + (page - 1) * 10 }}
              </template>
              <template v-else>
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </template>
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
  <template v-if="table.getRowModel().rows?.length">
    <Pagination v-slot="{ page }" :total="dataInfo.totalCount" :sibling-count="1" show-edges :default-page="page"
      @change="onPageChange" class="mt-4 flex justify-end">
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst @click="onPageChange(1)"/>
        <PaginationPrev @click="onPageChange(page - 1)"/>
        <template v-for="(item, index) in items">
          <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
            <Button @click="onPageChange(item.value)" class="w-10 h-10 p-0"
              :variant="item.value === page ? 'default' : 'outline'">
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>
        <PaginationNext @click="onPageChange(page + 1)"/>
        <PaginationLast @click="onPageChange(dataInfo.totalPages)"/>
      </PaginationList>
    </Pagination>
  </template>
</template>