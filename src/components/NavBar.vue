<script setup lang="ts">
import {RouterLink, useRoute} from 'vue-router'

const isActiveLink = (routePath: string) => {
  const route = useRoute();
  return route.path === routePath;
}

</script>

<template>
  <nav class="bg-green-50">
    <div class="container flex py-4 justify-between items-center">
      <h1 class=" text-blue-400 text-3xl font-bold">Your Freaking Store!</h1>
      <div class="flex gap-20 text-gray-500 text-lg">
        <RouterLink to="/" :class="[isActiveLink('/') ? 'border-b-2 border-blue-500' : 'hover:border-b-2', 'px-3']">Home</RouterLink>
        <RouterLink to="/products" :class="[isActiveLink('/products') ? 'border-b-2 border-blue-500' : 'hover:border-b-2', 'px-3']">Product</RouterLink>
        <RouterLink to="/cart" :class="[isActiveLink('/cart') ? 'border-b-2 border-blue-500' : 'hover:border-b-2', 'px-3']">Cart</RouterLink>
        <RouterLink to="/records" :class="[isActiveLink('/record') ? 'border-b-2 border-blue-500' : 'hover:border-b-2', 'px-3']">Record</RouterLink>
      </div>
      <div class="text-lg">
        <RouterLink to="/cart" class="px-3 rounded-full hover:bg-gray-200"><i class="fa fa-cart-shopping text-blue-500"></i></RouterLink>
      </div>
    </div>
  </nav>
</template>