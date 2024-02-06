import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { BillingComponent } from './billing/billing.component';
import { SettingComponent } from './setting/setting.component';
import { FormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { PeopleComponent } from './people/people.component';
import { PeopleManagementComponent } from './people-management/people-management.component';
import { NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    NotificationsComponent, 
    AdminUsersComponent,
    PeopleComponent,
    BillingComponent,
    SettingComponent,
    PeopleManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
    GooglePlaceModule,
    NgbNavModule,
    NgbPaginationModule
  ],
})
export class AdminModule { }
