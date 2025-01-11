<script setup>
import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { h } from 'vue'
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}))

function onSubmit(values) {
  toast({
    title: 'You submitted the following values:',
    description: h('pre',
      { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
      h('code',
        { class: 'text-white' },
        JSON.stringify(values, null, 2))),
  })
}

const products = ref([]);
const page = ref(1);
const pageSize = ref(20);
const isLoading = ref(true);
onMounted(async () => {
  try {
    const response = await fetch(`https://localhost:7190/api/Product/GetByConditionWithPaginationByDesc?page=${page.value}&pageSize=${pageSize.value}`)
    const data = await response.json()
    products.value = data.data;
  } catch (error) {
    console.log(error);
  } finally {

  }
})

// defineProps({
//     products: Array
// })

</script>

<template>
  <div class="container">
    <main class="w-full px-10">
      <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formSchema">
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="outline">
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
              <FormField v-slot="{ componentField }" name="username">
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="shadcn" v-bind="componentField" />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>
            </form>

            <DialogFooter>
              <Button type="submit" form="dialogForm">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Form>
      <Table class="mt-5">

        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow class="bg-green-200 text-lg">
            <TableHead class="w-[100px] font-bold">No.</TableHead>
            <TableHead class="font-bold">Code</TableHead>
            <TableHead class="font-bold">Name</TableHead>
            <TableHead class="font-bold">Stock</TableHead>
            <TableHead class="font-bold">Price</TableHead>
            <TableHead class="font-bold">ProfitPerItem</TableHead>
            <TableHead class="font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(product, index) in products" :key="product">
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
    </main>
  </div>
</template>