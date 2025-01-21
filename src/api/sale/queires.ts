import { useMutation, UseMutationOptions, UseQueriesOptions, useQuery, useQueryClient } from "@tanstack/vue-query";
import { ReportDateType, SaleReportType, TotalSummaryType } from "./types";
import { ApiResponse } from "../config";
import saleServices from "./services"

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
