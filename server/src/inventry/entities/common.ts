import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

// Decorator
export function Joinable(): PropertyDecorator {
    return function( target: any, key: string ) {
        if( target.constructor.Joinables === undefined ) {
            target.constructor.Joinables = [];
        }
        target.constructor.Joinables.push( key );
    }
}

@Entity()
export class EntityCommon {
    static Joinables: string[];

    @PrimaryGeneratedColumn()
    readonly id?: number;
    
    @CreateDateColumn()
    readonly createdAt?: Date;

    @UpdateDateColumn()
    readonly updatedAt?: Date;
    
    constructor( init?: Partial<EntityCommon> ) {
        Object.assign( this, init );
    }
}
