import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'crud',
    loadChildren: ()=> import('./crud/crud.module').then( m => m.CrudModule)
  },
  {
    path: 'csv',
    loadChildren: ()=> import('./csv/csv.module').then( m => m.CsvModule)
  },
  {
    path: '**',
    redirectTo: 'auth/login', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
