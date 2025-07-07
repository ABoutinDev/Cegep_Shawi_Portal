import { defineStore } from "pinia"
import data from '../data/items.json'
import { computed, ref } from "vue"
import type { ItemType } from "../components/itemType"
import { useFilterStore } from "./FilterStore"

export const useItemStore = defineStore('item', () => {
    const filterStore = useFilterStore()
    const itemsRef = ref<ItemType[]>(data)
    const itemToEdit = ref<ItemType | undefined>()
    const idToDelete = ref<number>(-1)

    const items = computed(() => {
        switch(filterStore.searchField) {
            case 'name':
                return itemsRef.value.filter(i => i.name.toLowerCase().includes((filterStore.searchValue as string).toLowerCase()))
            case 'type':
                return filterByType()
            case 'price':
                return filterByNumber()
            case 'quantity':
                return filterByNumber()
            default:
                return itemsRef.value
        }
    })

    function filterByType() {
        return itemsRef.value.filter(i => i.type === filterStore.searchValue)
    }

    function filterByNumber() {
        const field = filterStore.searchField as keyof ItemType
        const input = filterStore.numSearchValue as number

        switch(filterStore.comparisonSign) {
            case '=':
                return itemsRef.value.filter(i => (i[field] as number) === input)
            case '>':
                return itemsRef.value.filter(i => (i[field] as number) > input)
            case '<':
                return itemsRef.value.filter(i => (i[field] as number) < input)
            default:
                return itemsRef.value
        }
    }

    function addItem(newItem: ItemType) {
        itemsRef.value.push(newItem)
    }

    function updateItem(updatedItem: ItemType) {
        const index = itemsRef.value.findIndex(i => i.id === updatedItem.id)
        itemsRef.value[index] = updatedItem
    }

    function deleteItem() {
        const index = itemsRef.value.findIndex(i => i.id === idToDelete.value)
        itemsRef.value.splice(index, 1)
    }

    const availableTypes = computed(() => {
        const types: string[] = []
        itemsRef.value.forEach(item => {
            if (!types.includes(item.type)) {
                types.push(item.type)
            }
        })
        return types
    })

    function getNewId() {
        const lastIndex = items.value.length - 1
        return items.value[lastIndex].id + 1
    }

    return {
        items,
        itemToEdit,
        idToDelete,
        availableTypes,
        addItem,
        updateItem,
        deleteItem,
        getNewId
    }
})