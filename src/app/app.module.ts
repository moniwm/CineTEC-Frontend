import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MoviesFormComponent } from './movies-form/movies-form.component';
import { CinemasFormComponent } from './cinemas-form/cinemas-form.component';
import { ScreeningFormComponent } from './screening-form/screening-form.component';
import { TheatersFormComponent } from './theaters-form/theaters-form.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientsAccountsComponent } from './clients-accounts/clients-accounts.component';
import { RouterModule, Routes } from '@angular/router';
import { MoviesManagementComponent } from './movies-management/movies-management.component';
import { CinemasManagementComponent } from './cinemas-management/cinemas-management.component';
import { ScreeningManagementComponent } from './screening-management/screening-management.component';
import { TheatersManagementComponent } from './theaters-management/theaters-management.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AddClientComponent } from './add-client/add-client.component';
import { SelectTheaterComponent } from './select-theater/select-theater.component';
import { ClientNavbarComponent } from './client-navbar/client-navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes : Routes = [
  { path: '' , component : LoginComponent},
  { path: 'clients' , component : ClientsAccountsComponent},
  { path: 'movies' , component : MoviesManagementComponent},
  { path: 'cinemas' , component : CinemasManagementComponent},
  { path: 'theaters' , component : TheatersManagementComponent},
  { path: 'screening' , component : ScreeningManagementComponent},
  { path: 'register/client' , component : ClientFormComponent},
  {path: 'clients/add', component: AddClientComponent},
  { path: 'movies/add' , component : MoviesFormComponent},
  { path: 'cinemas/add' , component : CinemasFormComponent},
  { path: 'theaters/add' , component : TheatersFormComponent},
  { path: 'screening/add' , component : ScreeningFormComponent},
  { path: 'buyTicket/:id' , component : SelectTheaterComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoviesFormComponent,
    CinemasFormComponent,
    ScreeningFormComponent,
    TheatersFormComponent,
    ClientFormComponent,
    ClientsAccountsComponent,
    AdminNavbarComponent,
    MoviesManagementComponent,
    ScreeningManagementComponent,
    CinemasManagementComponent,
    TheatersManagementComponent,
    AddClientComponent,
    SelectTheaterComponent,
    ClientNavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap : [AppComponent],
  
})
export class AppModule { }
