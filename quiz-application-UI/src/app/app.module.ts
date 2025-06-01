import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './common-component/navbar/navbar.component';
import { ExamComponent } from './exam/exam.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { QuestionComponent } from './question/question.component';
import { StartQuizComponent } from './start-quiz/start-quiz.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReportComponent } from './report/report.component';
import { DetailsComponent } from './details/details.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AdminpaneldetailsComponent } from './adminpaneldetails/adminpaneldetails.component';
import { AdminpanelReportsComponent } from './adminpanel-reports/adminpanel-reports.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ExamComponent,
    QuestionComponent,
    StartQuizComponent,
    ProfileComponent,
    RegistrationComponent,
    ReportComponent,
    DetailsComponent,
    AdminpanelComponent,
    AdminpaneldetailsComponent,
    AdminpanelReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
