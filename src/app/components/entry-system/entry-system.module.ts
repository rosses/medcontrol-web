import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrySystemRoutingModule } from './entry-system-routing.module';
import { EntrySystemComponent } from './entry-system.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EntrySystemComponent,
    LoginComponent,
    PasswordRecoveryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EntrySystemRoutingModule, 
    FormsModule
  ]
})
export class EntrySystemModule { }
