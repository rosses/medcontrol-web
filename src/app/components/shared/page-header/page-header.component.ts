import { Component, Input, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() userName: string = '';
  @Input() info: string = 'Info';

  
  public total: number = 0;

  today: number = Date.now();
  faBell = faBell;
  todayDate : Date = new Date();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.api.notiEvent.subscribe((data:any) => {
      this.refresh();
    })
    this.refresh();
  }
  refresh() {
    this.api.getNotifyTotal().subscribe((data:any) => {
      this.total = data.total;
    });
  }

}
