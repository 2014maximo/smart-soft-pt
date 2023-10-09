import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { ReadComponent } from './components/read/read.component';
import { CreateComponent } from './components/create/create.component';


@NgModule({
  declarations: [
    ReadComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    CrudRoutingModule
  ]
})
export class CrudModule { }
