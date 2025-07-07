<script lang="ts" setup>
import type { FilterType } from '../itemType';

const props = defineProps<{
  initValue?: string | FilterType
  modelValue: string
  options: string[]
}>()

const emit = defineEmits<{
  /* (e: 'update:modelValue', value: string): void; */
  'update:modelValue': [value: string]
}>()

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
     <div class="select-container">
        <select @change="onChange" :value="initValue">
            <option v-if="options.length > 0" v-for="option in props.options" :value="option">{{ option }}</option>
            <option v-else disabled value="">No items available</option>
        </select>
        <font-awesome-icon icon="angle-down" class="icon" />
     </div>
</template>

<style scoped>
.select-container {
    position: relative;
}
select {
  color: var(--beige1);
  background-color: var(--neutral5);
  border: 1px solid var(--neutral7);
  border-radius: 8px;
  width: 100%;
  padding: 0.6em 0.8em;
  font-size: 1.1em;
  font-family: inherit;
  text-transform: capitalize;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px var(--neutral6) inset;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  cursor: pointer;
}
select:focus {
  outline: none;
  border-color: var(--beige3);
}
select:hover {
    background-color: var(--neutral4);
}
.icon {
    font-size: 1.6rem;
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
}
</style>