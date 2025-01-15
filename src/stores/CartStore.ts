import { CartType, ProductType } from "@/api/product/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref<CartType[]>([]);

    const addToCart = (product: ProductType) => {
        const isInCart = cartItems.value.find(x=> x.id === product.id);
        if(isInCart){
            isInCart.quantity += 1;
        }
        else{
            cartItems.value.push({...product, quantity: 1});
        }
        console.log(cartItems.value);
    }

    return { cartItems, addToCart };

})