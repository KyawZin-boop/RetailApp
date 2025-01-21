<script setup >
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ref, reactive } from 'vue'
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
import { DeleteProduct, fetchProducts } from '@/api/product/queries'
import ProductDialog from '@/components/ProductDialog.vue'
import { toast } from '@/components/ui/toast'
import { useQueryClient } from '@tanstack/vue-query'

const loaderStore = useLoaderStore()
const queryClient = useQueryClient()
const { isLoading } = storeToRefs(loaderStore)

const cartStore = useCartStore()

const { data } = fetchProducts.useQuery("products")

const isEdit = ref(false)
const isOpen = ref(false)

const updateProduct = ref({})

const isDelete = ref(false)
const deleteProductId = ref("")

const { mutate: deleteFn } = DeleteProduct.useMutation({
    onError: (data) => {
        toast({
            title: data.message,
            variant: 'destructive',
        })
    },
    onSuccess:  async (data) => {
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
  updateProduct.value = {};
}

const openEditDialog = (product) => {
  isOpen.value = true;
  isEdit.value = true;
  updateProduct.value = product;
}

const openDeleteDialog = (id) => {
  isDelete.value = true;
  deleteProductId.value = id
}

const closeDialog = () => {
  isOpen.value = false;
  isEdit.value = false;
  updateProduct.value = null;
}

</script>

<template>
  <div class="container">
    <main class="w-full px-10">
      <Button class="bg-blue-500 hover:bg-blue-600 mt-5" @click="openAddProductDialog">Add Product</Button>
      <Table class="mt-5">
        <TableHeader>
          <TableRow class="bg-green-400 hover:bg-green-500 text-lg">
            <TableHead class="w-[100px] font-bold text-gray-600 text-center">No.</TableHead>
            <TableHead class="font-bold text-gray-600 text-center">Code</TableHead>
            <TableHead class="font-bold text-gray-600 text-center">Name</TableHead>
            <TableHead class="font-bold text-gray-600 text-center">Stock</TableHead>
            <TableHead class="font-bold text-gray-600 text-center">Price</TableHead>
            <TableHead class="font-bold text-gray-600 text-center">ProfitPerItem</TableHead>
            <TableHead class="font-bold text-gray-600 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(product, index) in data" :key="index + 1">
            <TableCell class="text-center">{{ index + 1 }}</TableCell>
            <TableCell class="text-center">{{ product.productCode }}</TableCell>
            <TableCell class="text-center">{{ product.name }}</TableCell>
            <TableCell class="text-center">{{ product.stock }}</TableCell>
            <TableCell class="text-center">$ {{ product.price }}</TableCell>
            <TableCell class="text-center">$ {{ product.profitPerItem }}</TableCell>
            <TableCell class="flex gap-2 text-white flex justify-evenly">
              <button class="bg-blue-500 hover:bg-blue-600 rounded-md p-2 px-4" @click="cartStore.addToCart(product)">Add to Cart</button>
              <div>
                <button class="bg-yellow-500 hover:bg-yellow-600 rounded-md p-2 px-4 me-2" @click="openEditDialog(product)">Edit</button>
                <button class="bg-red-500 hover:bg-red-600 rounded-md p-2 px-4" @click="openDeleteDialog(product.id)">Delete</button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
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
                    <AlertDialogCancel @click="isDelete = false" class="bg-gray-500 hover:bg-gray-600 hover:text-white text-white">Cancel</AlertDialogCancel>
                    <AlertDialogAction @click="deleteFn(deleteProductId)" class="bg-red-500 hover:bg-red-600 ">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </main>
  </div>
</template>