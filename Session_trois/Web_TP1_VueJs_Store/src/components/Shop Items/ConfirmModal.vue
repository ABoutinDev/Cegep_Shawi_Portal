<script setup lang="ts">
import { Tools } from '../../Utility/Tools';
import Button from '../input/Button.vue';

const props = defineProps<{
  isOpen: boolean;
  cartItems?: any[];
}>();

const emit = defineEmits<{
  close: [];
  'clear-cart': []
}>();

function closeModal() {
  emit('close');
  emit('clear-cart');
}

function printReceipt() {
  props.cartItems?.forEach(item => {
    console.log(`
    Item: ${item.name}, 
    Type: ${item.type}, 
    Quantity: ${item.quantity}, 
    Price: ${item.price}`);
  });
  console.log(`Total: 💰 ${props.cartItems?.reduce((total, item) => total + (item.price * item.quantity), 0)} gold`);
  emit('clear-cart');
  emit('close');
}
</script>

<template>
  <div v-if="props.isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <div class="medieval-logo">
          <img :src="Tools.getImageUrl('../assets/', '', 'rpg_logo_large.png' )" alt="logo" />
        </div>
        <div class="header-message">
          <h1 class="medieval-h1 text-shadow">
            Purchase confirmation
          </h1>
          <h3 class="medievel-h3 text-shadow">
            The Rusty Satchel's is thanking you for choosing us.
          </h3>
        </div>
      </div>
      <p class="medieval-p text-shadow">
        Your order has been placed successfully. You can now print your receipt or return to the shop.
      </p>
      <div class="items-list">
        <p class="medieval-p text-shadow">
          <strong>Items purchased:</strong>
        </p>
        <ul class="medieval-ul text-shadow">
          <li v-for="(item, index) in props.cartItems" :key="index">
            {{ item.name }} - {{ item.type}} - {{ item.quantity }} x {{ item.price }}
          </li>
        </ul>
        <p class="medieval-p text-shadow"> For a total of
          <span class="price">
            💰 {{ cartItems?.reduce((total, item) => total + (item.price * item.quantity), 0) }} gold
          </span>
          </p>
      </div>
      <div class="buttons">
        <Button 
        text="Print receipt" 
        color="green"
        action=""
        @click="printReceipt" />
        <Button 
        text="Return to shop" 
        color="beige"
        action=""
        @click="closeModal" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  background-color: hsla(0, 0%, 0%, 0.7);
}

.modal-container {
  background-color: var(--dark-grey3);
  border: 2px solid var(--beige3);
  border-radius: 1rem;
  box-shadow: 0 0.5rem 2rem var(--beige3);
  width: auto;
  padding: 2rem;
}

.modal-header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.header-message {
  padding: 1rem;
  flex: 1;
  text-align: left;
}

.items-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}

.buttons {
  width: auto;
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-top: 1rem;
  gap: 1rem;
}

.medieval-logo img {
  position: relative;
  top: 1rem;
  width: 100%;
  height: auto;
  max-width: 85px;
}

li {
  list-style-type: none;
  margin: 0.5rem 0;
}
</style>