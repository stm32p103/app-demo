import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToMany,
    ManyToOne,
    OneToOne
} from 'typeorm';

import { EntityCommon, Joinable } from './common';
import { Location } from './location';
import { RelocationEvent } from './relocation-event';

/* ############################################################################
 * location, relocationEventsはどちらも集約の内部にあると考えて、Joinできるように設定。
 * ######################################################################### */
@Entity()
export class Item extends EntityCommon {
    @Column( { length: 128 } )
    name: string;
    
    @Column( { length: 256, unique: true } )
    code: string;

    // ------------------------------------------------------------------------
    // Location
    @Joinable()
    @ManyToOne( type=>Location )
    readonly location?: Location;
    // ------------------------------------------------------------------------
    // RelocationEvent
    @Joinable()
    @OneToMany( type=>RelocationEvent, relocationEvent=>relocationEvent.item )
    readonly relocationEvents?: RelocationEvent[];
    // ------------------------------------------------------------------------
    
    constructor( init?: Partial<Item> ) {
        super();
        Object.assign( this, init );
    }
}
