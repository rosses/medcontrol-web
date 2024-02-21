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
import { ImcComponent } from '../imc/imc.component';

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
    public mdl: NgbModal,
    public dummy: DummyService,
    public rut: NgxRutService,
    public mask: MaskService
  ) { }

  ngOnInit(): void { 
    console.log(this.data);
    this.api.getExamTypes().subscribe((data:any)=>{ this.ExamTypes = data; });
    this.api.getExams().subscribe((data:any)=>{ this.Exams = data; });
    this.api.getMedicines().subscribe((data:any)=>{ this.Medicines = data; });
    this.api.getSpecialists().subscribe((data:any)=>{ this.Specialists = data; });
    this.api.getDiagnosis().subscribe((data:any)=>{ this.Diagnosis = data; });
    this.api.getCertificateTypes().subscribe((data:any)=>{ this.CertificateTypes = data; });
    this.api.getSurgerys().subscribe((data:any)=>{ this.Surgerys = data; });
    this.api.getGroups().subscribe((data:any)=>{ this.Groups = data; });
    this.api.getStatuses({GroupID: this.data.CreatedGroupID}).subscribe((data:any)=>{ this.Statuses = data; });

    this.render = true;

    if (this.data.DiagnosisID=='' || !this.data.DiagnosisID || this.data.DiagnosisID == 0 || this.data.DiagnosisID == '0') {
      this.data.DiagnosisID = '';
    }
    
  }
  searchTemplate() {
    if (!this.data.SurgeryID || this.data.SurgeryID == '' || this.data.SurgeryID == 0) {
      this.api.toastError("No se ha ingresado cirugía");
      return false;
    }
    if (this.data.orders.length > 0 || this.data.interviews.length > 0 || this.data.certificates.length > 0 || this.data.recipes.length) {
      this.api.confirmModal("Importante","Se reemplazará la información de examenes, interconsultas, recetas y certificados con la información de la plantilla").then((data:any) => {
        if (data.isConfirmed) {
          this.replaceDataFromService();
        }
      });
    } else {
      this.replaceDataFromService();
    }
  }
  replaceDataFromService() {
    this.loading = true;
    this.api.loadTemplate(this.data.SurgeryID).subscribe((data:any) => {

      // this.data.interviews = [];
      // this.data.certificates = [];
      // this.data.recipes = [];
      // this.data.orders = [];

      // Mark as droppable (no clean because no drop on backend)

      for (let i = 0; i < this.data.interviews.length; i++) {
        if (this.data.interviews[i].InterviewID || (parseInt(this.data.interviews[i].InterviewID) || 0) > 0) {
          this.data.dropInterviews.push(this.data.interviews[i].InterviewID);
        }
        this.data.interviews.splice(i,1); 
      }
      for (let i = 0; i < this.data.orders.length; i++) {
        if (this.data.orders[i].OrderID || (parseInt(this.data.orders[i].OrderID) || 0) > 0) {
          this.data.dropOrders.push(this.data.orders[i].OrderID);
        }
        this.data.orders.splice(i,1); 
      }
      for (let i = 0; i < this.data.recipes.length; i++) {
        if (this.data.recipes[i].RecipeID || (parseInt(this.data.recipes[i].RecipeID) || 0) > 0) {
          this.data.dropRecipes.push(this.data.recipes[i].RecipeID);
        }
        this.data.recipes.splice(i,1); 
      }
      for (let i = 0; i < this.data.certificates.length; i++) {
        if (this.data.certificates[i].CertificateID || (parseInt(this.data.certificates[i].CertificateID) || 0) > 0) {
          this.data.dropCertificates.push(this.data.certificates[i].CertificateID);
        }
        this.data.certificates.splice(i,1);
      } 


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
          VB: (data.Interviews[i].VB && data.Interviews[i].VB == 1 ? true : false),
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
    let w = parseFloat(this.data.anthropometry.Weight) || 0;
    let h = parseFloat(this.data.anthropometry.Height) || 0;
    if (w != 0 && h != 0) {
      let m2 = (h/100) * (h/100);
      let calc = Math.round( (w / m2) * 100 ) / 100;
      return calc;
    }
    return 0;
  }
  mr(n:number) {  
    return Math.round(n * 10) / 10;
  }
  getIdeal() {
    let h = parseFloat(this.data.anthropometry.Height) || 0;
    return this.mr((h*h/10000)*25);
  }
  getExceso() {
    let h = parseFloat(this.data.anthropometry.Height) || 0;
    let w = parseFloat(this.data.anthropometry.Weight) || 0;
    return this.mr(w - this.mr((h*h/10000)*25));
  }
  getPorcentajeExceso() {
    let h = parseFloat(this.data.anthropometry.Height) || 0;
    let w = parseFloat(this.data.anthropometry.Weight) || 0;
    return this.mr((w - this.mr((h*h/10000)*25)) * 100 / w) + "%";
  }
  imc(w:number, h:number, t: number|string) {
    const mdl = this.mdl.open(ImcComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg'
    }); 
    mdl.componentInstance.w = w;
    mdl.componentInstance.h = h;
    mdl.componentInstance.t = t;
    mdl.result.then((data:any) => {
      
    },(err:any) => { 
      
    });
  }
  ngAfterViewInit() { 

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
    if (topic=="interviews") {
      if (this.data.interviews[index].InterviewID || (parseInt(this.data.interviews[index].InterviewID) || 0) > 0) {
        this.data.dropInterviews.push(this.data.interviews[index].InterviewID);
      }
      this.data.interviews.splice(index,1); 
    }
    if (topic=="recipes") {
      if (this.data.recipes[index].RecipeID || (parseInt(this.data.recipes[index].RecipeID) || 0) > 0) {
        this.data.dropRecipes.push(this.data.recipes[index].RecipeID);
      }
      this.data.recipes.splice(index,1); 
    }
    if (topic=='certificates') {
      if (this.data.certificates[index].CertificateID || (parseInt(this.data.certificates[index].CertificateID) || 0) > 0) {
        this.data.dropCertificates.push(this.data.certificates[index].CertificateID);
      }
      this.data.certificates.splice(index,1);
    }
  } 
  testTypeOfRecipe(medicineID:string, ii: number) {
    if (medicineID=='99999999') {
      /*
      const mdl = this.mdl.open(AddMedicalExpressComponent, {
        backdrop: false,
        keyboard: true,
        size: 'md'
      }); 
      mdl.result.then((data:any) => {
        if (data.MedicineID && parseInt(data.MedicineID) > 0) {
          this.Medicines.push(data);
          this.data.recipes[ii].MedicineID = data.MedicineID;
        }
      },(err:any) => { console.log('dismiss:',err); });
      */
     //this.data.recipes[ii].isNew = true;
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
      VB: false,
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
