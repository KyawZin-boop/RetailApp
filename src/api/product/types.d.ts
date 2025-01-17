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


