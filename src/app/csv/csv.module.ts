import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CsvRoutingModule } from './csv-routing.module';
import { ReadCsvComponent } from './components/read-csv/read-csv.component';
import { SharedModule } from '../shared/shared.module';
import { DndDirective } from './directives/dnd.directive';
import { ProgressComponent } from './components/progress/progress.component';
import { LoadFileComponent } from './components/load-file/load-file.component';
import { GraficComponent } from './components/grafic/grafic.component';


@NgModule({
  declarations: [
    ReadCsvComponent,
    DndDirective,
    ProgressComponent,
    LoadFileComponent,
    GraficComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CsvRoutingModule
  ]
})
export class CsvModule { }
