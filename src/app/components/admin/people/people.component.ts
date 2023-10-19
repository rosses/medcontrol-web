import { Component, OnInit } from '@angular/core';
import { faAngleUp, faAngleDown, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api.service';
import { DummyService } from 'src/app/dummy.service';
import { PeopleNewComponent } from '../../shared/people-new/people-new.component';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  shareCodeModal: boolean = false;
  codeShared: boolean = false;
  selCode: string = '00000';

  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faEdit = faEdit;

  peoples: any[] = [];
  loading: boolean = false;
  public filter: any = {
    search: '',
    stage: ''
  }

  constructor(
    public api: ApiService,
    public modal: NgbModal,
    public dummy: DummyService
  ) { }

  ngOnInit(): void {
    this.loadPeople();
    /*
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
    });*/
  }
  async loadPeople() {
    try {
      this.loading = true;
      const data = await lastValueFrom(this.api.getPeoples());
      this.peoples = data;
      this.loading = false;
    } catch (err:any) {
      this.api.toastError(err.error.message);
      this.loading = false;
    }
  }
  filterbox() {

  }
  addPeople() {
    const mdl = this.modal.open(PeopleNewComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg'
    });
    mdl.componentInstance.data.Mode = 'full';
    mdl.result.then((data) => {
      console.log('then.data: ', data);
    },(err) => { console.log('dismiss:',err); });
  } 

}
