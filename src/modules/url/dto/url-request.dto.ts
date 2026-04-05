import { IsString, IsUrl } from "class-validator";

export class URLRequestDTO {
    @IsUrl({
        protocols: ['http', 'https'],
        require_protocol: true,
        require_tld: true
    })
    url: string
}