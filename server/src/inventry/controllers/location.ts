import { Get, Post, Patch, Delete, Body, Controller, Param, HttpException, HttpStatus, Query, Optional } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

//import { GetQueryDto } from '../common/dto';
import { Location } from '../entities';
import { LocationService } from '../services';
import { LocationDto } from '../dtos';

@ApiUseTags('Location')
@Controller('location')
export class LocationController {
    constructor(private readonly locations: LocationService ) {}
    @Get('/joinables')
    getJoinables(): string[] {
        return Location.Joinables;
    }
    
    @Get()
    async findAll():  Promise<Location[]> {
//        let join = [];@Query() option?: GetQueryDto
//        if( option && option.join ) {
//            join = option.join.split(',');
//        }{ join: join }
        return await this.locations.findAll();
    }
//    , @Query() option?: GetQueryDto 
    @Get(':id')
    async getById( @Param('id') id: number ):  Promise<Location> {
//        let join = [];
//        if( option && option.join ) {
//            join = option.joinStrings;
//        }
        let location;
        try {
            location = await this.locations.findOneById( id );
        } catch( e ) {
            throw new HttpException( 'Entity Not Found', HttpStatus.NOT_FOUND );
        }

        return location;
    }
    
    @Post()
    async create( @Body() dto: LocationDto ): Promise<Location> {
        let location: Location;
        location = await this.locations.create( new Location( dto ) );
        return location;
    }

    /* ------------------------------------------------------------------------
     * 部分変更
     * --------------------------------------------------------------------- */
    @Patch(':id')
    async update( @Param('id') id: number, @Body() dto: LocationDto ): Promise<Location> {
        let location: Location;
        await this.locations.update( id, dto );
        
        try {
            location = await this.locations.findOneById( id );
        } catch( e ) {
            throw new HttpException( 'Entity Not Found', HttpStatus.NOT_FOUND );
        }

        return location;
    }

    @Delete(':id')
    async delete( @Param('id') id: number ): Promise<void> {
        return await this.locations.delete( [ id ] );
    }
}
