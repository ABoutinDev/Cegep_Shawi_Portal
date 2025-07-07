<script lang="ts" setup>
import InventoryHeader from './InventoryHeader.vue'
import InventoryItem from './InventoryItem.vue'
import type { ItemType } from '../itemType'

defineProps<{
    items: ItemType[]
}>()

const emit = defineEmits<{
    openForm: [id: number];
    deleteItem: [id: number];
}>()
</script>

<template>
    <div class="item-list">
        <InventoryHeader />
        <TransitionGroup name="list" tag="div">
            <InventoryItem v-if="items" v-for="item in items" :item="item" :key="item.id" @open-form="emit('openForm', item.id)" @delete-item="emit('deleteItem', item.id)" />
        </TransitionGroup>
    </div>
</template>

<style scoped>
.item-list {
    margin: 1rem 0;
    border: 1px solid var(--beige3);
    border-radius: 8px;
    overflow: hidden;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}

.list-enter-to,
.list-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>