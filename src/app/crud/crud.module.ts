import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { ReadComponent } from './components/read/read.component';
import { CreateComponent } from './components/create/create.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ReadComponent,
    CreateComponent,
    LayoutComponent
  ],
  imports: [
    MatFormFieldModule,// Material
    MatTableModule,// Material
    MatPaginatorModule,// Material
    MatInputModule,// Material
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CrudRoutingModule
  ]
})
export class CrudModule { }
