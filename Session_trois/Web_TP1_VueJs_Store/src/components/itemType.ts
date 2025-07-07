export interface ItemType {
    id: number;
    name: string;
    type: string;
    price: number;
    quantity: number;
    fileName: string;
}

export type FilterType = 'name' | 'type' | 'price' | 'quantity'

export type OperatorType = 'is equal to' | 'is greater than' | 'is less than'

