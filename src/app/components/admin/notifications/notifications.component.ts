import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  loading: boolean = false;
  requestConfirm: boolean = true;
  deleteModal: boolean = false;
  requestDeleted: boolean = false;

  dataTable = [
    {
      name: 'Jorge Perez',
      cod: '1234',
      rut: '11.111.111-1',
      mail: 'jorge@gmail.com',
      provider: 'Cliníca Davíla',
      register: true
    },
    {
      name: 'Jorge Perez',
      cod: '1234',
      rut: '11.111.111-1',
      mail: 'jorge@gmail.com',
      provider: 'Cliníca Davíla',
      register: false
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  deleteRequest() {
    this.requestConfirm = false;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.requestDeleted = true;
    }, 1500);
  }

  deleteReset() {
    this.loading = false;
    this.requestConfirm = true;
    this.deleteModal = false;
    this.requestDeleted = false;
  }


}
