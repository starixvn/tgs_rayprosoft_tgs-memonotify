import { AxiosInstance } from 'axios';
import { HttpClientAdapter, HttpClientResponse } from '../services';
export declare class AxiosAdapter implements HttpClientAdapter {
    private _instance;
    /**
     *
     */
    constructor(_instance: AxiosInstance);
    put<TRequest, TBody>(path: string, request: TRequest | null): Promise<HttpClientResponse<TBody | null>>;
}
