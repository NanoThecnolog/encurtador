import { Controller, Get } from '@nestjs/common';
import { ManageService } from './manage.service';

@Controller('manage')
export class ManageController {

    constructor(private readonly service: ManageService) { }



    @Get()
    getAll() {
        return this.service.getAll()
    }
}
