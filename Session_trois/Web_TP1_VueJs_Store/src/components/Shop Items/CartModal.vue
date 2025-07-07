<script setup lang="ts">
import { ref, computed } from 'vue';
import { type ItemType } from '../itemType.ts';
import { Tools } from '../../Utility/Tools.ts';
import Button from '../input/Button.vue';
import CartHeader from './CartHeader.vue';
import CartItem from './CartItem.vue';
import ConfirmModal from './ConfirmModal.vue';

const assetsFolder = "../assets/";

const props = defineProps<{
  isOpen: boolean;
  cartItems: ItemType[];
}>();

const emit = defineEmits<{
  close: [void];
  checkout: [items: ItemType[]];
  'quantity-change': [itemId: number, qty: number];
  'remove-item': [itemId: number];
  'clear-cart': [void];
}>();

const closeModal = () => {
  emit('close');
};

const removeItem = (itemId: number) => {
  emit('remove-item', itemId);
};

const total = computed(() => {
  return props.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

const totalQuantity = computed(() => {
  return props.cartItems.reduce((sum, item) => sum + item.quantity, 0);
});

const confirmCheckout = () => {
  emit('checkout', props.cartItems);
  isConfirmModalOpen.value = true;
};

/*# region confirmation modal */
const isConfirmModalOpen = ref(false);

const closeConfirmation = () => {
  isConfirmModalOpen.value = false;
};

function clearCart() {
  emit('clear-cart');
  isConfirmModalOpen.value = false;
}
/*# endregion confirmation modal */
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      
      <div class="modal-header">
        <h3 class="medieval-h1 text-shadow">Customer's cart</h3>
        <Button 
          class="close-cart-button"
          text="X" 
          color="red"
          action="close-modal"
          @click="closeModal" />
      </div>

      <div class="cart-table-header">
        <CartHeader />
      </div>
      
      <div class="cart-table-liste">
        <CartItem 
          v-for="item in cartItems" 
          :key="item.id" 
          :itemId="item.id"
          :iName="item.name" 
          :iType="item.type" 
          :iQty="item.quantity" 
          :iPrice="item.price" 
          :iTotal="(item.price * item.quantity).toFixed(1)" 
          :imgUrl="Tools.getImageUrl(assetsFolder, '/items/', item.fileName)"
          @quantity-change="(itemId, qty) => emit('quantity-change', itemId, qty)"
          @remove-item="removeItem" />

        <div class="modal-footer">
          <div class="total-section">
            <h4 class="medieval-h4">Total {{ totalQuantity }} item(s) </h4>
          </div>
          <span class="price small-padding"> 💰 {{ total.toFixed(1) }} g</span>
          <div class="button-group">         
            <Button 
              v-if="cartItems.length > 0" 
              text="Proceed to checkout" 
              color="green"
              action="close-modal"
              @click="confirmCheckout" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <ConfirmModal
    :isOpen="isConfirmModalOpen"
    :cartItems="props.cartItems"
    @close="closeConfirmation"
    @clearCart="clearCart"/>
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
  width: 90%;
  max-width: 750px;
  max-height: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  background-color: var(--dark-grey3);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 2rem;
}

.close-cart-button {
  width: auto;
  padding: 0.4rem 0.7rem 0.4rem 0.7rem;
}

.item-image {
  max-width: 50px;
  max-height: 50px;
}

.empty-cart {
  text-align: center;
  color: var(--beige2);
  padding: 2rem;
  font-size: 1.1rem;
}

</style>