<script setup lang="ts">
import { ref, watch } from 'vue';

const prop = withDefaults(defineProps<{
  modelValue?: number;
  min?: number;
  max?: number;
}>(), {
  modelValue: 0,
  min: 0,
  max: 99
});

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

const quantity = ref(prop.modelValue);

watch(() => prop.modelValue, (newValue) => {
  quantity.value = newValue;
});

const updateQuantity = (newValue: number) => {
  const validValue = Math.max(prop.min, Math.min(prop.max, newValue));
  quantity.value = validValue;
  emit('update:modelValue', validValue);
};

const increment = () => {
  updateQuantity(quantity.value + 1);
};

const decrement = () => {
  updateQuantity(quantity.value - 1);
};

const handleManualInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = parseInt(target.value) || 0;
  updateQuantity(value);
};
</script>

<template>
  <div class="buttons-container">
    <button 
      class="minus-button" 
      @click="decrement"
      :disabled="quantity <= prop.min"> - </button>
    
    <input 
      type="number" 
      class="qty-input" 
      :value="quantity"
      @input="handleManualInput"
      :min="prop.min" 
      :max="prop.max"/>
    
    <button 
      class="plus-button" 
      @click="increment"
      :disabled="quantity >= prop.max"> + </button>
  </div>
</template>

<style scoped>
.buttons-container {
  height: 30px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: 2px solid var(--beige2);
  border-radius: 0.5rem;
}

.minus-button {
  width: 30px;
  height: 100%;
  background-color: var(--beige2);
  border: none;
  border-radius: 0.25rem 0 0 0.25rem;
  font-family: "MedievalSharp", cursive;
  font-size: 1.2rem;
  color: var(--dark-grey4);
  cursor: pointer;
  transition: all 0.2s ease;
}

.plus-button {
  width: 30px;
  height: 100%;
  background-color: var(--beige2);
  border: none;
  border-radius: 0 0.25rem 0.25rem 0;
  font-family: "MedievalSharp", cursive;
  font-size: 1.2rem;
  color: var(--dark-grey4);
  cursor: pointer;
  transition: all 0.2s ease;
}


.minus-button:hover,
.plus-button:hover {
  background-color: var(--beige1);
}

.minus-button:disabled,
.plus-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qty-input {
  width: 35px;
  height: 100%;
  text-align: center;
  border: none;
  background-color: var(--beige3);
  font-family: "MedievalSharp", cursive;
  font-size: 1.2rem;
  color: var(--dark-grey4);
}

.qty-input:focus {
  outline: none;
}

/* Note: Masque les flèches qui sont la par default */
.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>