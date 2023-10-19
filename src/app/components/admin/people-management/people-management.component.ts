import { Component, OnInit } from '@angular/core';
import { faAngleUp, faAngleDown, faEdit, faPrint, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api.service';
import { DummyService } from 'src/app/dummy.service';
import { PeopleNewComponent } from '../../shared/people-new/people-new.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionCompleteComponent } from '../../shared/session-complete/session-complete.component';
import { lastValueFrom } from 'rxjs';
import { OrderResultComponent } from '../../shared/order-result/order-result.component';
import { environment } from 'src/environments/environment';
import { EvolutionAddComponent } from '../../shared/evolution-add/evolution-add.component';
import { SweetAlertResult } from 'sweetalert2';


@Component({
  selector: 'app-people-management',
  templateUrl: './people-management.component.html',
  styleUrls: ['./people-management.component.scss']
})
export class PeopleManagementComponent implements OnInit {

  public data: any = {};
  public loading: boolean = false;
  public active:number = 0;
  public dates: any[] = [];
  public exams: any[] = [];
  public evolutions: any[] = [];
  public recipes: any[] = [];
  public certificates: any[] = [];
  public interviews: any[] = [];
  public budgets: any[] = [];
  public id: string = '';
  public render: boolean = false;

  public Healts: any[] = [];
  public faEdit = faEdit;
  public faPrint = faPrint;
  public faChartLine = faChartLine;

  constructor(
    public api: ApiService,
    public modal: NgbModal, 
    private ar: ActivatedRoute,
    public router: Router,
    public dummy: DummyService
  ) { }

  ngOnInit(): void {
    this.api.getHealths().subscribe((data:any) => { this.Healts = data; });
    this.id = this.ar.snapshot.paramMap.get('id') || '';
    if (this.id == '') {
      this.api.toastError("Error al obtener datos");
      this.router.navigateByUrl('/admin/people');
    }
    else {
      this.setActive(0,true);
    } 
  }
  changeCirugy() {

  }
  async loadPeople(id:string, first: boolean) {
    this.loading = true;
    try {
      this.data = await lastValueFrom(this.api.getPeople(id));
      this.evolutions = await lastValueFrom(this.api.getPeopleEvolutions(id))
      //this.dates = await lastValueFrom(this.api.getPeopleDates(id));
      this.loading = false;
      if (first) {
        this.render = true;
      }
    } catch (err:any) {
      this.api.toastError("Error al obtener paciente");
      this.router.navigateByUrl('/admin/people');
    }
  }
  deployResults(DateID:string, ExamTypeID: string, ExamTypeName: string) {
    console.log('deployResults ('+DateID+','+ExamTypeID+','+ExamTypeName+')');
    const mdl = this.modal.open(OrderResultComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg'
    }); 
    mdl.componentInstance.DateID = DateID;
    mdl.componentInstance.ExamTypeName = ExamTypeName;
    mdl.componentInstance.ExamTypeID = ExamTypeID;
    mdl.result.then((data) => {
      
    },(err) => { 
      
    });
  }
  verOrdenPDF(DateID:string) {
    window.open(environment.url + '/v1/pdf-render/data-orders/'+DateID,'_blank');
  }
  filterbox() {

  }
  addEvolution() {
    const mdl = this.modal.open(EvolutionAddComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg'
    });  
    mdl.componentInstance.data.PeopleID = this.id;
    mdl.result.then((data) => {
      if (data.success) {
        this.loading = true;
        this.api.getPeopleEvolutions(this.id).subscribe((data:any) => {
          this.evolutions = data;
          this.loading = false;
        },(err:any) => {
          this.api.toastError(err.error.error);
          this.loading = false;
        });

      }
    },(err) => { 
      
    });
  }
  deleteEvolutions(num:number) {
    this.api.confirmModal("Eliminar evolución","Desea eliminar la evolución?").then((status:SweetAlertResult) => {
      if (status.isConfirmed) {
        this.loading = true;
        this.api.deleteEvolution(this.evolutions[num].EvolutionID).subscribe((data:any) => {
          this.api.toastOk("Eliminado con éxito");
          this.setActive(3);
        },(err:any) => {
          this.api.toastError(err.error.error);
          this.loading = false;
        })
      }
    });
  }
  async setActive(num:number, first?: boolean) {
    this.loading = true;
    this.active = num;
    if (num == 0) {
      this.loadPeople(this.id, (first ? first : false));
    }
    else if (num == 2) {     
      this.dates = await lastValueFrom(this.api.getPeopleDates(this.id));
      this.loading = false;
    }
    else if (num == 4) {
      this.exams = await lastValueFrom(this.api.getPeopleExams(this.id));
      this.loading = false;
    }
    else if (num == 3) {
      this.evolutions = await lastValueFrom(this.api.getPeopleEvolutions(this.id));
      this.loading = false;
    }
    else {
      this.loading = false;
    }
    
    
  }
  getIMC(Weight:any,Height:any) {
    Weight = parseFloat(Weight) || 0;
    Height = parseFloat(Height) || 0;
    if (Weight != 0 && Height != 0) {
      let m2 = (Height/100) * (Height/100);
      let calc = Math.round( (Weight / m2) * 100 ) / 100;
      return calc;
    }
    return '';
  }
  editar(sessionId:string) {

  }
  getBirthdayTime() {
    if (this.data.Birthday && this.data.Birthday.length >= 10) {
      let ctrldob = new Date(parseInt(this.data.Birthday.substring(0,4)), parseInt(this.data.Birthday.substring(5,7)) + 1, parseInt(this.data.Birthday.substring(8,10)));
      let ctrldoa = new Date();
      let diff = new Date(ctrldoa.getTime() - ctrldob.getTime());
      return (
        ((diff.getUTCFullYear() - 1970) > 0 ? (diff.getUTCFullYear() - 1970) + ' años ' : '') + 
        ((diff.getUTCMonth()) > 0 ? diff.getUTCMonth() + ' meses ' : '') + 
        ((diff.getUTCDate() - 1) > 0 ? (diff.getUTCDate() - 1) + ' dias ' : '')  
      );

    } else {
      return '';
    }

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
  session(DateID:string) {
    this.loading = true;
    this.api.getDate(DateID).subscribe((data:any) => {
      const mdl = this.modal.open(SessionCompleteComponent, {
        backdrop: false,
        keyboard: true,
        windowClass: 'session-modal'
      });
      mdl.componentInstance.data = data;
      mdl.componentInstance.dataPeople = this.data;
      mdl.result.then((data) => {
        if (data.success) {
          this.api.toastOk("Guardado con éxito");  
        }
      },(err) => { console.log('dismiss:',err); });
      this.loading = false;
    })
  }
  savePeople() {
    this.loading = true;
    this.api.editPeople(this.data).subscribe((data:any) => {
      this.loading = false;
      this.api.toastOk("Guardado con éxito");
    },(err:any) =>{
      this.loading = false;
      this.api.toastError(err.error.message);
    });

  }
}
