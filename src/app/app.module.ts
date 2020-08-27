import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HeaderComponent } from './elements/header/header.component';
import { ListaClientesComponent } from './pages/clientes/lista-clientes/lista-clientes.component';
import { Error404Component } from './pages/error404/error404.component';
import { NuevoClienteComponent } from './pages/clientes/nuevo-cliente/nuevo-cliente.component';
import { EditarClienteComponent } from './pages/clientes/editar-cliente/editar-cliente.component';
import { MensajesService } from "./services/mensajes/mensajes.service";
import { CortaNombrePipe } from './pipes/corta-nombre/corta-nombre.pipe';
import { VerClienteComponent } from './pages/clientes/ver-cliente/ver-cliente.component';
import { ListaPreciosComponent } from './pages/precios/lista-precios/lista-precios.component';
import { AgregarPrecioComponent } from './pages/precios/agregar-precio/agregar-precio.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ListaClientesComponent,
    Error404Component,
    NuevoClienteComponent,
    EditarClienteComponent,
    CortaNombrePipe,
    VerClienteComponent,
    ListaPreciosComponent,
    AgregarPrecioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxSpinnerModule,
    FormsModule,
    AngularFireStorageModule
  ],
  providers: [
    AngularFireAuth,
    MensajesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
