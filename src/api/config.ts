import axios from 'axios'

export type ApiResponse<T> = {
    message: string
    status: number
    data: T
}

export type PaginatedType = {
    items: [],
    totalCount: number,
    totalPages: number
}

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7190/api/',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosInstance