<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useCartStore } from '@/stores/CartStore';
import { ShoppingBagIcon, MinusIcon, PlusIcon } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { storeCart } from '@/api/cart/queries';
import { useLoaderStore } from '@/stores/loaderStore';
import { useQueryClient } from '@tanstack/vue-query';
import { toast } from '@/components/ui/toast';

const cartStore = useCartStore()
const { cartItems, cartTotal } = storeToRefs(cartStore)
const { loadingOn, loadingOff } = useLoaderStore()
const isOpen = ref(false)
const checkOut = ref(false)
const queryClient = useQueryClient();

const { mutate: store } = storeCart.useMutation({
    
    onMutate: loadingOn,
    onError: () => {
    },
    onSuccess: () => {
        console.log()
        toast({
            title: "Success.",
        })
    },
    onSettled: () => {
        loadingOff(),
        queryClient.invalidateQueries({
            queryKey: ['getAllProducts']
        })
    }
})

const isCheckOut = () => {
    isOpen.value = true
}

const storeToReport = () => {
    if(checkOut.value) {
        
    }
}

watch(checkOut, () => {
    storeToReport()
})

</script>

<template>
    <div class="container">
        <main class="w-full p-10 pt-5">
            <h1 class="text-3xl text-cyan-500 font-semibold text-center">Your Cart
                <ShoppingBagIcon class="inline ms-2" />
            </h1>
            <div v-if="cartItems.length == 0">
                <h2 class="text-4xl text-red-500 font-semibold text-center mt-5">There's no Item in Cart!</h2>
            </div>
            <div v-else>
                <Table class="mt-5 border">
                    <TableHeader>
                        <TableRow class="bg-green-400 hover:bg-green-500 text-lg ">
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
                            <TableCell class="text-center">
                                <div class="flex justify-evenly items-center">
                                    <span
                                        class=" rounded-full px-2 font-semibold text-red-600 cursor-pointer hover:bg-gray-200 select-none"
                                        @click="cartStore.decreaseItem(item)">
                                        <MinusIcon />
                                    </span>
                                    <span class="w-[30px]">{{ item.quantity }}</span>
                                    <span
                                        class="rounded-full align-middle px-2 font-semibold text-green-600 cursor-pointer hover:bg-gray-200 select-none"
                                        @click="cartStore.IncreaseItem(item)">
                                        <PlusIcon />
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell class="text-center">$ {{ item.price }}</TableCell>
                            <TableCell class="flex gap-2 text-white flex justify-center">
                                <button class="bg-red-500 rounded-md p-2 px-4"
                                    @click="cartStore.removeFromCart(item)">Remove</button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div class="flex justify-end my-5">
                    <h1 class="text-2xl font-semibold text-blue-600">Total Price:<span class="text-gray-700"> $ {{
                        cartTotal }}</span></h1>
                </div>
                <div class="flex justify-end">
                    <Button class="bg-blue-500 hover:bg-blue-600" @click="isCheckOut">Checkout</Button>
                </div>
            </div>
        </main>
        <AlertDialog v-bind:open="isOpen">
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel @click="isOpen = false">Cancel</AlertDialogCancel>
                    <AlertDialogAction @click="checkOut = true">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
</template>