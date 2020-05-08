import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeUserComponent } from './components/user/home-user/home-user.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { CrudAdminComponent } from './components/admin/crud-admin/crud-admin.component';
import { CargaMasivaComponent } from './components/admin/carga-masiva/carga-masiva.component';
import { CrearproductoComponent } from './components/admin/crearproducto/crearproducto.component';
import { CrearcategoriaComponent } from './components/admin/crearcategoria/crearcategoria.component';
import { ReportesComponent } from './components/admin/reportes/reportes.component';
import { AccountRecoveryComponent } from './components/account-recovery/account-recovery.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AccessdeniedComponent } from './components/accessdenied/accessdenied.component';
import { ProductComponent } from './components/product/product.component';
import { ModificarusuarioComponent } from './components/admin/modificarusuario/modificarusuario.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path: 'home-user',
    component:HomeUserComponent
  },
  {
    path: 'home-admin',
    component:HomeAdminComponent
  },
  {
    path:'cargaMasiva',
    component:CargaMasivaComponent
  },
  {
    path:'crearProducto',
    component:CrearproductoComponent
  },
  {
    path:'crearCategoria',
    component:CrearcategoriaComponent
  },
  {
    path:'reportes',
    component:ReportesComponent
  },
  {
    path:'account-recovery',
    component:AccountRecoveryComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'accessdenied',
    component:AccessdeniedComponent
  },
  {
    path:'crud-user',
    component:CrudAdminComponent
  },{
    path:'producto/:id',
    component:ProductComponent
  },{
    path:'modificarUsuario',
    component:ModificarusuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
