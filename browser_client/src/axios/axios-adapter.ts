import { AxiosInstance } from 'axios';
import { HttpClientAdapter, HttpClientResponse } from '../services';

export class AxiosAdapter implements HttpClientAdapter {

    /**
     *
     */
    constructor(private _instance: AxiosInstance) {
    }

    put<TRequest, TBody>(path: string, request: TRequest | null): Promise<HttpClientResponse<TBody | null>> {
        return this._instance.put<TBody>(path, request)
            .then(res => {
                return {
                    statusCode: res.status,
                    body: res.data
                };
            });
    }
}