<script lang="ts" setup>
import InventoryList from './manager/InventoryList.vue'
import ManagerActions from './manager/ManagerActions.vue'
import ItemForm from './manager/ItemForm.vue'
import FilterForm from './manager/FilterForm.vue'
import DeleteWarning from './manager/DeleteWarning.vue'
import NoItemsFound from './manager/NoItemsFound.vue'
import { ref } from 'vue'
import type { ItemType, FilterType, OperatorType } from '../components/itemType'
import { useFilterStore } from '../stores/FilterStore'
import { useItemStore } from '../stores/ItemsStore'

const itemStore = useItemStore()
const filterStore = useFilterStore()

const displayItemForm = ref<boolean>(false)
const displayDeleteWarn = ref<boolean>(false)
const displayFilterForm = ref<boolean>(false)

function openItemForm(id: number) {
  if (id !== -1) {
    itemStore.itemToEdit = itemStore.items.find(i => i.id === id)
  }
  displayItemForm.value = true
}

function closeItemForm() {
  itemStore.itemToEdit = undefined
  displayItemForm.value = false
}

function toggleFilterForm() {
  displayFilterForm.value = !displayFilterForm.value
}

function search(searchField: FilterType, searchValue: string, comparisonOperator?: string) {
  filterStore.toggleFilter(true)
  displayFilterForm.value = false
  filterStore.searchField = searchField

  if (searchField === 'price' || searchField === 'quantity') {
    filterStore.numSearchValue = Number(searchValue)
  } else {
    filterStore.searchValue = searchValue
  }

  if (comparisonOperator) {
    filterStore.comparisonOperator = comparisonOperator as OperatorType
  }
}

function addItem(newItem: ItemType) {
  newItem.id = itemStore.getNewId()

  itemStore.addItem(newItem)
  closeItemForm()
}

function updateItem(updatedItem: ItemType) {
  itemStore.updateItem(updatedItem)
  closeItemForm()
}

function deleteItem(id: number) {
  itemStore.idToDelete = id
  displayDeleteWarn.value = true
}

function cancelDelete() {
  itemStore.idToDelete = -1
  displayDeleteWarn.value = false
}

function confirmDelete() {
  itemStore.deleteItem()
  displayDeleteWarn.value = false
}
</script>

<template>
  <div class="manager-container">
    <TransitionGroup name="fade">
      <ItemForm v-if="displayItemForm" :item="itemStore.itemToEdit" @add="addItem" @save="updateItem" @cancel="closeItemForm" />
      <FilterForm v-if="displayFilterForm" :types="itemStore.availableTypes" @search="search" @cancel="toggleFilterForm" />
      <DeleteWarning v-if="displayDeleteWarn" @confirm="confirmDelete" @cancel="cancelDelete" />
    </TransitionGroup>
    <ManagerActions @open-form="openItemForm" @search="search" @display-filter-form="toggleFilterForm" @clear="filterStore.resetSearch" :filter-active="filterStore.filterActive" />
    <p class="filter-info" v-if="filterStore.filterActive">'{{ filterStore.searchField }}' {{ filterStore.comparisonOperator }} '{{ filterStore.searchField === 'type' || filterStore.searchField === 'name' ? filterStore.searchValue : filterStore.numSearchValue }}'</p>
    <InventoryList v-if="itemStore.items.length > 0" :items="itemStore.items" @open-form="openItemForm" @delete-item="deleteItem" />
    <NoItemsFound v-else />
    <!-- TODO Page nav -->
  </div>
</template>

<style scoped>
.manager-container {
  width: 66%;
}
.filter-info {
  text-transform: capitalize;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: all 0.3s ease;
}
</style>