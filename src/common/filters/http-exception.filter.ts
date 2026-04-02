import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { ResponseUtil } from "../utils/response.util";
import { Response } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        let status = 500
        let message = 'Internal Server Error'

        if (exception instanceof HttpException) {
            status = exception.getStatus()

            const res = exception.getResponse() as any
            message = res?.message || exception.message
        }

        return response.status(status).json(ResponseUtil.error(status, message))
    }
}