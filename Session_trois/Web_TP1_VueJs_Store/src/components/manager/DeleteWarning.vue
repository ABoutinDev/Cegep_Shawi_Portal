<script lang="ts" setup>
import Button from '../input/Button.vue';

const emit = defineEmits<{
    confirm: [void];
    cancel: [void];
}>()
</script>

<template>
    <div class="container">
        <div class="warning-container">
            <h3>Are you sure you want to delete this item?</h3>
            <div class="btn-container">
                <Button text="Confirm" color="green" action="confirm-delete" @confirm-delete="emit('confirm')" />
                <Button text="Cancel" color="red" action="cancel" @cancel="emit('cancel')" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
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
.warning-container {
    max-width: 275px;
    padding: 1.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    border-radius: 8px;
    background-color: var(--dark-grey3);
    border: 1px solid var(--beige3);
    box-shadow: -4px -4px 6px var(--dark-grey4) inset;
}
h3 {
    margin: 0;
}
.btn-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
</style>