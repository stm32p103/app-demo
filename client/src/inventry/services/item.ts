import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models';

const BASE = '/item';

@Injectable()
export class ItemService {
    constructor( private http: HttpClient ) {}

    async create( item: Item ): Promise<Item> {
        const result = await this.http.post( BASE, { ...item } ).toPromise() as Item;
        
        return result;
    }

    async getAll(): Promise<Item[]> {
        const result = await this.http.get( BASE ).toPromise() as Item[];
        return result;
    }

    async getOneById( id: number ): Promise<Item> {
        // あまりよくない
        
        const result = await this.http.get( BASE + '/' + id ).toPromise() as Item;
        return result;
    }
}
