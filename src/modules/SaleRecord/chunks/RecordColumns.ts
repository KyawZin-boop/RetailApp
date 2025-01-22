import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { ColumnDef } from '@tanstack/vue-table' 
import { h } from 'vue'
import { Button } from '../../../components/ui/button'
import { SaleReportType } from '@/api/sale/types'
import { queryOptions } from '@tanstack/vue-query'

// export interface Payment {
//     id: string
//     amount: number
//     status: 'pending' | 'processing' | 'success' | 'failed'
//     email: string
//   }

export const columns: ColumnDef<SaleReportType>[] = [
  {
    accessorKey: 'No',
    header: () => h('div', { class: 'text-center' }, 'No.'),
    cell: ({ row }) => {
      const id =  row.index + 1

      return h('div', { class: 'text-center font-medium' }, id)
    },
  },
  {
      accessorKey: 'productCode',
      header: () => h('div', { class: 'text-center' }, 'Product Code'),
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
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Product Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
      cell: ({ row }) => {
        const name = (row.getValue('name') as string).toUpperCase()
  
        return h('div', { class: 'text-right font-medium' }, name)
      },
    },
    {
      accessorKey: 'quantity',
      header: ({ column }) => {
        return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Quantity', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
      cell: ({ row }) => {
        const quantity = row.getValue('quantity') as string
  
        return h('div', { class: 'text-right font-medium' }, quantity)
      },
    },
  {
    accessorKey: 'sellingPrice',
    header: () => h('div', { class: 'text-right' }, 'Selling Price'),
    cell: ({ row }) => {
      const sellingPrice = Number.parseFloat(row.getValue('sellingPrice'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(sellingPrice)

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
    accessorKey: 'totalProfit',
    header: ({ column }) => {
      return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Total Profit', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
  },
    cell: ({ row }) => {
      const totalProfit = Number.parseFloat(row.getValue('totalProfit'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(totalProfit)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  },
  {
    accessorKey: 'totalPrice',
    header: ({ column }) => {
      return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Total Price', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
  },
    cell: ({ row }) => {
      const totalPrice = Number.parseFloat(row.getValue('totalPrice'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(totalPrice)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  },
  {
    accessorKey: 'saleDate',
    header: ({ column }) => {
      return h(Button, {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Sale Date', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
  },
    cell: ({ row }) => {
      const saleDate = (row.getValue('saleDate') as string).split('T')[0]

      return h('div', { class: 'text-right font-medium' }, saleDate)
    },
  },
  // {
  //   id: 'actions',
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.getValue('saleId') as string

  //     return h('div', { class: 'relative' }, h(DropdownAction, {
  //       payment,
  //     }))
  //   },
  // },
]