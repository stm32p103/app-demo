import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RelocationEvent, Item, Location } from '../entities';

/* ############################################################################
 * 1つずつ操作するAPIだけ作る。
 * 実際は一括編集・一括生成できると良い。
 * ######################################################################### */
@Injectable()
export class RelocationEventService {
    constructor( 
        @InjectRepository( RelocationEvent ) private readonly events: Repository<RelocationEvent>,
        @InjectRepository( Item ) private readonly items: Repository<Item>,
        @InjectRepository( Location ) private readonly locations: Repository<Location>
    ) {}

    async add( itemCode: string, locationCode: string ): Promise<RelocationEvent> {
        console.log( itemCode );
        console.log( locationCode );

        const item = await this.items.findOneOrFail( { where: { code: itemCode }, select: [ 'id' ] } );
        const location = await this.locations.findOneOrFail( { where: { code: locationCode }, select: [ 'id' ] } );
        
        const result = await this.events.insert( new RelocationEvent( { iid: item.id, lid: location.id } ) );
        const id = result.identifiers[0].id;
        
        // 暫定でJoin結果を返す。本当は別のところに必要
        
        return await this.events.findOne( id, { relations: [ 'item', 'item.relocationEvents', 'item.relocationEvents.location'] } );
    }

    async delete( ids: number[] ): Promise<void> {
        await this.events.delete( ids );
    }
}
