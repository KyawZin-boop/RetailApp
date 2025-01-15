<script setup lang="ts">
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCartStore } from '@/stores/CartStore';
import { ShoppingBagIcon } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore()
const { cartItems } = storeToRefs(cartStore)
</script>

<template>
    <div class="container">
        <main class="w-full px-10">
            <h1 class="text-3xl text-cyan-500 font-semibold text-center mt-3">Your Cart
                <ShoppingBagIcon class="inline ms-2" />
            </h1>
            <div >
                <Table class="mt-5">
                    <TableHeader v-show="cartItems.length != 0">
                        <TableRow class="bg-green-300 hover:bg-green-400 text-lg ">
                            <TableHead class="w-[100px] font-bold text-gray-600 text-center">No.</TableHead>
                            <TableHead class="font-bold text-gray-600 text-center">Code</TableHead>
                            <TableHead class="font-bold text-gray-600 text-center">Name</TableHead>
                            <TableHead class="font-bold text-gray-600 text-center">Quantity</TableHead>
                            <TableHead class="font-bold text-gray-600 text-center">Price</TableHead>
                            <TableHead class="font-bold text-gray-600 text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="(item, index) in cartItems" :key="index + 1">
                            <TableCell class="text-center">{{ index + 1 }}</TableCell>
                            <TableCell class="text-center">{{ item.productCode }}</TableCell>
                            <TableCell class="text-center">{{ item.name }}</TableCell>
                            <TableCell class="text-center">{{ item.quantity }}</TableCell>
                            <TableCell class="text-center">$ {{ item.price }}</TableCell>
                            <TableCell class="flex gap-2 text-white flex justify-center">
                                <button class="bg-red-500 rounded-md p-2 px-4">Remove</button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </main>
    </div>
</template>