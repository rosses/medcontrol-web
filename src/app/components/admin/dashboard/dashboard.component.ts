import { Component, OnInit } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api.service';
import { PeopleNewComponent } from '../../shared/people-new/people-new.component';
import { DummyService } from 'src/app/dummy.service';
import { SchedulerConfirmationComponent } from '../../shared/scheduler-confirmation/scheduler-confirmation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public loading: boolean = false;
  public dates: any[] = [];
  public faCheckCircle = faCheckCircle;
  public filter: any = {
    from: new Date().toISOString().substring(0,10),
    to: new Date().toISOString().substring(0,10)
  }

  constructor(
    public api: ApiService,
    public modal: NgbModal,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.reload();
  }
  reload() {
    this.loading = true;
    this.api.getDatesFilter(this.filter).subscribe((data:any) => {
      this.dates = data;
      this.loading = false;
    },(err:any) => {
      this.api.toastError(err.error.message);
      this.loading = false;
    });
  }
  addPeople() {
    const mdl = this.modal.open(PeopleNewComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg'
    });
    mdl.componentInstance.data.Mode = 'fast';
    mdl.result.then((data) => {
      if (data.success) {
        if (data.data.PeopleID) {
          this.router.navigateByUrl('/admin/people/' + data.data.PeopleID);
        } else {
          this.reload();
        }
      }
    },(err) => { console.log('dismiss:',err); });
  }
  confirm(dateid: number,cardcode:string, name: string) {
    const mdl = this.modal.open(SchedulerConfirmationComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg'
    });
    mdl.componentInstance.data.DateID = dateid;
    mdl.componentInstance.data.name = name;
    mdl.componentInstance.data.cardcode = cardcode;
    mdl.result.then((data) => {
      if (data.success) {
        this.reload();
      }
    },(err) => { console.log('dismiss:',err); });
  }

}
