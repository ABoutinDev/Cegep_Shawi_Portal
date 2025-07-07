<script setup lang="ts">
import { ref, watch } from 'vue';
import ButtonQty from '../input/ButtonQty.vue';

const props = defineProps<{
  itemId: number;
  iName?: string;
  iPrice?: number;
  iStock?: number;
  imgUrl?: string;
  isSelected?: boolean;
  selectedQuantity?: number;
}>();

const itemQuantity = ref(props.selectedQuantity || 0);

const emit = defineEmits<{
  select: [];
  'quantity-change': [itemId: number, quantity: number];
}>();

const handleClick = () => {
  emit('select');
};

// Watch le parent (ItemList.vue)
watch(() => props.selectedQuantity, (newQuantity) => {
  itemQuantity.value = newQuantity || 0;
}, { immediate: true });

// Emit les updates vers le parent
watch(itemQuantity, (newQuantity) => {
  emit('quantity-change', props.itemId, newQuantity);
});
</script>

<template>
  <div :class="[ 'item-container', { 'item-container-selected': isSelected }]" @click="handleClick">
    <div class="item-info">
      <h5 class="medieval-h5 small-padding">{{ iName }}</h5>
      <h5 class="price small-padding">💰 {{ iPrice }} g</h5>
    </div>
    <div class="item-content">
      <img class="image" :src="imgUrl" alt="img" />
      <div class="item-buttons" @click.stop>
        <ButtonQty v-model="itemQuantity" :min="0" :max="props.iStock" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-container {
  width: 250px;
  height: 300px;
  background-color: var(--dark-grey4);
  border: 1px inset var(--beige3);
  border-radius: 0.5rem;
  box-shadow: 0.25rem 0.25rem 0.25rem hsla(0, 0%, 0%, 0.25);
  transition: all 0.5s ease;
}

.item-container:hover {
  cursor: pointer;
  box-shadow: 0rem 0.15rem 0.25rem 0.25rem var(--beige3);
}

.item-container-selected {
  width: 250px;
  height: 300px;
  
  background-color: var(--dark-grey4);
  border: 1px inset var(--beige3);
  border-radius: 0.5rem;
  box-shadow: 0rem 0.15rem 0.25rem 0.25rem var(--beige3);
}

.item-info {
  width: 100%;
  height: 50px;

  background-color: var(--dark-grey3);
  border-bottom: 1px inset var(--beige3);
  border-radius: 0.5rem 0.5rem 0 0rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-content {
  max-width: 250px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem 0.5rem 0.5rem;
}

.image {
  max-width: 205px;
  height: 205px;
  object-fit: cover;
}

.item-buttons {
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: flex-end;
  margin: 0 0.25rem 0 0.25rem;
}

</style>