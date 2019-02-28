import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as entities from './entities';
import * as services from './services';
import * as controllers from './controllers';

function ToArray( obj: Object ) {
    return Object.keys( obj ).map( key => obj[key] );
}

const EntityArray = ToArray( entities );

@Module( {
    imports: [ TypeOrmModule.forFeature( EntityArray ) ],
    providers: ToArray( services ),
    controllers: ToArray( controllers )
} )
export class InventryModule {
    static readonly Entities = EntityArray;
    constructor() {
    }
}
