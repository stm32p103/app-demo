import { Component, AfterViewInit } from '@angular/core';
import { 
    ItemService,
    Item,
    LocationService,
    Location,
    RelocationEventService,
    RelocationEvent 
} from '../inventry';

// もう少しコンポーネントを分けるべき。ロジックも極力入れず、表示に注力するように。

const SAMPLE_ITEMS = [ 
    { code: 'B1', name: 'ECU' },
    { code: 'B2', name: 'Wire Harness' },
    { code: 'B3', name: 'Junction Box' },
    { code: 'B4', name: 'Debugger' }
];

const SAMPLE_LOCATIONS = [ 
    { code: 'L1', name: 'Desk' },
    { code: 'L2', name: 'Shelf' },
    { code: 'L3', name: 'Container1' },
    { code: 'L4', name: 'Container2' }
];

const COLUMNS = [ 'id', 'code', 'name' ];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    public itemName: string;
    public itemCode: string;
    public items: Item[];

    public locationName: string;
    public locationCode: string;
    public locations: Item[];

    public targetItemCode: string;
    public targetLocationCode: string;
    
    public selectedItem: Item = null;
    public selectedLocation: Location = null;

    public readonly itemCols = [ 'id', 'code', 'name' ];
    public readonly locationCols = [ 'id', 'code', 'name' ];


    constructor(
        private item$: ItemService,
        private location$: LocationService,
        private reloc$: RelocationEventService
    ) {
        this.items = [];
    }

    // Item
    async createItem() {
        if( this.itemName && this.itemCode ) {
            await this.item$.create( {
                code: this.itemCode,
                name: this.itemName
            } );
            
            this.itemName = '';
            this.itemCode = '';
            this.getItems();
        }
    }
    
    async getItems() {
        let items = await this.item$.getAll();
        
        if( items ) {
            this.items = items;
        }
    }

    // Location
    async createLocation() {
        if( this.locationName && this.locationCode ) {
            this.location$.create( {
                code: this.locationCode,
                name: this.locationName
            } );
            
            this.locationCode = '';
            this.locationName = '';
            this.getLocations();
        }
    }
    
    async getLocations() {
        let locations = await this.location$.getAll();
        
        if( locations ) {
            this.locations = locations;
        }
    }

    // RelocationEvent
    async createRelocationEvent() {
        if( this.targetItemCode && this.targetLocationCode ) {
            try {
                let result = await this.reloc$.add( this.targetItemCode, this.targetLocationCode );
                
                // とりあえず更新...うまいやり方ない?
                this.selectedItem = await this.item$.getOneById( this.selectedItem.id );    
            } catch( err ) {
                console.log( err );
            }
        }
    }

    // Select
    async onItemSelect( event: any ) {
        // デモ用
        this.targetItemCode = event.data.code;
        try {
            this.selectedItem = await this.item$.getOneById( event.data.id );            
        } catch( err ) {
            console.log( err );
        }
    }

    async onLocationSelect( event: any ) {
        // デモ用
        this.targetLocationCode = event.data.code;
        try {
            this.selectedLocation = await this.location$.getOneById( event.data.id );            
        } catch( err ) {
            console.log( err );
        }
    }
    
    // Sample
    ngAfterViewInit() {
        this.prepareSamples()
    }
    
    async prepareSamples() {
        try {
            for( let item of SAMPLE_ITEMS ) {
                await this.item$.create( item );
            }
            
            for( let location of SAMPLE_LOCATIONS ) {
                await this.location$.create( location );
            }
        } catch( err) {
            console.log( err );
        }
        
        await this.getItems();
        await this.getLocations();
    }
}
