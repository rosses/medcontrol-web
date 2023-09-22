import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public router: Router, public api: ApiService) {
    if (this.api.getToken()=='') {
      this.router.navigateByUrl('/auth/login');
    }
  }

  ngOnInit(): void {
    
  }

}
