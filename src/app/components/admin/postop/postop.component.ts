import { Component, OnInit } from '@angular/core';
import { faAngleUp, faAngleDown, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api.service';
import { DummyService } from 'src/app/dummy.service';
import { PeopleNewComponent } from '../../shared/people-new/people-new.component';
import { last, lastValueFrom } from 'rxjs';
import { SweetAlertResult } from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-postop',
  templateUrl: './postop.component.html',
  styleUrls: ['./postop.component.scss']
})
export class PostopComponent implements OnInit {

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
    posop: true,
    Name: '',
    CardCode: '',
    StatusID: '',
    HealthID: '',
    Surgery: '',
    FechaIngreso: '',
    FechaTermino: '',
    FechaCirugia: '',
    IMC: '',
    NutriologoName: '',
    PsicologoName: '',
    NutricionistaName: '',
    PsiquiatraName: '',
    CheckLab: '',
    CheckRxTx: '',
    CheckECO: '',
    CheckECG: '',
    CheckECO2: '',
    CheckEDA: '',
    page: 0
  }
  healths: any[] = [];
  groups: any[] = [];
  specialists: any[] = [];
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
    this.groups = await lastValueFrom(this.api.getExamTypes());
    this.specialists = await lastValueFrom(this.api.getSpecialists());
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
 

}
