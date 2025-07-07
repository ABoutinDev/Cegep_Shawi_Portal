<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { OperatorType, FilterType } from '../itemType'
import Button from '../input/Button.vue'
import SelectInput from '../input/SelectInput.vue'
import NumberInput from '../input/NumberInput.vue'
import { useFilterStore } from '../../stores/FilterStore'

const filterStore = useFilterStore()

const selectedField = ref<FilterType>(filterStore.searchField)
const selectedOperator = ref<OperatorType>(filterStore.comparisonOperator)
const selectedValue = ref<string>(filterStore.searchValue)
const numSelectedValue = ref<number>(filterStore.numSearchValue)

const props = defineProps<{
    types: string[]
}>()

onMounted(() => {
    if (filterStore.searchField === 'name') {
        selectedField.value = 'type'
        selectedValue.value = props.types[0]
    }
})

const options: Record<FilterType, string[]> = {
    name: [],
    type: ['is equal to'],
    price: ['is equal to', 'is greater than', 'is less than'],
    quantity: ['is equal to', 'is greater than', 'is less than']
}

const emit = defineEmits<{
    cancel: [void]
    search: [searchField: FilterType, searchValue: string, comparisonOperator?: string]
}>()

function search(searchField: FilterType, searchValue: string, comparisonOperator?: string) {
    let convertedValue = searchValue;
    if (searchField !== 'type') {
        convertedValue = numSelectedValue.value.toString()
    }
    emit('search', searchField, convertedValue, comparisonOperator)
}
</script>

<template>
    <div class="container">
        <form @submit.prevent>
            <h1>Filter</h1>
            <div class="action-btn-container">
                <Button text="Confirm" color="green" action="search" @search="search(selectedField, selectedValue, selectedOperator)" />
                <Button text="Cancel" color="red" action="cancel" @cancel="emit('cancel')" />
            </div>
            <div class="filter-container">
                <SelectInput :init-value="selectedField" :options="['type', 'price', 'quantity']" v-model="selectedField" />
                <SelectInput :init-value="selectedOperator" :options="options[selectedField]" v-model="selectedOperator" />
                <SelectInput v-if="selectedField === 'type'" :init-value="selectedValue" :options="props.types" v-model="selectedValue" />
                <NumberInput v-else v-model:="numSelectedValue" :init-value="filterStore.numSearchValue" />
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
.filter-container {
    display: grid;
    grid-template-columns: repeat(3, 200px);
    gap: 1rem;
    padding: 1rem 0;
}
.action-btn-container {
    display: flex;
    gap: 1rem;
}
</style>