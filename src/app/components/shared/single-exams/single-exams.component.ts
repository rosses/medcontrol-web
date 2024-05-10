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
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-single-exams',
  templateUrl: './single-exams.component.html',
  styleUrls: ['./single-exams.component.scss']
})
export class SingleExamsComponent implements OnInit {

  public orders: any = [];
  public dropOrders: any = [];
  public PeopleID: string = '';
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
    this.orders.push({
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
    return this.Exams.filter((x:any) => { return parseInt(x.ExamTypeID) == parseInt(this.orders[index].ExamTypeID) });
  }
  borrar(topic:any, index:number) {
    if (topic=="orders") {
      if (this.orders[index].OrderID || (parseInt(this.orders[index].OrderID) || 0) > 0) {
        this.dropOrders.push(this.orders[index].OrderID);
      }
      this.orders.splice(index,1); 
    }
  } 
  getIfNeedAddExam(index:number) {
    let ex_id = parseInt(this.orders[index].ExamID) || 0;
    let ExamTypeID = this.orders[index].ExamTypeID;
    if (ex_id == -1) {
      let swal = Swal.fire({
        title: "Nuevo examen",
        icon: 'question',
        input: "text",
        inputLabel: "Ingrese el nombre del nuevo examen",
        confirmButtonText: 'Aceptar',
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
      });
      swal.then((x:SweetAlertResult) => {
        if (x.value && x.value != '' && x.isConfirmed) {
          this.orders[index].loading = true;
          this.api.addExam({
            ExamTypeID: ExamTypeID,
            Name: x.value,
            Active: 1
          }).subscribe((added:any) => {
            this.Exams.push(added);
            this.orders[index].ExamID = added.ExamID;
            this.orders[index].loading = false;
          },(err:any) => {
            this.api.toastError(err.error.error)
          });
        }
        else if (x.value && x.value == '') {
          this.api.toastError("Nombre examen inválido");
        }
      });
    }
  }
  save(withClose:boolean, options?:any) {
    this.loading = true;
    let w:any = null;
    if (options && options.orders) { 
      w = window.open('', 'w2','width=700,height=500');
      w.document.write("<h4>Preparando PDF... no cierres esta ventana hasta que aparezca tu PDF, espere por favor</h4>");
    }
    this.api.saveSingleOrder({
      PeopleID: this.PeopleID,
      data: this.orders,
      drop: this.dropOrders
    }).subscribe((data:any) => {
      this.api.toastOk("Guardado correctamente");
      if (withClose){ 
        if (options && options.orders) {
          w.location.href = environment.url + '/v1/pdf-render/data-single-orders/'+data.SingleOrderID;
        }
        this.modal.close({...data, ...options});
      }
      else {
        // TODO: never is false...
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
