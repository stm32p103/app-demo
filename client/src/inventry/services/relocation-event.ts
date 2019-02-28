import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RelocationEvent } from '../models';

const BASE = '/relocation';

@Injectable()
export class RelocationEventService {
    constructor( private http: HttpClient ) {}

    async add( itemCode: string, locationCode: string ): Promise<RelocationEvent> {
        // I/F微妙
        
        const result = await this.http.post( BASE, { itemCode: itemCode, locationCode: locationCode } ).toPromise() as RelocationEvent;
        
        return result;
    }
}
