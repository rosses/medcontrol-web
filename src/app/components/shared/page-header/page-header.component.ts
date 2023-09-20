import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() userName: string = 'userName';
  @Input() info: string = 'Info';

  today: number = Date.now();
  todayDate : Date = new Date();
  todayString : string = new Date().toDateString();
  todayISOString : string = new Date().toISOString();

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.userName = this.api.getProfile('name')
  }

}
