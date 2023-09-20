import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrySystemComponent } from './entry-system.component';
import { LoginComponent } from './login/login.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: EntrySystemComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'password-recovery',
        component: PasswordRecoveryComponent
      }
    ]
  },
  // { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrySystemRoutingModule { }
