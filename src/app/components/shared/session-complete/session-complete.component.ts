import { Component, Input, OnInit, Output, EventEmitter, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxRutService } from '@numetalsour/ngx-rut';
import { ApiService } from 'src/app/api.service';
import { DummyService } from 'src/app/dummy.service';
import { MaskService } from 'src/app/mask.service';

@Component({
  selector: 'app-session-complete',
  templateUrl: './session-complete.component.html',
  styleUrls: ['./session-complete.component.scss']
})
export class SessionCompleteComponent implements OnInit {

  public subactive: number = 1;
  public data: any = {};
  public dataPeople: any = {};
  public loading: boolean = false;
  public render: boolean = false;
  public faSpinner = faSpinner; 

  public ExamTypes: any[] = [];
  public Exams: any[] = [];
  public Medicines: any[] = [];
  public Diagnosis: any[] = [];
  public Specialists: any[] = [];
  public CertificateTypes: any[] = [];
  public Surgerys: any[] = [];
  public Groups: any[] = [];
  public Statuses: any[] = [];

  constructor(
    private api: ApiService,
    public modal: NgbActiveModal,
    public dummy: DummyService,
    public rut: NgxRutService,
    public mask: MaskService
  ) { }

  ngOnInit(): void {
    //this.addReceta();
    //this.addExamen();
    //this.addInterconsulta();
    this.api.getExamTypes().subscribe((data:any)=>{ this.ExamTypes = data; });
    this.api.getExams().subscribe((data:any)=>{ this.Exams = data; });
    this.api.getMedicines().subscribe((data:any)=>{ this.Medicines = data; });
    this.api.getSpecialists().subscribe((data:any)=>{ this.Specialists = data; });
    this.api.getDiagnosis().subscribe((data:any)=>{ this.Diagnosis = data; });
    this.api.getCertificateTypes().subscribe((data:any)=>{ this.CertificateTypes = data; });
    this.api.getSurgerys().subscribe((data:any)=>{ this.Surgerys = data; });
    this.api.getGroups().subscribe((data:any)=>{ this.Groups = data; });
    this.api.getStatuses().subscribe((data:any)=>{ this.Statuses = data; });
    
  }
  searchTemplate() {
    if (!this.data.SurgeryID || this.data.SurgeryID == '' || this.data.SurgeryID == 0) {
      this.api.toastError("No se ha ingresado cirugía");
      return false;
    }
    this.api.confirmModal("Importante","Se reemplazará la información de examenes, interconsultas, recetas y certificados con la información de la plantilla").then((data) => {
      if (data.isConfirmed) {
        this.loading = true;
        this.api.loadTemplate(this.data.SurgeryID).subscribe((data:any) => {
          this.data.interviews = [];
          this.data.certificates = [];
          this.data.recipes = [];
          this.data.orders = [];
          
          for (let i = 0; i < data.Certificates.length; i++) {
            this.data.certificates.push({
              CertificateID: 0,
              CertificateTypeID: data.Certificates[i].CertificateTypeID,
              PeopleID: 0,
              DateID: 0,
              Description: data.Certificates[i].Description
            });
          }
          for (let i = 0; i < data.Interviews.length; i++) {
            this.data.interviews.push({
              InterviewID: 0,
              SpecialistID: data.Interviews[i].SpecialistID,
              Description: data.Interviews[i].Description,
              DiagnosisID: data.Interviews[i].DiagnosisID,
              WantText: data.Interviews[i].WantText,
              PeopleID: 0,
              DateID: 0
            });
          }
          for (let i = 0; i < data.Recipes.length; i++) {
            this.data.recipes.push({
              RecipeID: 0,
              MedicineID: data.Recipes[i].MedicineID,
              Dose: data.Recipes[i].Dose,
              Period: data.Recipes[i].Period,
              Periodicity: data.Recipes[i].Periodicity,
              PeopleID: 0,
              DateID: 0
            }); 
          }
          for (let i = 0; i < data.Orders.length; i++) {
            this.data.orders.push({
              OrderID: 0,
              ExamTypeID: data.Orders[i].ExamTypeID,
              ExamID: data.Orders[i].ExamID,
              PeopleID: 0,
              DateID: 0,
              Description: data.Orders[i].Description,
              CreatedUserID: 0,
              CreatedAt: ''
            });
          }
          this.loading = false;
          this.api.toastOk("Cargado con exito");
        });
      }
    });
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
  getIMC() {
    let Weight = parseFloat(this.data.anthropometry.Weight) || 0;
    let Height = parseFloat(this.data.anthropometry.Height) || 0;
    if (Weight != 0 && this.data.anthropometry.Height != 0) {
      let m2 = (Height/100) * (Height/100);
      let calc = Math.round( (Weight / m2) * 100 ) / 100;
      return calc;
    }
    return '';
  }
  ngAfterViewInit() { 
    setTimeout(() => {
      this.render = true;
    },1000);
  }
  examEvaluate(index:number) {
    
  }
  getExams(index:number) { 
    return this.Exams.filter((x:any) => { return parseInt(x.ExamTypeID) == parseInt(this.data.orders[index].ExamTypeID) });
  }
  
  borrar(topic:any, index:number) {
    if (topic=="orders") {
      this.data.orders.splice(index,1); 
    }
    if (topic=="interconsultas") {
      this.data.interviews.splice(index,1); 
    }
    if (topic=="recipes") {
      this.data.recipes.splice(index,1); 
    }
    if (topic=='certificates') {
      this.data.certificates.splice(index,1);
    }
  } 
  addCertificate() {
    this.data.certificates.push({
      CertificateTypeID: 0,
      PeopleID: 0,
      DateID: 0,
      Description: ''
    });
  }
  addInterview() {
    this.data.interviews.push({
      SpecialistID: '',
      Description: '',
      DiagnosisID: '',
      WantText: '',
      PeopleID: 0,
      DateID: 0
    });
  }
  addRecipe() {
    this.data.recipes.push({
      MedicineID: 0,
      Dose: '',
      Period: '',
      Periodicity: '',
      PeopleID: 0,
      DateID: 0
    });
  }
  
  save() {
    this.loading = true;
    this.api.saveSession(this.data).subscribe((data:any) => {
      this.api.toastOk("Guardado correctamente");
      this.modal.close({ success: true });
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
