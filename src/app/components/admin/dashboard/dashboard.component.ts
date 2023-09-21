import { Component, OnInit } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api.service';
import { PeopleNewComponent } from '../../shared/people-new/people-new.component';
import { DummyService } from 'src/app/dummy.service';
import { SchedulerConfirmationComponent } from '../../shared/scheduler-confirmation/scheduler-confirmation.component';

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
  public faCheckCircle = faCheckCircle;

  constructor(
    public api: ApiService,
    public modal: NgbModal,
    public dummy: DummyService
  ) { }

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
  addPeople() {
    const mdl = this.modal.open(PeopleNewComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg'
    });
    mdl.result.then((data) => {
      console.log('then.data: ', data);
    },(err) => { console.log('dismiss:',err); });
  }
  confirm(cardcode:string, name: string) {
    const mdl = this.modal.open(SchedulerConfirmationComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg'
    });
    mdl.componentInstance.data.name = name;
    mdl.componentInstance.data.cardcode = cardcode;
    mdl.result.then((data) => {
      console.log('then.data: ', data);
    },(err) => { console.log('dismiss:',err); });
  }

}
