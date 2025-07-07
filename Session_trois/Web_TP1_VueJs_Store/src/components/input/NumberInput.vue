<script lang="ts" setup>
const props = defineProps<{
  modelValue: number
  desc?: string
  initValue?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', Number(target.value))
}
</script>

<template>
    <div class="input-container">
      <label v-if="props.desc">{{ props.desc }}</label>
      <input type="number" :value="props.modelValue" @input="onInput" >
    </div>
</template>

<style scoped>
.input-container {
  display: grid;
  align-items: center;
  text-align: center;
  grid-template-columns: 1fr 2fr;
}
input {
  color: var(--beige1);
  background-color: var(--neutral5);
  border: 1px solid var(--neutral7);
  border-radius: 8px;
  max-width: 200px;
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