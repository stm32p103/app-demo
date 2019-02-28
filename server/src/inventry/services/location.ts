import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Location } from '../entities';

/* ############################################################################
 * 1つずつ操作するAPIだけ作る。
 * 実際は一括編集・一括生成できると良い。
 * ######################################################################### */
@Injectable()
export class LocationService {
    constructor( 
        @InjectRepository( Location ) private readonly locations: Repository<Location>
    ) {}

    async create( location: Partial<Location> ): Promise<Location> {
        const result = await this.locations.insert( location );
        const id = result.identifiers[0].id;
        return await this.locations.findOne( id );
    }
    
    async update( id: number, location: Partial<Location> ): Promise<Location> {        
        await this.locations.update( id, location );
        return await this.locations.findOne( id );
    }
    
    async findOneById( id: number, option?: { join?: string[] } ): Promise<Location> {
        return await this.locations.findOneOrFail( id, { relations: [] } );
    }
    
    async findAll( option?: { join?: string[] } ): Promise<Location[]> {
        return await this.locations.find( { relations: [] } );
    }
    
    async delete( ids: number[] ): Promise<void> {
        await this.locations.delete( ids );
    }
}