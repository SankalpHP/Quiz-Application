import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamComponent } from './exam/exam.component';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';
import { StartQuizComponent } from './start-quiz/start-quiz.component';
import { RegistrationComponent } from './registration/registration.component';
import { rolesGuard } from './guards/roles.guard';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';
import { DetailsComponent } from './details/details.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AdminpaneldetailsComponent } from './adminpaneldetails/adminpaneldetails.component';
import { AdminpanelReportsComponent } from './adminpanel-reports/adminpanel-reports.component';

const routes: Routes = [
  {path:"home",component:HomeComponent,pathMatch:'full',canActivate:[rolesGuard],data:{roles:['user','admin']}},
  {path:"exams",component:ExamComponent,pathMatch:'full',canActivate:[rolesGuard],data:{roles:['admin']}},
  {path:"question/:id",component:QuestionComponent,pathMatch:'full',canActivate:[rolesGuard],data:{roles:['admin']}},
  {path:"startquiz/:id",component:StartQuizComponent,pathMatch:'full',canActivate:[rolesGuard],data:{roles:['user','admin']}},
  {path:"profile/:id",component:ProfileComponent,pathMatch:'full',canActivate:[rolesGuard],data:{roles:['user','admin']}},
  {path:"report",component:ReportComponent,pathMatch:'full',canActivate:[rolesGuard],data:{roles:['user','admin']}},
  {path:"details/:id",component:DetailsComponent,pathMatch:'full',canActivate:[rolesGuard],data:{roles:['user','admin']}},
  {path:"adminpanel",component:AdminpanelComponent,pathMatch:'full',canActivate:[rolesGuard],data:{roles:['admin']}},
  {path:"adminpaneldetails/:id",component:AdminpaneldetailsComponent,pathMatch:'full',canActivate:[rolesGuard],data:{roles:['admin']}},
  {path:"adminpanelReports",component:AdminpanelReportsComponent,pathMatch:'full',canActivate:[rolesGuard],data:{roles:['admin']}},
  {path:"registration",component:RegistrationComponent,pathMatch:'full'},
  {path:"**",component:RegistrationComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
