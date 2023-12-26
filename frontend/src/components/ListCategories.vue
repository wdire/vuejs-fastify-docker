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
  <div class="category-container">
    <CategoryItem v-for="category in categories" :data="category" :key="category.id" />
  </div>
</template>

<style lang="scss">
.category-container {
  max-width: 100%;
  margin: 30px;
}
</style>
