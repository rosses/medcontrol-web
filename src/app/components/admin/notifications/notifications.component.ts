import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

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

  notifications: any[] = [];
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

  constructor(
    public api: ApiService
  ) { }

  ngOnInit(): void {
    this.api.getNotifyList().subscribe((data:any)=>{
      this.notifications = data;
    })
  }
  getName(n:string) {
    if (n == 'surgery') { return 'Cirugía'; }
    else if (n == 'finish') { return 'Término Exámenes'; }
    else if (n == 'enter') { return 'PAD'; }
    else {
      return 'Postoperatorio';
    }
  }
  deleteRequest() {
    this.requestConfirm = false;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.requestDeleted = true;
    }, 1500);
  }
  markRead(id:string) {
    this.api.readNotify(id).subscribe((data:any)=>{});
    this.api.notiEvent.emit(true);
  }

  deleteReset() {
    this.loading = false;
    this.requestConfirm = true;
    this.deleteModal = false;
    this.requestDeleted = false;
  }


}
