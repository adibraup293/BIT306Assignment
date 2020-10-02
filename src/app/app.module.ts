import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TesterHomeComponent } from "./tester/tester-home/tester-home.component";
import { LoginComponent } from "./login/login.component";
import { PatientHomeComponent } from "./patient/patient-home/patient-home.component";

import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule, Routes } from "@angular/router";

const appRoutes:Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'tester-home', component: TesterHomeComponent},
  {path: 'patient-home', component: PatientHomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TesterHomeComponent,
    PatientHomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
