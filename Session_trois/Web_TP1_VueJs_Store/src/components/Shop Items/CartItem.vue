<script setup lang="ts">
import { ref, watch } from 'vue';
import ButtonQty from '../input/ButtonQty.vue';
import Button from '../input/Button.vue';

const props = defineProps<{
  itemId: number;
  iName?: string;
  iType?: string;
  iQty?: number;
  iPrice?: number;
  iTotal?: string;
  iStock?: number;
  imgUrl?: string;
}>();

const emit = defineEmits<{
  'remove-item': [itemId: number];
  'quantity-change': [itemId: number, qty: number];
}>();

const itemQuantity = ref(props.iQty ?? 1);

// Watch le parent
watch(() => props.iQty, (newQuantity) => {
  itemQuantity.value = newQuantity || 0;
}, { immediate: true });

// Emit les updates vers le parent
watch(itemQuantity, (newQuantity) => {
  emit('quantity-change', props.itemId, newQuantity);
});
</script>

<template>

    <div class="cart-items">
      <img class="icon-image" :src="props.imgUrl" :alt="props.iName" />
      <p> {{ props.iName }} </p>
      <p> {{ props.iType }} </p>
      <p> {{ props.iPrice }} </p>
      <p> {{ props.iTotal }} </p>
      <div class="buttons-actions"> 
        <ButtonQty v-model="itemQuantity" :max="props.iStock"/>
        <Button class="button-remove"
          text="🗑️"
          color="red"
          action="remove-item"
          @click="emit('remove-item', props.itemId)" />
      </div>
    </div>

</template>

<style scoped>

.cart-items {
  display: grid;
  grid-template-columns: 0.5fr 1.2fr 1fr 0.75fr 0.75fr 1.2fr;
  grid-template-rows: auto;
  gap: 0.5rem;
  justify-items: center;
  align-items: center;
  padding: 0rem 1rem 0rem 1rem;
  background-color: var(--dark-grey2);
  border-bottom: 1px solid var(--beige3);
  text-align: center;
}

.cart-items:hover {
  background-color: var(--dark-grey1);
}

.icon-image {
  width: 40px;
  height: 40px;
  background-color: var(--dark-grey4);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttons-actions {
  width: 150px;
  height: 30px;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-remove {
  width: auto;
  padding: 0.25rem;
}
</style>