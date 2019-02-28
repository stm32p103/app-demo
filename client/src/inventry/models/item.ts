import { RelocationEvent } from './relocation-event';
export interface Item {
    name: string;
    code: string;
    id?:  number;
    createdAt?: number;
    updatedAt?: number;
    relocationEvents?: RelocationEvent[];
}
