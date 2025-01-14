import { useMutation, UseQueriesOptions, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from "@tanstack/vue-query"
import { ProductType } from "./types"
import { ApiResponse } from "../config"
import productServices from "./services"

export const fetchProducts = {
    useQuery: (Error: any, opt?: UseQueriesOptions<ProductType[]>) =>
        useQuery<ProductType[], Error>({
            queryKey: ['getAllProducts'],
            queryFn: async () => {
                const response: ApiResponse<ProductType[]> = await productServices.getAllProducts();

                return response.data;
            },
            ...opt
        })
}

export const AddProduct = {
    useMutation: (opt?: UseMutationOptions<any, Error, ProductType, any>) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationKey: ['addProduct'],
            mutationFn: (product: ProductType) => productServices.addProduct(product),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getAllProducts']});
            },
            ...opt
        })
    }
}

export const UpdateProduct = {
    useMutation: (opt?: UseMutationOptions<any, Error, ProductType, any>) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationKey: ['updateProduct'],
            mutationFn: (product: ProductType) => productServices.updateProduct(product),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getAllProducts']});
            },
            ...opt
        })
    }
}