import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
  },
  {
    path: 'crud',
    loadChildren: ()=> import('./crud/crud.module').then( m => m.CrudModule),
    canActivate:[ AuthGuard ],
    canMatch: [ AuthGuard ]
  },
  {
    path: 'csv',
    loadChildren: ()=> import('./csv/csv.module').then( m => m.CsvModule),
    canActivate:[ AuthGuard ],
    canMatch: [ AuthGuard ]
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
