<script setup lang="ts">
import PageCustomer from './PageCustomer.vue';
import PageHeader from './PageHeader.vue';
import PageManager from './PageManager.vue';
import { ref } from 'vue';

const admin = ref(true)

const content = {
  customer: {
    title: "The Rusty Satchel's shop",
    subtitle: "Buy new items for your adventure"
  },
  admin: {
    title: "The Rusty Satchel's inventory",
    subtitle: "Manage your shop's inventory"
  }
}

function toggleAdmin() {
  admin.value = !admin.value
}
</script>

<template>

  <div class="template-container">
      <div class="header-container">
        <PageHeader v-if="admin" :title="content.admin.title" :subtitle="content.admin.subtitle" :admin="admin" @toggle-admin="toggleAdmin"/>
        <PageHeader v-else :title="content.customer.title" :subtitle="content.customer.subtitle" :admin="admin" @toggle-admin="toggleAdmin"/>
      </div>
      <div class="page-container">
        <PageManager v-if="admin" />
        <PageCustomer v-else />
      </div>
  </div>

</template>

<style scoped>
.template-container {
  width: 1440px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--dark-grey4);
  border-left: 1px solid var(--beige3);
  border-right: 1px solid var(--beige3);
}

.header-container {
  width: 100%;
  height: auto;
  background-image: url('../assets/background.png');
  background-repeat: no-repeat;
}

.header-title {
  width: 100%;
  height: auto;
}

.page-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

</style>