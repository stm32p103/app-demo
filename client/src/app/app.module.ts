import { AppComponent } from './app.component';
const COMPONENTS = [
    AppComponent
];


/* Angular Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
const ANGULARS = [
    FormsModule,
    HttpClientModule,
    BrowserModule
];

import { ItemService, LocationService, RelocationEventService } from '../inventry';
const SERVICES = [
    ItemService,
    LocationService,
    RelocationEventService
];

/* PrimeNG UI Modules */
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import {PasswordModule} from 'primeng/password';
import {TerminalModule} from 'primeng/terminal';
import {CardModule} from 'primeng/card';
import {EditorModule} from 'primeng/editor';

const PRIMENG_MODULES = [
    FieldsetModule,
    CheckboxModule,
    FormsModule,
    TableModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    RadioButtonModule,
    MessagesModule,
    MessageModule,
    PanelModule,
    PasswordModule,
    TerminalModule,
    CardModule,
    EditorModule
];

@NgModule( {
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ],
    imports: [
        ...ANGULARS,
        ...PRIMENG_MODULES,
    ],
    providers: [
        ...SERVICES
    ],
    bootstrap: [ AppComponent ]
} )
export class AppModule { }
