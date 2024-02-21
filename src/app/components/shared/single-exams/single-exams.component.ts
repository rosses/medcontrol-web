import { Component, Input, OnInit, Output, EventEmitter, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxRutService } from '@numetalsour/ngx-rut';
import { ApiService } from 'src/app/api.service';
import { DummyService } from 'src/app/dummy.service';
import { MaskService } from 'src/app/mask.service';
import { AddMedicalExpressComponent } from '../add-medical-express/add-medical-express.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-exams',
  templateUrl: './single-exams.component.html',
  styleUrls: ['./single-exams.component.scss']
})
export class SingleExamsComponent implements OnInit {

  public subactive: number = 1;
  public data: any = {};
  public dataPeople: any = {};
  public loading: boolean = false;
  public render: boolean = false;
  public faSpinner = faSpinner; 

  public ExamTypes: any[] = [];
  public Exams: any[] = [];

  constructor(
    private api: ApiService,
    public modal: NgbActiveModal,
    public mdl: NgbModal,
    public dummy: DummyService,
    public rut: NgxRutService,
    public mask: MaskService
  ) { }

  ngOnInit(): void { 
    this.loading = true;
    this.api.getExamTypes().subscribe((data:any)=>{ this.ExamTypes = data; });
    this.api.getExams().subscribe((data:any)=>{ this.Exams = data; });
    this.render = true;
    this.loading = false;
  }
  addOrder() {
    this.data.orders.push({
      OrderID: 0,
      ExamTypeID: 0,
      ExamID: 0,
      PeopleID: 0,
      DateID: 0,
      Description: '',
      CreatedUserID: 0,
      CreatedAt: ''
    });
  }
  examEvaluate(index:number) {
    
  }
  getExams(index:number) { 
    return this.Exams.filter((x:any) => { return parseInt(x.ExamTypeID) == parseInt(this.data.orders[index].ExamTypeID) });
  }
  borrar(topic:any, index:number) {
    if (topic=="orders") {
      if (this.data.orders[index].OrderID || (parseInt(this.data.orders[index].OrderID) || 0) > 0) {
        this.data.dropOrders.push(this.data.orders[index].OrderID);
      }
      this.data.orders.splice(index,1); 
    }
  } 

  save(withClose:boolean, options?:any) {
    this.loading = true;
    let w:any = null;
    if (options && options.orders) { 
      w = window.open('', 'w2','width=700,height=500');
      w.document.write("<h4>Preparando PDF... no cierres esta ventana hasta que aparezca tu PDF, espere por favor</h4>");
    }
    this.api.saveSession(this.data).subscribe((data:any) => {
      this.api.toastOk("Guardado correctamente");
      if (withClose){ 
        if (options && options.orders) {
          w.location.href = environment.url + '/v1/pdf-render/data-orders/'+this.data.DateID;
        }
        this.modal.close({...data, ...options});
      }
      else {
        this.data.orders = data.orders;
        this.data.certificates = data.certificates;
        this.data.interviews = data.interviews;
        this.data.recipes = data.recipes;
        this.data.anthropometry = data.ant;
        this.data.dropCertificates = [];
        this.data.dropInterviews = [];
        this.data.dropOrders = [];
        this.data.dropRecipes = [];
      }
      this.loading = false;
    },(err:any) => {
      this.api.toastError(err.error.message);
      this.loading = false;
    });
  }
  cancel() {
    this.modal.dismiss();
  }
  pareo(o:any) : any[] {
    let r:any[] = [];
    for (let i=0; i < o.length;i++) {
      r.push(i);
      i++;
    }
    return r;
  }
 
}
