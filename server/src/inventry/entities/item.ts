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
 * relocationEventsはどちらも集約の内部にあると考えて、Joinできるように設定。
 * 最新の位置が別途必要になった場合、テーブルを分けておき、relocation event発生で更新する。
 * ######################################################################### */
@Entity()
export class Item extends EntityCommon {
    @Column( { length: 128 } )
    name: string;
    
    @Column( { length: 256, unique: true } )
    code: string;

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
