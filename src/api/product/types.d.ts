export type ProductType = {
    id: string,
    productCode: string,
    name: string,
    stock: number,
    price: number,
    profitPerItem: number,
    activeFlag: boolean,
}

export type ProductInputType = {
    productCode: string,
    name: string,
    stock: number,
    price: number,
    profitPerItem: number,
}