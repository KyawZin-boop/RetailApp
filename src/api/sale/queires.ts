import { keepPreviousData, useMutation, UseMutationOptions, UseQueriesOptions, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/vue-query";
import { paginationInfo, ReportDateType, SaleReportType, TotalSummaryType } from "./types";
import { ApiResponse, PaginatedType } from "../config";
import saleServices from "./services"
import { Info } from "lucide-vue-next";
import { ComputedRef } from "vue";

export const fetchSaleReport = {
    useQuery: (opt?: UseQueriesOptions<SaleReportType[]>) =>
        useQuery<SaleReportType[], Error>({
            queryKey: ['getSaleReport'],
            queryFn: async () => {
                const response: ApiResponse<SaleReportType[]> = await saleServices.getSaleReport();

                return response.data;
            },
            ...opt
        })
}

export const fetchTotalSummary = {
    useQuery: (opt?: TotalSummaryType) =>
        useQuery<TotalSummaryType, Error>({
            queryKey: ['getTotalSummary'],
            queryFn: async () => {
                const response: ApiResponse<TotalSummaryType> = await saleServices.getTotalSummary();

                return response.data;
            },
            ...opt
        })
}

export const getSaleReportWithinDate = {
        useMutation: (opt?: UseMutationOptions<any, Error, ReportDateType, any>) => {
            const queryClient = useQueryClient();
            return useMutation({
                mutationKey: ['getReportWithinDate'],
                mutationFn: (date: ReportDateType) => saleServices.getSaleReportWithinDate(date),
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['getAllProducts']});
                },
                ...opt
            })
        }
    }

export const getSaleReportWithPagination = {
    useQuery: (queryKey: ComputedRef, opt?: UseQueryOptions<PaginatedType, Error>) =>
        useQuery<PaginatedType, Error>({
            queryKey,
            queryFn: async () =>{
                var res = await saleServices.getSaleReportWithPagination(
                    queryKey.value[1],
                    queryKey.value[2]
                )

                return res.data
            },
            placeholderData: keepPreviousData,
            ...opt
        })
}