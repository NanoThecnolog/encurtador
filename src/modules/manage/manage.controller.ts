import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ManageService } from './manage.service';

@Controller('manage')
export class ManageController {

    constructor(private readonly service: ManageService) { }



    @Get()
    getAll() {
        return this.service.getAll()
    }

    @Delete(':shortCode')
    remove(@Param('shortCode') shortCode: string) {
        return this.service.remove(shortCode)
    }

}
