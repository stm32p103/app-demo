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
import { Item } from './item';
import { Location } from './location';

/* ############################################################################
 * RelocationEventにとって、
 * A) 集約の外側ならJoinColumnを使って外部キーにしておく。
 * B) 集約の内側ならJoinColumnを付けないで、必要な時にJoinするようにする。
 * ItemもLocationも集約の外の存在なので、IDのみにしている。
 * ######################################################################### */
@Entity()
export class RelocationEvent extends EntityCommon {
    // ------------------------------------------------------------------------
    // Item
    @Joinable()
    @JoinColumn( { name: 'iid' } )
    @ManyToOne( type=>Item )
    readonly item?: Item;
    
    @Column()
    readonly iid: number;
    // ------------------------------------------------------------------------
    // Location
    @Joinable()
    @JoinColumn( { name: 'lid' } )
    @ManyToOne( type=>Location )
    readonly location?: Location;

    @Column()
    readonly lid: number;
    // ------------------------------------------------------------------------

    constructor( init?: Partial<RelocationEvent> ) {
        super();
        Object.assign( this, init );
    }
}
