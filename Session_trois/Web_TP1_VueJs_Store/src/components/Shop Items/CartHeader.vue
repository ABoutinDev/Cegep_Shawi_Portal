<script lang="ts" setup>
</script>

<template>
  <div class="cart-header">
      <p class="text-image"> Img </p>
      <p class="text-shadow"> Item name </p>
      <p class="text-shadow"> Item type </p>
      <p class="text-shadow"> Price </p>
      <p class="text-shadow"> Total </p>
      <p class="text-actions"> Action </p>    
  </div>
</template>

<style scoped>
.cart-header {
  display: grid;
  grid-template-columns: 0.5fr 1.2fr 1fr 0.75fr 0.75fr 1.2fr;
  grid-template-rows: auto;
  gap: 0.5rem;
  justify-items: center;
  align-items: center;
  padding: 0rem 1rem 0rem 1rem;
  background-color: var(--dark-grey3);
  border-top: 2px solid var(--beige3);
  border-bottom: 2px solid var(--beige3);
  text-align: center;
}

.text-image {
  width: 40px;
  height: 40px;
  background-color: var(--dark-grey4);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.text-actions {
  width: 150px;
  height: 30px;
  background-color: var(--dark-grey4);
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

</style>