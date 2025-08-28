import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ManagercreatesavingsplanComponent } from './components/managercreatesavingsplan/managercreatesavingsplan.component';
import { ManagernavComponent } from './components/managernav/managernav.component';
import { ManagerviewapplicationformComponent } from './components/managerviewapplicationform/managerviewapplicationform.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { ManagerviewsavingsplanComponent } from './components/managerviewsavingsplan/managerviewsavingsplan.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserappliedplansComponent } from './components/userappliedplans/userappliedplans.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserplanapplicationformComponent } from './components/userplanapplicationform/userplanapplicationform.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { ManagereditsavingsplanComponent } from './components/managereditsavingsplan/managereditsavingsplan.component';
import { UserviewsavingsplanComponent } from './components/userviewsavingsplan/userviewsavingsplan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { ManagerLogComponent } from './components/manager-log/manager-log.component';
import { AgGridModule } from 'ag-grid-angular';
import { ResetFormComponent } from './components/reset-form/reset-form.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { CheckInboxComponent } from './components/check-inbox/check-inbox.component';
// import { Chart, registerables } from 'chart.js';

// Chart.register(...registerables);

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    ManagercreatesavingsplanComponent,
    ManagerviewsavingsplanComponent,
    ManagernavComponent,
    ManagerviewapplicationformComponent,
    ManagerviewfeedbackComponent,
    ManagereditsavingsplanComponent,
    NavbarComponent,
    RegistrationComponent,
    UseraddfeedbackComponent,
    UserappliedplansComponent,
    UsernavComponent,
    UserplanapplicationformComponent,
    UserviewfeedbackComponent,
    UserviewsavingsplanComponent,
    ChatbotComponent,
    ManagerLogComponent,
    ResetFormComponent,
    ForgotComponent,
    CheckInboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
  ],
 
providers: [
],
bootstrap: [AppComponent]
})

export class AppModule { }
