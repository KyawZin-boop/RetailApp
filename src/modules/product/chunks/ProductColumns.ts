import { ArrowUpDown, ChevronDown, MinusIcon, PlusIcon } from 'lucide-vue-next'
import { ColumnDef } from '@tanstack/vue-table' 
import { h } from 'vue'
import { Button } from '../../../components/ui/button'
import { ProductType } from '@/api/product/types'
import ProductActions from './ProductActions.vue'

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: 'No',
    header: () => h('div', { class: 'text-center' }, 'No.'),
    cell: ({ row }) => {
      const id =  Number.parseInt(row.id) + 1

      return h('div', { class: 'text-center font-medium' }, id)
    },
  },
  {
      accessorKey: 'productCode',
      header: () => h('div', { class: 'text-center' }, 'Code'),
      cell: ({ row }) => {
          const code = (row.getValue('productCode') as string).toUpperCase()
          
          return h('div', { class: 'text-center font-medium' }, code)
        },
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return h(Button, {
            variant: 'ghost',
            class: 'text-left',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
      cell: ({ row }) => {
        const name = (row.getValue('name') as string).toUpperCase()
  
        return h('div', { class: 'text-right font-medium' }, name)
      },
    },
    {
      accessorKey: 'stock',
      header: ({ column }) => {
        return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Stock', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
      cell: ({ row }) => {
        const stock = row.getValue('stock') as string
  
        return h('div', { class: 'text-right font-medium' }, stock)
      },
    },
  {
    accessorKey: 'price',
    header: () => h('div', { class: 'text-right' }, 'Price'),
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  },
  {
    accessorKey: 'profitPerItem',
    header: () => h('div', { class: 'text-right' }, 'Profit Per Item'),
    cell: ({ row }) => {
      const profit = Number.parseFloat(row.getValue('profitPerItem'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(profit)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  },
  {
    accessorKey: 'action',
    header: () => h('div', { class: 'text-right' }, 'Action'),
    cell: ({ row }) => {
      return h(ProductActions, { product: row.original });
    },
  },
]