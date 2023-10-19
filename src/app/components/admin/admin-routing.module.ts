import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { BillingComponent } from './billing/billing.component';
import { SettingComponent } from './setting/setting.component';
import { PeopleComponent } from './people/people.component';
import { PeopleManagementComponent } from './people-management/people-management.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'admin-users',
        component: AdminUsersComponent
      },
      {
        path: 'people',
        component: PeopleComponent
      },
      {
        path: 'people/:id',
        component: PeopleManagementComponent
      },
      {
        path: 'billing',
        component: BillingComponent
      },
      {
        path: 'setting',
        component: SettingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
