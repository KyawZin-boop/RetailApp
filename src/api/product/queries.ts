import { keepPreviousData, useMutation, UseQueriesOptions, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from "@tanstack/vue-query"
import { ProductDeleteType, ProductType } from "./types"
import { ApiResponse, PaginatedType } from "../config"
import productServices from "./services"
import { ComputedRef } from "vue"

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

export const DeleteProduct = {
    useMutation: (opt?: UseMutationOptions<any, Error, string, any>) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationKey: ['deleteProduct'],
            mutationFn: (id: string) => productServices.deleteProduct(id),
            ...opt
        })
    }
}

export const getProductWithPagination = {
    useQuery: (queryKey: ComputedRef, opt?: UseQueryOptions<PaginatedType, Error>) =>
        useQuery<PaginatedType, Error>({
            queryKey,
            queryFn: async () =>{
                var res = await productServices.getProductWithPagination(
                    queryKey.value[1],
                    queryKey.value[2]
                )

                return res.data
            },
            placeholderData: keepPreviousData,
            ...opt
        })
}