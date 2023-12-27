<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import axios from 'axios'
import CategoryItem from './CategoryItem.vue'
import type { CategoryType } from '../types/main'

const categories = ref<CategoryType[]>([])

watchEffect(async () => {
  categories.value = (await axios.get('http://localhost:5500/api/category/get-all')).data.data
})
</script>

<template>
  <h1>Categories</h1>
  <div class="category-container">
    <CategoryItem v-for="category in categories" :data="category" :key="category.id" />
    <div v-if="categories.length == 0">Empty</div>
  </div>
</template>

<style scoped lang="scss">
h1 {
  margin: 20px 0px 10px 30px;
}

.category-container {
  max-width: 100%;
  margin-left: 30px;
}
</style>
