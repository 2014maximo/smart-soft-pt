import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadCsvComponent } from './components/read-csv/read-csv.component';

const routes: Routes = [
  {
    path:'',
    children: [
      { path: 'read-csv', component: ReadCsvComponent},
      { path: '**', redirectTo: 'login'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsvRoutingModule { }
