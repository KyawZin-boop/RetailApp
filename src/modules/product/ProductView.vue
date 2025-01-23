<script setup lang="ts">
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ref, provide, computed, watch } from 'vue'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { storeToRefs } from 'pinia'
import { useLoaderStore } from '@/stores/loaderStore'
import { useCartStore } from '@/stores/CartStore'
import { DeleteProduct, fetchProducts, getProductWithPagination } from '@/api/product/queries'
import ProductDialog from '@/modules/product/chunks/ProductDialog.vue'
import { toast } from '@/components/ui/toast'
import { useQueryClient } from '@tanstack/vue-query'
import DataTable from '@/components/DataTable.vue'
import { columns } from './chunks/ProductColumns'
import { ProductType } from '@/api/product/types'
import { paginationInfo } from '@/api/sale/types'
import { reactive } from 'vue'

const loaderStore = useLoaderStore()
const queryClient = useQueryClient()
const { isLoading } = storeToRefs(loaderStore)

const cartStore = useCartStore()

// const { data } = fetchProducts.useQuery("products")

const isEdit = ref(false)
const isOpen = ref(false)

const updateProduct = ref<ProductType>()

const isDelete = ref(false)
const deleteProductId = ref("")

const { mutate: deleteFn } = DeleteProduct.useMutation({
  onError: (data) => {
    toast({
      title: data.message,
      variant: 'destructive',
    })
  },
  onSuccess: async (data) => {
    isDelete.value = false
    toast({
      title: data.message,
    })
    queryClient.invalidateQueries({
      queryKey: ['getAllProducts']
    })
  }
})

const openAddProductDialog = () => {
  isEdit.value = false
  isOpen.value = true
  updateProduct.value = undefined;
}

 const openEditDialog = (product: ProductType) => {
  isOpen.value = true;
  isEdit.value = true;
  updateProduct.value = product;
}

 const openDeleteDialog = (id: string) => {
  isDelete.value = true;
  deleteProductId.value = id
}

provide('openEditDialog', openEditDialog)
provide('openDeleteDialog', openDeleteDialog)

const closeDialog = () => {
  isOpen.value = false;
  isEdit.value = false;
  updateProduct.value = undefined;
}

const pagination = reactive<paginationInfo>({
  page: 1,
  pageSize: 10,
});

const changePage = (page: number) => {
  pagination.page = page;
};

const changePageSize = (pageSize: number) => {
  pagination.pageSize = pageSize;
};

const queryKey = computed(() => ['getProductWithPagination', pagination.page, pagination.pageSize]);

const { data, refetch } = getProductWithPagination.useQuery(queryKey);

const tableData = computed(() => {
  return data.value?.items || [];
});

// Automatically refetch when pagination changes
watch(
  () => [pagination.page, pagination.pageSize],
  () => {
    refetch();
  }
);

</script>

<template>
      <Button class="bg-blue-500 hover:bg-blue-600 mt-5" @click="openAddProductDialog">Add Product</Button>
      <DataTable
    v-model:page="pagination.page"
    v-model:pageSize="pagination.pageSize"
    :columns="columns"
    :data="tableData"
    :data-info="data"
    @page-change="changePage"
    @page-size-change="changePageSize"
  />
      <div v-if="isLoading" class="text-center mt-5">
        <PulseLoader class="text-gray-500" />
      </div>
      <ProductDialog :isOpen="isOpen" :isEdit="isEdit" :product="updateProduct" :close="closeDialog" />
      <AlertDialog v-bind:open="isDelete">
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to continue?.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel @click="isDelete = false"
              class="bg-gray-500 hover:bg-gray-600 hover:text-white text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction @click="deleteFn(deleteProductId)" class="bg-red-500 hover:bg-red-600 ">Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
</template>