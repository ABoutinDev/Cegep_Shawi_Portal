<script lang="ts" setup>
import type { ItemType } from '../itemType'
import TextInput from '../input/TextInput.vue'
import NumberInput from '../input/NumberInput.vue'
import ImageInput from '../input/ImageInput.vue'
import Button from '../input/Button.vue'
import { onMounted, ref } from 'vue'

const props = defineProps<{
    item?: ItemType
}>()

const emit = defineEmits<{
    save: [item: ItemType];
    add: [item: ItemType];
    cancel: [void];
}>()

const itemName = ref('');
const itemType = ref('');
const itemPrice = ref(0);
const itemQuantity = ref(0);

onMounted(() => {
    if (props.item) {
        itemName.value = props.item.name
        itemType.value = props.item.type
        itemPrice.value = props.item.price
        itemQuantity.value = props.item.quantity
    }
})

function addItem() {
    if (itemName.value.trim() === '') {
        console.log("Name can't be empty")
        return
    } else if (itemType.value.trim() === '') {
        console.log("Type can't be empty")
        return
    } else if (itemPrice.value < 0) {
        console.log("Invalid price")
        return
    } else if (itemQuantity.value < 0) {
        console.log("Invalid quantity")
        return
    }

    const newItem = {
        id: 0,
        name: itemName.value,
        type: itemType.value,
        price: itemPrice.value,
        quantity: itemQuantity.value,
        fileName: ""
    }
    emit('add', newItem)
}

function saveItem() {
    if (!props.item) return;

    const updatedItem = {
        id: props.item.id,
        name: itemName.value,
        type: itemType.value,
        price: itemPrice.value,
        quantity: itemQuantity.value,
        fileName: ""
    }
    emit('save', updatedItem)
}
</script>

<template>
    <div class="container">
        <form @submit.prevent>
            <h1>{{ item ? 'Edit' : 'Add Item' }}</h1>
            <TextInput placeholder="Name" v-model="itemName"/>
            <TextInput placeholder="Type" v-model="itemType" />
            <NumberInput desc="Price" v-model="itemPrice" />
            <NumberInput desc="Quantity" v-model="itemQuantity" />
            <ImageInput />
            <div class="btn-container">
                <Button v-if="item" text="Save" color="green" action="save" @save="saveItem" />
                <Button v-else text="Add" color="green" action="add" @add="addItem" />
                <Button text="Cancel" color="red" action="cancel" @cancel="emit('cancel')" />
            </div>
        </form>
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
form {
    max-width: 300px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    border-radius: 8px;
    background-color: var(--dark-grey3);
    border: 1px solid var(--beige3);
    box-shadow: -4px -4px 6px var(--dark-grey4) inset;
}
h1 {
    margin: 0;
}
input[type="text"] {
    width: 100%;
}
.btn-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
</style>