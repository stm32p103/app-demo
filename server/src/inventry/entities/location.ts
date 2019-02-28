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

/* ############################################################################
 * Locationから見たら、ItemもRelocationEventも関係ない
 * ######################################################################### */
@Entity()
export class Location extends EntityCommon {
    @Column( { length: 128 } )
    name: string;

    @Column( { length: 256, unique: true } )
    code: string;
    
    constructor( init?: Partial<Location> ) {
        super();
        Object.assign( this, init );
    }
}
