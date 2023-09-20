import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public loading: boolean = false;
  public stats: any = {
    customersList: 0,
    shiftsCurrent: 0,
    shiftsBefore: [],
    periodCurrent: '',
    usersByJobs: [],
    usersByLocation: []
  }

  constructor(public api: ApiService) { }

  ngOnInit(): void {

    this.loading = true;
    setTimeout(()=> {
      this.loading = false;
    },1000);
    /*
    this.api.getSuperadminDashboard().subscribe((data:any) => {
      this.stats = data;
      this.loading = false;
    });
    */
  }

}
