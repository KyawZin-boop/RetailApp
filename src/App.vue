<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';

// const products = ref([]);

// onMounted(async () => {
//   const response = await fetch('https://localhost:7190/api/Product/GetByConditionWithPaginationByDesc')
//   const data = await response.json()
//   products.value = data.data;
// })
</script>

<template>
  <NavBar />
  <RouterView />
</template>