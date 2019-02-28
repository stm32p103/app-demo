import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models';

const BASE = '/location';

@Injectable()
export class LocationService {
    constructor( private http: HttpClient ) {}

    async create( item: Location ): Promise<Location> {
        const result = await this.http.post( BASE, { ...item } ).toPromise() as Location;
        
        return result;
    }
    
    async getAll(): Promise<Location[]> {
        const result = await this.http.get( BASE ).toPromise() as Location[];
        return result;
    }

    async getOneById( id: number ): Promise<Location> {
        const result = await this.http.get( BASE + '/' + id ).toPromise() as Location;
        return result;
    }
}
