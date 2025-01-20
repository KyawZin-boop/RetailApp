<script setup>
import { fetchSaleReport, fetchTotalSummary } from '@/api/sale/queires';
import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const { data: records } = fetchSaleReport.useQuery()
const { data: summary } = fetchTotalSummary.useQuery()

</script>

<template>
    <div class="container">
        <main class="w-full px-10">
            <div class="flex gap-5">
                <div
                    class="border border-gray-200 p-3 px-10 my-5 rounded-2xl bg-blue-500 hover:bg-blue-600 text-gray-100 text-center shadow-xl">
                    <p class="text-2xl font-bold">Total Revenue</p>
                    <p class="text-xl font-semibold text-yellow-300">{{ summary?.totalRevenue }}</p>
                </div>
                <div
                    class="border border-gray-200 p-3 px-10 my-5 rounded-2xl bg-blue-500 hover:bg-blue-600 text-gray-100 text-center shadow-xl">
                    <p class="text-2xl font-bold">Total Profit</p>
                    <p class="text-xl font-semibold text-green-300">{{ summary?.totalProfit }}</p>
                </div>
            </div>
            <Table>
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