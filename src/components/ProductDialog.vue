<script setup>
import { useToast } from './ui/toast'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form'
import { useLoaderStore } from '@/stores/loaderStore'
import { toTypedSchema } from '@vee-validate/zod'

const { toast } = useToast()
const { loadingOn, loadingOff } = useLoaderStore()

defineProps({
    isEdit: Boolean,
    product: Object
})

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

const { mutate: updateProduct } = UpdateProduct.useMutation({
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

function onSubmit(values) {
  if(isEdit){
    updateProduct(values);
  }
  else{
    addProduct(values)
  }
  toast({
    variant: 'success',
    description: 'Success.',
  });
}

const initializeForm = () => {
    if (isEdit) {
        setValues({
            productCode: product.productCode || '',
            name: product.name || '',
            stock: product.stock || '',
            price: product.price || '',
            profitPerItem: product.profitPerItem || '',
        })
    } else {
        // Reset form when not in edit mode
        resetForm()
    }
}
</script>

<template>
    <Form v-slot="{ handleSubmit }" :validation-schema="formSchema">
        <Dialog>
          <DialogTrigger as-child>
            <Button class="bg-blue-500 hover:bg-blue-600 mt-5">
              {{ isEdit ? 'Edit ' : 'Add ' }}Product
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle class="text-blue-500">{{  isEdit ? 'Update ' : 'Add ' }}Product Info</DialogTitle>
            </DialogHeader>

            <form id="dialogForm" @submit.prevent="handleSubmit(onSubmit)">
              <FormField v-slot="{ componentField }" name="productCode">
                <FormItem>
                  <FormLabel>Product Code</FormLabel>
                  <FormControl>
                    <Input type="text" v-bind="componentField"/>
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
</template>