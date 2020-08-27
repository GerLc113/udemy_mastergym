import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaClientesComponent } from './pages/clientes/lista-clientes/lista-clientes.component';
import { LoginComponent } from './pages/login/login.component';
import { Error404Component } from './pages/error404/error404.component';
import { AppComponent } from './app.component';
import { NuevoClienteComponent } from './pages/clientes/nuevo-cliente/nuevo-cliente.component';
import { EditarClienteComponent } from './pages/clientes/editar-cliente/editar-cliente.component';
import { VerClienteComponent } from './pages/clientes/ver-cliente/ver-cliente.component';
import { ListaPreciosComponent } from './pages/precios/lista-precios/lista-precios.component';
import { AgregarPrecioComponent } from './pages/precios/agregar-precio/agregar-precio.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'clientes', component: ListaClientesComponent },
  { path: 'nuevoCliente', component: NuevoClienteComponent },
  { path: 'editarCliente/:id', component: EditarClienteComponent },
  { path: 'verCliente/:id', component: VerClienteComponent },
  { path: 'precios', component: ListaPreciosComponent },
  {path: 'agregarPrecio', component: AgregarPrecioComponent},
  { path: 'login', component: LoginComponent },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
