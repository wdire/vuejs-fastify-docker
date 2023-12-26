<script setup lang="ts">
import type { CategoryType } from '@/types/main'
import DownIcon from '@/components/icons/DownIcon.vue'
import type { PropType } from 'vue'

const props = defineProps({
  data: {
    type: Object as PropType<CategoryType>,
    required: true
  }
})
</script>

<template>
  <label class="category-item" :data-id="props.data.id">
    <input type="checkbox" value="true" v-if="data.children?.length > 0" />

    <div class="category-label">
      <div class="category-down-icon" v-if="data.children?.length > 0"><DownIcon /></div>
      {{ props.data.name }}
    </div>
    <div class="children-container">
      <CategoryItem
        v-for="childCategory in props.data.children"
        :data="childCategory"
        :key="childCategory.id"
      />
    </div>
  </label>
</template>

<style lang="scss">
.category-item {
  input[type='checkbox'] {
    position: absolute;
    opacity: 0;
  }

  width: 320px;
  display: block;

  & > input[type='checkbox']:checked + .category-label {
    background-color: #2b709e;
  }

  & > input[type='checkbox']:checked + .category-label .category-down-icon {
    transform: rotate(180deg);
  }

  & > input[type='checkbox']:checked ~ .children-container {
    max-height: 500px;
    transition: max-height 0.25s ease-in;
    overflow-y: auto;
  }

  .category-item {
    margin-left: 20px;
  }
}

.children-container {
  max-height: 0;
  transition: max-height 0.15s ease-out;
  overflow: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #345062;
    border-radius: 0px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
  }
}

.category-label {
  display: flex;
  align-items: center;
  border: 1px solid #2980b9;
  background-color: #3498db;
  color: #ffffff;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    background-color: #28658e;
  }
}

.category-down-icon {
  position: relative;
  width: 24px;
  height: 24px;
  color: #ffffff;
  margin-right: 5px;
  margin-left: -10px;
  transition: transform 0.26s ease;
}
</style>
