<script lang="ts" setup>
const props = defineProps<{
    modelValue: string
    placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
    <input type="text" :value="props.modelValue" :placeholder="props.placeholder" @input="onInput" >
</template>

<style scoped>
input {
  color: var(--beige1);
  background-color: var(--neutral5);
  border: 1px solid var(--neutral7);
  border-radius: 8px;
  padding: 0.6em 0.8em;
  font-size: 1.1em;
  font-family: inherit;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px var(--neutral6) inset;
}
input:focus {
  outline: none;
  border-color: var(--beige3);
}
</style>