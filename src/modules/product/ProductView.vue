<script setup>
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ref, reactive } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { Button } from '@/components/ui/button'
import { storeToRefs } from 'pinia'
import { useLoaderStore } from '@/stores/loaderStore'
import { useCartStore } from '@/stores/CartStore'
import { fetchProducts } from '@/api/product/queries'
import ProductDialog from '@/components/ProductDialog.vue'

const loaderStore = useLoaderStore()
const { isLoading } = storeToRefs(loaderStore)

const cartStore = useCartStore()

const { data } = fetchProducts.useQuery("products")


const isEdit = ref(false)
const isOpen = ref(false)
const updateProduct = ref({})

const openAddProductDialog = () => {
  isEdit.value = false
  isOpen.value = true
  updateProduct.value = {};
}

const openEditDialog = (product) => {
  isOpen.value = true
  isEdit.value = true;
  updateProduct.value = product;
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
          <TableRow class="bg-green-300 hover:bg-green-400 text-lg">
            <TableHead class="w-[100px] font-bold text-gray-600">No.</TableHead>
            <TableHead class="font-bold text-gray-600">Code</TableHead>
            <TableHead class="font-bold text-gray-600">Name</TableHead>
            <TableHead class="font-bold text-gray-600">Stock</TableHead>
            <TableHead class="font-bold text-gray-600">Price</TableHead>
            <TableHead class="font-bold text-gray-600">ProfitPerItem</TableHead>
            <TableHead class="font-bold text-gray-600">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(product, index) in data" :key="index + 1">
            <TableCell>{{ index + 1 }}</TableCell>
            <TableCell>{{ product.productCode }}</TableCell>
            <TableCell>{{ product.name }}</TableCell>
            <TableCell>{{ product.stock }}</TableCell>
            <TableCell>$ {{ product.price }}</TableCell>
            <TableCell>$ {{ product.profitPerItem }}</TableCell>
            <TableCell class="flex gap-2 text-white ">
              <button class="bg-blue-500 rounded-md p-2 px-4" @click="cartStore.addToCart(product)">Add to Cart</button>
              <button class="bg-green-400 rounded-md p-2 px-4" @click="openEditDialog(product)">Edit</button>
              <button class="bg-red-500 rounded-md p-2 px-4">Delete</button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div v-if="isLoading" class="text-center mt-5">
        <PulseLoader class="text-gray-500" />
      </div>
      <ProductDialog :isOpen="isOpen" :isEdit="isEdit" :product="updateProduct" :close="closeDialog"/>
    </main>
  </div>
</template>