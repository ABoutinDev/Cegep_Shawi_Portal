<template>
    <div class="item-header">
        <p>ID</p>
        <p>Name</p>
        <p>Type</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Actions</p>
    </div>
</template>

<style scoped>
.item-header {
  background-color: var(--dark-grey2);
  display: grid;
  grid-template-columns: 0.5fr 1.4fr 1.1fr 1fr 1fr 1.2fr;
  text-align: center;
  border-radius: 8px 8px 0 0;
  box-shadow: -5px -5px 8px var(--dark-grey3) inset;
}
</style>