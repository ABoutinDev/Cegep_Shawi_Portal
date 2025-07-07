<script lang="ts" setup>
import logoLarge from '../assets/rpg_logo_large.png';
import Button from './input/Button.vue';

defineProps<{
  title?: string;
  subtitle?: string;
  admin?: boolean;
}>();

const emit = defineEmits<{
  toggleAdmin: [void]
}>()
</script>

<template>
  <div class="page-header">
    <div class="button-container">
      <Button text="Manager" position="left" :active="admin" action="toggle-admin" @toggle-admin="emit('toggleAdmin')" />
      <Button text="Customer" position="right" :active="!admin" action="toggle-admin" @toggle-admin="emit('toggleAdmin')" />
    </div>
    <img :src="logoLarge" alt="RPG Logo" class="logo" />
    <div>
      <h1 class="medieval-h1 text-shadow">{{title}}</h1>
      <h3 class="medieval-h3 text-shadow">{{subtitle}}</h3>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  width: 100%;
  display: flex;
  align-items: center;
}
.logo {
  width: 100px;
  height: auto;
  padding: 1.5rem;
}
.button-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-inline: auto; 
  width: fit-content;
}
</style>