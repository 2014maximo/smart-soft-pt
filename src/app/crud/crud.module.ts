import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { ReadComponent } from './components/read/read.component';
import { CreateComponent } from './components/create/create.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './components/layout/layout.component';


@NgModule({
  declarations: [
    ReadComponent,
    CreateComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    CrudRoutingModule
  ]
})
export class CrudModule { }
