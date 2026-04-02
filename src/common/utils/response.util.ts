import { ApiErrorResponse, APISuccessResponse } from "../interfaces/api-response.interface";

export class ResponseUtil {
    static success<T>(data: T): APISuccessResponse<T> {
        return {
            code: 200,
            success: true,
            data,
        }
    }
    static error(code: number, message: string, err?: any): ApiErrorResponse {
        return {
            code,
            success: false,
            message,
            error: err
        }
    }
}