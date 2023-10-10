import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { ReadComponent } from './components/read/read.component';
import { CreateComponent } from './components/create/create.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ReadComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CrudRoutingModule
  ]
})
export class CrudModule { }
