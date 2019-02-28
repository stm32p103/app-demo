import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { InventryModule } from './inventry';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [ 
              TypeOrmModule.forRoot( {
                  type: 'sqlite',
                  database: 'db/inventry.db',
                  synchronize: true,
                  migrationsRun: true,
                  entities: [ ...InventryModule.Entities ]
              } ), InventryModule
          ],
    controllers: [ AppController ],
    providers: [],
})
export class AppModule {}
