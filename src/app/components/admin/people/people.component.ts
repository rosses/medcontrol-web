import { Component, OnInit } from '@angular/core';
import { faAngleUp, faAngleDown, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api.service';
import { DummyService } from 'src/app/dummy.service';
import { PeopleNewComponent } from '../../shared/people-new/people-new.component';
import { lastValueFrom } from 'rxjs';
import { SweetAlertResult } from 'sweetalert2';
import { Router } from '@angular/router';


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
  faTimes = faTimes;

  peoples: any = {
    total: 0,
    data: []
  };
  loading: boolean = false;
  public filter: any = {
    Search: '',
    StatusID: '',
    HealthID: '',
    page: 0
  }
  healths: any[] = [];
  groups: any[] = [];
  statuses: any[] = [];

  constructor(
    public api: ApiService,
    public modal: NgbModal,
    public router: Router
  ) { 
    this.master();
  }

  ngOnInit(): void {
    this.loadPeople(true); 
  }
  async master() {
    this.statuses = await lastValueFrom(this.api.getStatuses());
    this.healths = await lastValueFrom(this.api.getHealths());
  }
  async loadPeople(filter?:boolean) {
    if (filter){
      this.filter.page = 1;
    }
    try {
      this.loading = true;
      const data = await lastValueFrom(this.api.getPeoples(this.filter));
      this.peoples = data;
      this.loading = false;
    } catch (err:any) {
      this.api.toastError(err.error.message);
      this.loading = false;
    }
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
      if (data.data.PeopleID) {
        this.router.navigateByUrl('/admin/people/' + data.data.PeopleID);
      }
    },(err) => { console.log('dismiss:',err); });
  } 

  deletePeople(id:string, idx:number,name:string) {
    this.api.confirmModal("Eliminar a " + name,"Eliminará toda la información del paciente del sistema").then((d:SweetAlertResult) => {
      if (d.isConfirmed) {
        this.loading = true;
        this.api.deletePeople(id).subscribe((data:any) => {
          this.loading = false;
          this.peoples.data.splice(idx,1);
          this.api.toastOk("Eliminado correctamente");
        },(err:any) => {
          this.loading = false;
          this.api.toastError(err.error.error);
        });
      }
    })
  }

}
