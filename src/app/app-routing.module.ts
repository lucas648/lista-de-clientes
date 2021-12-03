import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaDeClientesComponent } from './componentes/lista-de-clientes/lista-de-clientes.component';
import { FormComponent } from './componentes/form/form.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: ListaDeClientesComponent
  },
  {
    path: 'editar',
    component: FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
