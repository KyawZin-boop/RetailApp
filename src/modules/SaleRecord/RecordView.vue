<script setup>
import { fetchSaleReport } from '@/api/sale/queires';
import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const { data: records } = fetchSaleReport.useQuery()

</script>

<template>
<div class="container">
        <main class="w-full px-10">
            <Table class="mt-5">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow class="bg-green-400 hover:bg-green-500 text-lg">
                        <TableHead class="w-[100px] font-bold text-gray-600">No.</TableHead>
                        <TableHead class="font-bold text-gray-600">Product Code</TableHead>
                        <TableHead class="font-bold text-gray-600">Product Name</TableHead>
                        <TableHead class="font-bold text-gray-600">Quantity</TableHead>
                        <TableHead class="font-bold text-gray-600">Selling Price</TableHead>
                        <TableHead class="font-bold text-gray-600">ProfitPerItem</TableHead>
                        <TableHead class="font-bold text-gray-600">Total Profit</TableHead>
                        <TableHead class="font-bold text-gray-600">Total Price</TableHead>
                        <TableHead class="font-bold text-gray-600">Sale Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(record, index) in records" :key="record">
                        <TableCell>{{ index + 1 }}</TableCell>
                        <TableCell>{{ record.productCode }}</TableCell>
                        <TableCell>{{ record.name }}</TableCell>
                        <TableCell>{{ record.quantity }}</TableCell>
                        <TableCell>$ {{ record.sellingPrice }}</TableCell>
                        <TableCell>$ {{ record.profitPerItem }}</TableCell>
                        <TableCell>$ {{ record.totalProfit }}</TableCell>
                        <TableCell>$ {{ record.totalPrice }}</TableCell>
                        <TableCell>{{ new Date(record.saleDate).toISOString().split('T')[0] }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </main>
    </div>
</template>