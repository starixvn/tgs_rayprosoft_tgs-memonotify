export interface HttpClientResponse<TBody> {
    statusCode: number;
    body: TBody;
}
export interface HttpClientAdapter {
    put<TRequest, TBody>(url: string, request: TRequest): Promise<HttpClientResponse<TBody | null>>;
}
