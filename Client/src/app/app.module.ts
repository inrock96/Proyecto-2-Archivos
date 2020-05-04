import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderPrincipalComponent } from './components/header-principal/header-principal.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccessdeniedComponent } from './components/accessdenied/accessdenied.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { CrudAdminComponent } from './components/admin/crud-admin/crud-admin.component';
import { HomeUserComponent } from './components/user/home-user/home-user.component';
import { HeaderUserComponent } from './components/user/header-user/header-user.component';
import { HeaderAdminComponent } from './components/admin/header-admin/header-admin.component';
import { ProductComponent } from './components/product/product.component';
import { AccountRecoveryComponent } from './components/account-recovery/account-recovery.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { CargaMasivaComponent } from './components/admin/carga-masiva/carga-masiva.component';
import { ReportesComponent } from './components/admin/reportes/reportes.component';
import { CrearproductoComponent } from './components/admin/crearproducto/crearproducto.component';
import { CrearcategoriaComponent } from './components/admin/crearcategoria/crearcategoria.component';
import { CrearusuarioComponent } from './components/admin/crearusuario/crearusuario.component';
import { ModificarusuarioComponent } from './components/admin/modificarusuario/modificarusuario.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPrincipalComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AccessdeniedComponent,
    HomeAdminComponent,
    CrudAdminComponent,
    HomeUserComponent,
    HeaderUserComponent,
    HeaderAdminComponent,
    ProductComponent,
    AccountRecoveryComponent,
    ProfileComponent,
    CargaMasivaComponent,
    ReportesComponent,
    CrearproductoComponent,
    CrearcategoriaComponent,
    CrearusuarioComponent,
    ModificarusuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
