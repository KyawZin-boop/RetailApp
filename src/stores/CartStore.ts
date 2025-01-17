import { CartType } from "@/api/cart/types";
import {  ProductType } from "@/api/product/types";
import { toast } from "@/components/ui/toast";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref<CartType[]>([]);
    const cartTotal = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
    })
    const cartCount = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.quantity, 0);
    })

    const addToCart = (product: ProductType) => {
        const isInCart = cartItems.value.find(x=> x.id === product.id);
        if(isInCart){
            if(isInCart.quantity >= product.stock) {
                toast({
                    title: 'Product is out of stock',
                    variant: 'destructive'
                })
                return;
            };
            isInCart.quantity += 1;
        }
        else{
            cartItems.value.push({...product, quantity: 1});
        }
        toast({
            title: 'Successfully added to cart'
        })
    }

    const removeFromCart = (product: CartType) => {
        cartItems.value = cartItems.value.filter(x => x.id !== product.id);
    }

    const decreaseItem = (product: CartType) => {
        if(product.quantity > 1){
            product.quantity -= 1;
        }else{
            removeFromCart(product);
        }
    }

    const IncreaseItem = (product: CartType) => {
        if(product.quantity >= product.stock) {
            toast({
                title: 'Product is out of stock',
                variant: 'destructive'
            })
            return;
        }
        product.quantity += 1;
        toast({
            title: 'Successfully added to cart'
        })
    }

    return { cartItems, addToCart, removeFromCart, decreaseItem, IncreaseItem, cartTotal, cartCount };

})