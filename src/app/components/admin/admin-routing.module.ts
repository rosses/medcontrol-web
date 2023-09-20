import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HealthProviderComponent } from './health-provider/health-provider.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { BillingComponent } from './billing/billing.component';
import { SettingComponent } from './setting/setting.component';
import { SuperintendenciaComponent } from './superintendencia/superintendencia.component';
import { PeopleComponent } from './people/people.component';

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
        path: 'health-provider',
        component: HealthProviderComponent
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
        path: 'billing',
        component: BillingComponent
      },
      {
        path: 'setting',
        component: SettingComponent
      },
      {
        path: 'superintendencia',
        component: SuperintendenciaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
