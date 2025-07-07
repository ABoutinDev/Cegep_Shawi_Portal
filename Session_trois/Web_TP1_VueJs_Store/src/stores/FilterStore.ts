import { defineStore } from "pinia"
import { computed, ref } from "vue"
import type { FilterType, OperatorType } from '../components/itemType'

export const useFilterStore = defineStore('search', () => {
    const filterActiveRef = ref(false)
    const searchField = ref<FilterType>('name')
    const searchValue = ref<string>('')
    const numSearchValue = ref<number>(0)
    const comparisonOperator = ref<OperatorType>('is equal to')

    const filterActive = computed(() => {
        return filterActiveRef.value
    })

    const comparisonSign = computed(() => {
        switch (comparisonOperator.value) {
            case 'is equal to':
                return '='
            case 'is greater than':
                return '>'
            case 'is less than':
                return '<'
            default:
                return '='
        }
    })

    function resetSearch() {
        filterActiveRef.value = false
        searchField.value = 'name'
        searchValue.value = ''
        numSearchValue.value = 0
        comparisonOperator.value = 'is equal to'
    }

    function toggleFilter(value?: boolean) {
        if (value) {
            filterActiveRef.value = value
            return
        }
        filterActiveRef.value = !filterActiveRef.value
    }

    return {
        filterActive,
        searchField,
        searchValue,
        numSearchValue,
        comparisonOperator,
        comparisonSign,
        resetSearch,
        toggleFilter
    }
})