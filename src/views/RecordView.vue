<script setup>
import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { onMounted, ref } from 'vue';

const records = ref([]);

onMounted(async() => {
    let response = await fetch('https://localhost:7190/api/Manager/GetSaleReport');
    let data = await response.json();
    records.value = data.data;
})
</script>

<template>
<div class="container">
        <main class="w-full px-10">
            <Table class="mt-5">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow class="bg-green-200 text-lg">
                        <TableHead class="w-[100px] font-bold">No.</TableHead>
                        <TableHead class="font-bold">Product Code</TableHead>
                        <TableHead class="font-bold">Product Name</TableHead>
                        <TableHead class="font-bold">Quantity</TableHead>
                        <TableHead class="font-bold">Selling Price</TableHead>
                        <TableHead class="font-bold">ProfitPerItem</TableHead>
                        <TableHead class="font-bold">Total Profit</TableHead>
                        <TableHead class="font-bold">Total Price</TableHead>
                        <TableHead class="font-bold">Sale Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(record, index) in records" :key="record">
                        <TableCell>{{ index + 1 }}</TableCell>
                        <TableCell>{{ record.productCode }}</TableCell>
                        <TableCell>{{ record.productName }}</TableCell>
                        <TableCell>{{ record.quantity }}</TableCell>
                        <TableCell>$ {{ record.sellingPrice }}</TableCell>
                        <TableCell>$ {{ record.profitPerItem }}</TableCell>
                        <TableCell>$ {{ record.totalProfit }}</TableCell>
                        <TableCell>$ {{ record.totalPrice }}</TableCell>
                        <TableCell>{{ record.saleDate }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </main>
    </div>
</template>