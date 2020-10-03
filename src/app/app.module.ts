import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TesterHomeComponent } from "./tester/tester-home/tester-home.component";
import { LoginComponent } from "./login/login.component";
import { PatientHomeComponent } from "./patient/patient-home/patient-home.component";
import { ViewTestingHistoryComponent} from "./patient/view-testing-history/view-testing-history.component"
import { ManagerHomeComponent} from "./TestCenterManager/manager-home.component";
import { ManagerCreateTestCenterComponent} from "./TestCenterManager/TestCenterProfile/test-center-profile.component";
import { ManagerRecordTestOfficerComponent} from "./TestCenterManager/RecordTestOfficer/record-officer.component";

import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule, Routes } from "@angular/router";
import { from } from 'rxjs';

const appRoutes:Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'tester-home', component: TesterHomeComponent},
  {path: 'patient-home', component: PatientHomeComponent},
  {path: 'view-testing-history', component: ViewTestingHistoryComponent},
  {path: 'manager-home', component: ManagerHomeComponent},
  {path: 'create-test-center', component: ManagerCreateTestCenterComponent},
  {path: 'record-test-officer', component: ManagerRecordTestOfficerComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TesterHomeComponent,
    PatientHomeComponent,
    ViewTestingHistoryComponent,
    ManagerHomeComponent,
    ManagerCreateTestCenterComponent,
    ManagerRecordTestOfficerComponent
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
