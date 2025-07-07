<script setup lang="ts">
import { ref } from 'vue';
import ItemList from './Shop Items/ItemList.vue';
import CartModal from './Shop Items/CartModal.vue';

const isCartModalOpen = ref(false);
const cartItems = ref<any[]>([]);
const clearCartTool = ref(0);

function openCartModal(items: any[]) {
  cartItems.value = items;
  isCartModalOpen.value = true;
}

function closeCartModal() {
  isCartModalOpen.value = false;
}

function handleCheckout() {
  isCartModalOpen.value = false;
}

function updateItemQuantity(itemId: number, qty: number) {
  const item = cartItems.value.find(i => i.id === itemId);
  if (item) item.quantity = qty;
}

function removeItemFromCart(itemId: number) {
  cartItems.value = cartItems.value.filter(i => i.id !== itemId);
}

function removeAllItemsFromCart() {
  cartItems.value = [];
  clearCartTool.value++;
}
</script>

<template>
  <div class="customer-page-container">

  <ItemList @openCart="openCartModal" :clearCartTool="clearCartTool" />

  <CartModal 
    :isOpen="isCartModalOpen" 
    :cartItems="cartItems" 
    @close="closeCartModal" 
    @checkout="handleCheckout"
    @quantity-change="updateItemQuantity"
    @remove-item="removeItemFromCart" 
    @clear-cart="removeAllItemsFromCart" />
  </div>
</template>

<style scoped>
</style>