import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'medcontrol-super-admin';

  constructor(public location: Location, public api: ApiService, public router:Router, public ar: ActivatedRoute) {
    if (this.api.getToken()=='') {
      this.router.navigateByUrl('/auth/login');
    } else {
      if (this.router.url==='/') {
        this.router.navigateByUrl('/admin/dashboard');
      }
    }
  }
}
