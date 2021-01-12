import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { LoginComponent } from './admin/login/login.component';
import { FirestoreComponent } from './firestore/firestore.component';
import { RegisterComponent } from './admin/register/register.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './admin/verify-email/verify-email.component';
import { AuthGuard } from "../shared-services/guard/auth.guard";


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/register', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
        data: { animationState: 'One' }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { animationState: 'Two' }
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: { animationState: 'Three' }
      },
      {
        path: 'verify-email',
        component: VerifyEmailComponent,
        data: { animationState: 'One' }
      },

      {
        path: 'assignment',
        component: AssignmentComponent,
        data: { animationState: 'Three' }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,  canActivate: [AuthGuard],
        data: { animationState: 'One' }
      },
      {
        path: 'firestore',
        component: FirestoreComponent,
        data: { animationState: 'One' }
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'one'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
