<script setup lang="ts">
import { ref } from 'vue'
import Button from '../input/Button.vue'
import TextInput from '../input/TextInput.vue'
import type { FilterType } from '../itemType'

const searchValue = ref<string>('')

defineProps<{
  filterActive: boolean
}>()

const emit = defineEmits<{
  openForm: [id: number]
  search: [searchField: FilterType, searchValue: string, comparisonOperator?: string]
  displayFilterForm: [void]
  clear: [void]
}>()

function search(searchField: FilterType, searchValue: string, comparisonOperator?: string) {
  if (searchValue.trim() === '') {
        console.log("Search prompt can't be empty")
        return
    }
  emit('search', searchField, searchValue, comparisonOperator)
}

function filter() {
  emit('displayFilterForm')
}

function clear() { 
  searchValue.value = ''
  emit('clear')
}
</script>

<template>
    <div class="actions-container">
      <div>
        <TextInput placeholder="Search by Name" v-model="searchValue" />
        <Button text="Search" action="search" @search="search('name', searchValue)" />
        <Button text="Filter" action="display-filter-form" @display-filter-form="filter" />
        <Button v-if="filterActive" text="Clear" color="red" action="clear" @clear="clear" />
      </div>
      <Button text="Add Item" color="green" action="open-form" @open-form="emit('openForm', -1)" />
    </div>
</template>

<style scoped>
.actions-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 2.2rem;
}
.actions-container div {
  display: flex;
  gap: 0.5rem;
}
</style>