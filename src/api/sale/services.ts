import { Ref } from "vue";
import axiosInstance, { ApiResponse, PaginatedType } from "../config";
import { ReportDateType, SaleReportType, TotalSummaryType } from "./types";

const baseUrl = '/Manager'

const getSaleReport = async (): Promise<ApiResponse<SaleReportType[]>> => {
    const response = await axiosInstance.get<ApiResponse<SaleReportType[]>>(`${baseUrl}/GetSaleReport`)
    
    return response.data;
}

const getTotalSummary = async (): Promise<ApiResponse<TotalSummaryType>> => {
    const response = await axiosInstance.get<ApiResponse<TotalSummaryType>>(`${baseUrl}/GetTotalSummary`)
    
    return response.data;
}

const getSaleReportWithinDate = async (date: ReportDateType): Promise<ApiResponse<SaleReportType[]>> => {
    const response = await axiosInstance.post<ApiResponse<SaleReportType[]>>(`${baseUrl}/GetSaleReportWithinRange`, date)
    
    return response.data;
}

const getSaleReportWithPagination = async (page: number, pageSize: number): Promise<ApiResponse<PaginatedType>> => {
    const response = await axiosInstance.get<ApiResponse<PaginatedType>>(`${baseUrl}/GetSaleRecordWithPagination?page=${page}&pageSize=${pageSize}`)
    
    return response.data;
}

export default { getSaleReport, getTotalSummary, getSaleReportWithinDate, getSaleReportWithPagination }