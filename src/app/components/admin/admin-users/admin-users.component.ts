import { Component, OnInit } from '@angular/core';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  shareCodeModal: boolean = false;
  codeShared: boolean = false;
  selCode: string = '00000';

  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;

  adminList: any[] = [];
  loading: boolean = false;

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.loading = true;
    this.api.getCustomers().subscribe((customers: any[]) => {
      this.api.getUsers({
        isSuperAdmin: true
      }).subscribe((users: any[]) => {
        this.loading = false;
        this.adminList = customers.map((customer: any) => {
          customer.open = false;
          return {
            ...customer,
            admin: users.map((user: {admins: any[]}) => {
              const item = user.admins.find(item => item.customer === customer._id);
              return item ? user : undefined;
            }).filter(item => item)
          }
        });
      });
    });
  }

  toggleShareModal( state: boolean, id?: string ) {
    if (id) {
      this.selCode = id;
    }
    
    this.shareCodeModal = state;
    if (!state) {
      this.codeShared = false;
      this.shareCodeModal = false;
    }
  }

}
