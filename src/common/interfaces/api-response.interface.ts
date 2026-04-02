export interface APISuccessResponse<T = any> {
    code: number;
    success: true;
    data: T;
}

export interface ApiErrorResponse {
    code: number;
    success: false;
    message: string;
    error?: any
}