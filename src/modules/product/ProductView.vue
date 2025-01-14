<script setup>
import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ref, reactive } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form'
import { storeToRefs } from 'pinia'
import { Input } from '@/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useLoaderStore } from '@/stores/loaderStore'
import { useToast } from '@/components/ui/toast/use-toast'
import { AddProduct, fetchProducts } from '@/api/product/queries'

const { toast } = useToast()
const { loadingOn, loadingOff } = useLoaderStore()


const loaderStore = useLoaderStore()
const { isLoading } = storeToRefs(loaderStore)

const formSchema = toTypedSchema(z.object({
  productCode: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  price: z.number().min(1),
  stock: z.number().min(1),
}))

const { mutate: addProduct } = AddProduct.useMutation({
  onMutate: loadingOn,
  onError: () => {
    toast({
      title: 'error',
      description: 'error',
      variant: 'destructive',
    })
  },
  onSettled: () => {
    loadingOff()
  }
})

function onAddSubmit(values) {
  addProduct(values);
  toast({
    variant: 'success',
    description: 'Added new product.',
  });
}

const page = ref(1);
const pageSize = ref(10);
const updateProduct = reactive();

const { data } = fetchProducts.useQuery();

function getData(id) {
  updateProduct.value = data?.value.filter(product => product.id === id)[0];
}

const openEdit = ref(false);

const openEditDialog = (product) => {
  console.log("Edit");
  console.log(product);
  openEdit.value = true;

}
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

            <form id="dialogForm" @submit.prevent="handleSubmit(onAddSubmit)">
              <FormField v-slot="{ componentField }" name="productCode">
                <FormItem>
                  <FormLabel>Product Code</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
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
              <FormField v-slot="{ componentField }" name="profitPerItem">
                <FormItem>
                  <FormLabel>Profit Per Item</FormLabel>
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
          <TableRow v-for="(product, index) in data" :key="index + 1">
            <TableCell>{{ index + 1 }}</TableCell>
            <TableCell>{{ product.productCode }}</TableCell>
            <TableCell>{{ product.name }}</TableCell>
            <TableCell>{{ product.stock }}</TableCell>
            <TableCell>$ {{ product.price }}</TableCell>
            <TableCell>$ {{ product.profitPerItem }}</TableCell>
            <TableCell class="flex gap-2 text-white ">
              <Button @click="openEditDialog(product)" class="bg-blue-500 hover:bg-blue-600 mt-5">
                Edit
              </Button>
              <Form  v-slot="{ handleSubmit }" :validation-schema="formSchema">
                <Dialog v-if="openEdit">

                  <DialogContent class="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle class="text-blue-500">Enter New Product Info</DialogTitle>
                    </DialogHeader>

                    <ProductDialog :product="product" :isEdit="openEdit" />

                    <form id="dialogForm" @submit.prevent="handleSubmit(onUpdateSubmit)">
                      <FormField v-slot="{ componentField }" name="productCode" v-bind="product">
                        <FormItem>
                          <FormLabel>Product Code</FormLabel>
                          <FormControl>
                            <Input type="text" v-bind="componentField" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </FormField>
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
                      <FormField v-slot="{ componentField }" name="profitPerItem">
                        <FormItem>
                          <FormLabel>Profit Per Item</FormLabel>
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

              <button class="bg-red-500 rounded-md p-2 px-4">Delete</button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div v-if="isLoading" class="text-center mt-5">
        <PulseLoader class="text-gray-500" />
      </div>
    </main>
  </div>
</template>