import { Item } from './item';
import { Location } from './location';

export interface RelocationEvent {
    item?: Item;
    iid: string;
    location?: Location;
    lid: string;
}
