import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';

export type ApiResult<T> = [T, null] | [null, string];


interface CustomAxiosInstance extends Omit<AxiosInstance, 'get' | 'post' | 'put' | 'delete'> {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResult<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResult<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResult<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResult<T>>;
}

const baseClient = axios.create({
    baseURL: 'http://localhost:3000'
});

baseClient.interceptors.response.use(
    ((response: AxiosResponse) => {
        return [response.data, null];
    }) as any,

    ((error: AxiosError<{ message?: string }>) => {
        const errorMessage = error.response?.data?.message || error.message || 'Serverside error';
        console.error('API Error:', errorMessage);
        return [null, errorMessage];
    }) as any
);

const client = baseClient as CustomAxiosInstance;
export default client;