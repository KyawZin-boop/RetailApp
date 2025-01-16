export type ProductType = {
    id: string,
    productCode: string,
    name: string,
    stock: number,
    price: number,
    profitPerItem: number,
    createdDate: string,
    updatedDate: string
}

export type ProductInputType = {
    productCode: string,
    name: string,
    stock: number,
    price: number,
    profitPerItem: number,
}

export type CartType = {
    id: string,
    productCode: string,
    name: string,
    quantity: number,
    stock: number,
    price: number
}

export type CartInputType = {
    productCode: string,
    productName: string,
    quantity: number,
}