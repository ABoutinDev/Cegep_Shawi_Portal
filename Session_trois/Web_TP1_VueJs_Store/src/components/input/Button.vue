<script lang="ts" setup>
import { computed } from 'vue';
import type { FilterType, ItemType } from '../itemType'

const props = defineProps<{
    text: string
    color?: string
    position?: string
    active?: boolean
    action?: string
}>()

const buttonClasses = computed(() => [
  props.color,
  props.position,
  { active: props.active }
])

const emit = defineEmits<{
    'toggle-admin': [void]
    'open-form': [id: number]
    "display-filter-form": [void]
    "open-cart": [void]
    'save': [item: ItemType]
    'add': [item: ItemType]
    'delete-item': [id: number]
    'confirm-delete': [void]
    'search': [searchField: FilterType, searchValue: string, comparisonOperator?: string]
    'clear': [void]
    'cancel': [void]
}>()
</script>

<template>
    <button :class="buttonClasses" :disabled="props.active" @click="emit(props.action as any)">
        <slot>{{ props.text }}</slot>
    </button>
</template>

<style scoped>
/* Main styles */
button {
    color: var(--beige1);
    background-color: var(--neutral5);
    border: 1px solid var(--neutral7);
    border-radius: 8px;
    padding: 0.3em 0.8em;
    font-size: 1.1em;
    font-family: inherit;
    cursor: pointer;
    box-shadow: -5px -5px 8px var(--neutral6) inset;
}
button:hover {
    background-color: var(--neutral4);
}
button:active {
    background-color: var(--neutral3);
}

/* Active user header button */
button.active {
    cursor: default;
    color: var(--neutral4);
    background-color: var(--beige1);
    box-shadow: -5px -5px 8px var(--beige2) inset;
}

/* Custom radius */
.left {
    border-radius: 0 0 0 8px;
    border-right: none;
}
.center {
    border-radius: 0;
    border-left: none;
    border-right: none;
    width: 6rem;
}
.right {
    border-radius: 0 0 8px 0;
    border-left: none;
}

/* Custom color */
.green {
    background-color: var(--green-bg);
    box-shadow: -5px -5px 8px var(--green-shadow) inset;
}
.green:hover {
    background-color: var(--green-hover);
}
.green:active {
    background-color: var(--green-active);
}
.red {
    background-color: var(--red-bg);
    box-shadow: -5px -5px 8px var(--red-shadow) inset;
}
.red:hover {
    background-color: var(--red-hover);
}
.red:active {
    background-color: var(--red-active);
}

.beige {
    background-color: var(--beige2);
    box-shadow: -5px -5px 8px var(--beige-shadow) inset;
}
.beige:hover {
    background-color: var(--beige3);
    text-shadow: 0 0.5rem 1rem var(--dark-grey3);
}
</style>