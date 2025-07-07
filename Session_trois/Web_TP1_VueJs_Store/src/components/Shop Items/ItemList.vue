<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Tools } from '../../Utility/Tools.ts';
import Data from '../../data/items.json';
import ItemCard from './ItemCard.vue';
import Button from '../input/Button.vue';

const itemsDb = ref(Data);
const selectedItems = ref<number[]>([]);
const selectedQuantities = ref<{ [itemId: number]: number }>({});

const props = defineProps<{
  clearCartTool?: number;
}>();

const emit = defineEmits<{
  openCart: [cartItems: any[]];
}>();

const selectItem = (itemId: number) => {
  const index = selectedItems.value.indexOf(itemId);
  if (index > -1) {
    // Unselected s'il etait selected
    selectedItems.value.splice(index, 1);
    // Reset la qty apres etre unselected
    selectedQuantities.value[itemId] = 0;
  } else {
    selectedItems.value.push(itemId);
    selectedQuantities.value[itemId] = 1;
  }
};

const isItemSelected = (itemId: number) => {
  return selectedItems.value.includes(itemId);
};

const updateItemQuantity = (itemId: number, quantity: number) => {
  selectedQuantities.value[itemId] = quantity;
  
  // Qty 0 = l'item est unselected
  if (quantity === 0 && selectedItems.value.includes(itemId)) {
    const index = selectedItems.value.indexOf(itemId);
    selectedItems.value.splice(index, 1);
  }
  // Qty > 0 = l'item est selected
  else if (quantity > 0 && !selectedItems.value.includes(itemId)) {
    selectedItems.value.push(itemId);
  }
};

// Fonction pour 'get' la quantiter d'un item
const getSelectedQuantity = (itemId: number) => {
  return selectedQuantities.value[itemId] || 0;
};

// Fonction pour calculer le total cost du panier
const calculateTotal = () => {
  return selectedItems.value.reduce((total, itemId) => {
    const item = itemsDb.value.find(i => i.id === itemId);
    const quantity = selectedQuantities.value[itemId] || 0;
    return total + (quantity * (item?.price || 0));
  }, 0);
};

// Fonction pour obtenir une map des items du panier
const cartItems = computed(() => {
  return selectedItems.value.map(itemId => {
    const item = itemsDb.value.find(i => i.id === itemId);
    return {
      id: itemId,
      name: item?.name || '',
      type: item?.type || '',
      price: item?.price || 0,
      quantity: selectedQuantities.value[itemId] || 0,
      fileName: item?.fileName || ''
    };
  });
});

// Fonction pour ouvrir vers lecheckout
function openCart() {
  emit('openCart', cartItems.value);
}

// Un watcher pour vider les items du shop apres un Print
watch(() => props.clearCartTool, () => {
  selectedItems.value = [];
  selectedQuantities.value = {};
});
</script>

<template> 
  <div class="items-list-container">
    <ItemCard v-for="item in itemsDb" 
      :key="item.id"
      :itemId="item.id" 
      :iName="item.name" 
      :iPrice="item.price" 
      :imgUrl="Tools.getImageUrl('../assets/', 'items/', item.fileName)" 
      :isSelected="isItemSelected(item.id)"
      :iStock="item.quantity"
      :selectedQuantity="getSelectedQuantity(item.id)"
      @select="selectItem(item.id)"
      @quantity-change="updateItemQuantity"/>
  </div>
  <div class="item-list-footer">
    <div class="items-list-selected">
      <h5 class="medieval-h5 small-padding">Items to confirm </h5>
      <ul>
        <li v-for="item in selectedItems" :key="item">
          {{ itemsDb.find(i => i.id === item)?.name }}
          ({{ selectedQuantities[item] || 0 }}) 
          {{ itemsDb.find(i => i.id === item)?.price }} g = 
          {{ (selectedQuantities[item] || 0) * (itemsDb.find(i => i.id === item)?.price || 0) }} g
        </li>
      </ul>
    </div>
      <div>
        <div v-if="selectedItems.length > 0" class="medieval-h5 small-padding">
          <div>Total: <span class="price">{{ calculateTotal() }} g</span></div>
      </div>
    </div>
    <div class="view-cart-button">
      <Button 
        class="small-padding" 
        text="Proceed to payment" 
        color="green" 
        action="open-cart"
        @open-cart="openCart"/>
    </div>
  </div>
</template>

<style scoped>
.items-list-container {
  width: 100%;
  height: auto;
  padding-bottom: 1.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1rem;
}

.item-list-selected {
  width: 100%;
  height: auto;
  padding: 1rem;
  display: flex;
  flex-direction: row;
}

.item-list-footer {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
}

</style>