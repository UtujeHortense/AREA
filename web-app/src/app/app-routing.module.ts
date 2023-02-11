import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ServiceComponent } from './service/service.component';
import { AreaComponent } from './area/area.component';
import { Page404Component } from './page404/page404.component'
import { ManageComponent } from './manage/manage.component'

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'services', component: ServiceComponent},
  {path: 'area', component: AreaComponent},
  {path: 'manage', component: ManageComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: Page404Component },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
