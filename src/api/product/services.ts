import axiosInstance, { ApiResponse } from "../config"
import { ProductType, ProductInputType, ProductDeleteType } from "./types"

const baseUrl = '/Product'

const getAllProducts = async (): Promise<ApiResponse<ProductType[]>> => {
    const response = await axiosInstance.get<ApiResponse<ProductType[]>>(`${baseUrl}/GetAllProducts`)
    
    return response.data;
}

const addProduct = async (product: ProductType): Promise<ApiResponse<ProductInputType>> => {
    const response = await axiosInstance.post<ApiResponse<ProductInputType>>(`${baseUrl}/AddProduct`, product);

    return response.data;
}

const updateProduct = async (product: ProductInputType): Promise<ApiResponse<ProductInputType>> => {
    const response = await axiosInstance.post<ApiResponse<ProductInputType>>(`${baseUrl}/UpdateProduct`, product);

    return response.data;
}

const deleteProduct = async (id: string): Promise<ApiResponse<ProductDeleteType>> => {
    const response = await axiosInstance.post<ApiResponse<ProductDeleteType>>(`${baseUrl}/DeleteProduct?id=${id}`);
    return response.data;
}

export default { getAllProducts, addProduct, updateProduct, deleteProduct }