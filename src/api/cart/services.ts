import axiosInstance, { ApiResponse } from "../config";
import { CartInputType } from "../product/types";

const baseUrl = '/Cart';

const addToCart = async (item: CartInputType[]): Promise<ApiResponse<CartInputType[]>> => {
    const response = await axiosInstance.post<ApiResponse<CartInputType[]>>(`${baseUrl}/AddToCart`, item)

    return response.data
}

export default { addToCart }