<script setup>
import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { onMounted, ref, reactive } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { h } from 'vue'
import * as z from 'zod'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(50),
  price: z.number().min(1),
  stock: z.number().min(1),
}))

function onSubmit(values) {
  var response = fetch('https://localhost:7190/api/Product/Create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
  response.then(res => {
    if (res.ok) {
      toast({
        title: 'Success',
        description: 'Product created successfully',
      })
  }
    }
  );
}

const page = ref(1);
const pageSize = ref(10);

const state = reactive({
  products: [],
  isLoading: true,
  error: null,
})
onMounted(async () => {
  try {
    const response = await fetch(`https://localhost:7190/api/Product/GetByConditionWithPaginationByDesc?page=${page.value}&pageSize=${pageSize.value}`)
    const data = await response.json();
    state.products = data.data;
  } catch (error) {
    state.error = error
  } finally {
    state.isLoading = false;
  }
})
</script>

<template>
  <div class="container">
    <main class="w-full px-10">
      <Form v-slot="{ handleSubmit }" :validation-schema="formSchema">
        <Dialog>
          <DialogTrigger as-child>
            <Button class="bg-blue-500 hover:bg-blue-600 mt-5">
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle class="text-blue-500">Enter New Product Info</DialogTitle>
            </DialogHeader>

            <form id="dialogForm" @submit.prevent="handleSubmit(onSubmit)">
              <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="price">
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" v-bind="componentField" min="0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="stock">
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" v-bind="componentField" min="0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </form>

            <DialogFooter>
              <Button type="submit" form="dialogForm" class="bg-green-500 hover:bg-green-600">
                Save Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Form>

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
          <TableRow v-for="(product, index) in state.products" :key="product">
            <TableCell>{{ index + 1 }}</TableCell>
            <TableCell>{{ product.productCode }}</TableCell>
            <TableCell>{{ product.name }}</TableCell>
            <TableCell>{{ product.stock }}</TableCell>
            <TableCell>$ {{ product.price }}</TableCell>
            <TableCell>$ {{ product.profitPerItem }}</TableCell>
            <TableCell class="flex gap-2 text-white ">
              <button class="bg-blue-500 rounded-md p-2 px-4">Edit</button>
              <button class="bg-red-500 rounded-md p-2 px-4">Delete</button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div v-if="state.isLoading" class="text-center mt-5">
        <PulseLoader class="text-gray-500" />
      </div>
      <div v-if="state.error" class="text-red-500 text-center mt-5">
        <p>{{ state.error }}</p>
      </div>
    </main>
  </div>
</template>