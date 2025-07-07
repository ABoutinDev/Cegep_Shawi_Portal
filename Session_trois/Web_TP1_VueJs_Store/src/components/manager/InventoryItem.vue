<script lang="ts" setup>
import Button from '../input/Button.vue'
import type { ItemType } from '../itemType.ts'

defineProps<{
    item: ItemType
}>()

const emit = defineEmits<{
    openForm: [id: number];
    deleteItem: [id: number];
}>()

</script>

<template>
    <article class="item">
        <p>{{ item.id }}</p>
        <p>{{ item.name }}</p>
        <p>{{ item.type }}</p>
        <p>{{ item.price }}</p>
        <p>{{ item.quantity }}</p>
        <div class="actions-container">
            <Button text="Edit" color="green" action="open-form" @open-form="emit('openForm', item.id)" />
            <Button text="X" color="red" action="delete-item" @delete-item="emit('deleteItem', item.id)" />
        </div>
    </article>
</template>

<style scoped>
.item {
    display: grid;
    grid-template-columns: 0.5fr 1.4fr 1.1fr 1fr 1fr 1.2fr;
    text-align: center;
    font-size: 0.93rem;
    max-width: 100%;
    padding: 0.6rem 0;
    border-top: 1px solid var(--beige3);
    box-shadow: -2px -3px 8px var(--dark-grey5) inset;
}
.item:hover {
    background-color: var(--dark-grey3);
}
.actions-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
}
button {
    height: 2.2rem;
}
</style>