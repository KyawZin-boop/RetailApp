import axiosInstance, { ApiResponse } from "../config";
import { SaleReportType } from "./types";

const baseUrl = '/Manager'

const getSaleReport = async (): Promise<ApiResponse<SaleReportType[]>> => {
    const response = await axiosInstance.get<ApiResponse<SaleReportType[]>>(`${baseUrl}/GetSaleReport`)
    
    return response.data;
}

export default { getSaleReport }