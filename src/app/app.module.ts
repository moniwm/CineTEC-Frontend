import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PersonalDataFormComponent } from './personal-data-form/personal-data-form.component';
import { EmployeeInfoFormComponent } from './employee-info-form/employee-info-form.component';
import { MoviesFormComponent } from './movies-form/movies-form.component';
import { CinemasFormComponent } from './cinemas-form/cinemas-form.component';
import { ScreeningFormComponent } from './screening-form/screening-form.component';
import { TheatersFormComponent } from './theaters-form/theaters-form.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { PdfReportComponent } from './pdf-report/pdf-report.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PersonalDataFormComponent,
    EmployeeInfoFormComponent,
    MoviesFormComponent,
    CinemasFormComponent,
    ScreeningFormComponent,
    TheatersFormComponent,
    ClientFormComponent,
    EmployeeFormComponent,
    PdfReportComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
