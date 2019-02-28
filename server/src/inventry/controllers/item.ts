import { Get, Post, Patch, Delete, Body, Controller, Param, HttpException, HttpStatus, Query, Optional } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

//import { GetQueryDto } from '../common/dto';
import { Item } from '../entities';
import { ItemService } from '../services';
import { ItemDto } from '../dtos';

/* ############################################################################
 * Swagger向け情報
 * ######################################################################### */
@ApiUseTags('Items')
@Controller('items')
export class ItemController {
    constructor(private readonly items: ItemService ) {}
    @Get('/joinables')
    getJoinables(): string[] {
        return Item.Joinables;
    }
    
    @Get()
    async findAll():  Promise<Item[]> {
//        let join = [];@Query() option?: GetQueryDto
//        if( option && option.join ) {
//            join = option.join.split(',');
//        }{ join: join }
        return await this.items.findAll();
    }
//    , @Query() option?: GetQueryDto 
    @Get(':id')
    async getById( @Param('id') id: number ):  Promise<Item> {
//        let join = [];
//        if( option && option.join ) {
//            join = option.joinStrings;
//        }
        let item;
        try {
            item = await this.items.findOneById( id );
        } catch( e ) {
            throw new HttpException( 'Entity Not Found', HttpStatus.NOT_FOUND );
        }

        return item;
    }
    
    @Post()
    async create( @Body() dto: ItemDto ): Promise<Item> {
        let item: Item;
        item = await this.items.create( new Item( dto ) );
        return item;
    }

    /* ------------------------------------------------------------------------
     * 部分変更
     * --------------------------------------------------------------------- */
    @Patch(':id')
    async update( @Param('id') id: number, @Body() dto: ItemDto ): Promise<Item> {
        let item: Item;
        await this.items.update( id, dto );
        
        try {
            item = await this.items.findOneById( id );
        } catch( e ) {
            throw new HttpException( 'Entity Not Found', HttpStatus.NOT_FOUND );
        }

        return item;
    }

    @Delete(':id')
    async delete( @Param('id') id: number ): Promise<void> {
        return await this.items.delete( [ id ] );
    }
}
