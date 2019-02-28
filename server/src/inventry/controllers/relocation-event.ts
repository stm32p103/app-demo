import { Get, Post, Patch, Delete, Body, Controller, Param, HttpException, HttpStatus, Query, Optional } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { RelocationEvent } from '../entities';
import { RelocationEventDto } from '../dtos';
import { RelocationEventService } from '../services';

@ApiUseTags('Relocation')
@Controller('relocation')
export class RelocationEventController {
    constructor(private readonly relocationEvents: RelocationEventService ) {}
    @Get('/joinables')
    getJoinables(): string[] {
        return RelocationEvent.Joinables;
    }
    
    @Post()
    async create( @Body() dto: RelocationEventDto ): Promise<RelocationEvent> {
        let event: RelocationEvent;
        event = await this.relocationEvents.add( dto.itemCode, dto.locationCode );
        return event;
    }

    @Delete(':id')
    async delete( @Param('id') id: number ): Promise<void> {
        return await this.relocationEvents.delete( [ id ] );
    }
}
