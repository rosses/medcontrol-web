import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { HealthProviderComponent } from './health-provider/health-provider.component';
import { AddProviderComponent } from './health-provider/add-provider/add-provider.component';
import { ActionProviderComponent } from './health-provider/action-provider/action-provider.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { BillingComponent } from './billing/billing.component';
import { SettingComponent } from './setting/setting.component';
import { AddProfessionComponent } from './setting/add-profession/add-profession.component';
import { ActionProfessionComponent } from './setting/action-profession/action-profession.component';
import { FormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SuperintendenciaComponent } from './superintendencia/superintendencia.component';
import { AddUnidadComponent } from './setting/add-unidad/add-unidad.component';
import { PeopleComponent } from './people/people.component';
import { PeopleManagementComponent } from './people-management/people-management.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    NotificationsComponent,
    HealthProviderComponent,
    AddProviderComponent,
    ActionProviderComponent,
    AdminUsersComponent,
    PeopleComponent,
    BillingComponent,
    SettingComponent,
    AddProfessionComponent,
    AddUnidadComponent,
    ActionProfessionComponent,
    SuperintendenciaComponent,
    PeopleManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
    GooglePlaceModule,
    NgbNavModule
  ],
})
export class AdminModule { }
