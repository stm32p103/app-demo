import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from '../entities';

/* ############################################################################
 * 1つずつ操作するAPIだけ作る。
 * 実際は一括編集・一括生成できると良い。
 * ######################################################################### */
@Injectable()
export class ItemService {
    constructor( 
        @InjectRepository( Item ) private readonly items: Repository<Item>
    ) {}

    async create( item: Partial<Item> ): Promise<Item> {
        const result = await this.items.insert( item );
        const id = result.identifiers[0].id;
        return await this.items.findOne( id );
    }
    
    async update( id: number, item: Partial<Item> ): Promise<Item> {        
        await this.items.update( id, item );
        return await this.items.findOne( id );
    }
    
    async findOneById( id: number, option: { join?: string[] } = {} ): Promise<Item> {
        // tentative
        return await this.items.findOneOrFail( id, { relations: ( option.join ? option.join : [] ) } );
    }
    
    async findAll( option?: { join?: string[] } ): Promise<Item[]> {
        return await this.items.find( { relations: [] } );
    }
    
    async delete( ids: number[] ): Promise<void> {
        await this.items.delete( ids );
    }
}