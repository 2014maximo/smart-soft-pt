import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { ReadComponent } from './components/read/read.component';

const routes: Routes = [
  {
    path:'',
    children: [
      { path: 'read', component:ReadComponent },
      { path: 'create', component: CreateComponent},
      { path: '**', redirectTo: 'auth/login'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
