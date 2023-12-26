<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import axios from 'axios'

const categories = ref(null)

watchEffect(async () => {
  categories.value = (await axios.get('http://localhost:5500/api/category/get-all')).data
})
</script>

<template>
  <main>
    <pre>{{ categories && JSON.stringify(categories, null, 1) }}</pre>
  </main>
</template>
