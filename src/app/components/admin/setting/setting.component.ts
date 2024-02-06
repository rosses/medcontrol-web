import { Component, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { MasterdataEditorComponent } from '../../shared/masterdata-editor/masterdata-editor.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  public active: number = 1;
  loading: boolean = true;
  public master: string = 'Medicine';
  public surgery: string = '';
  public template: any = {
    SurgeryID: 0,
    Recipes: [],
    Orders: [],
    Certificates: [],
    Interviews: []
  }
  ExamTypes: any[] = [];
  Exams: any[] = [];
  Medicines: any[] = [];
  Specialists: any[] = [];
  Diagnosis: any[] = [];
  CertificateTypes: any[] = [];

  public masterdata: any[] = [];
  public surgerys: any[] = [];

  public firstLoadMasterDataTemplates: boolean = false;
  
  constructor(
    public api: ApiService,
    public modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.reloadMasterdata(); 
  }
  async reloadMasterdata() {
    this.loading = true;
    if (this.master == 'Lab') {
      this.masterdata = await lastValueFrom(this.api.getLabs());
    }
    if (this.master == 'Medicine') {
      this.masterdata = await lastValueFrom(this.api.getMedicines());
    }
    if (this.master == 'ExamType') {
      this.masterdata = await lastValueFrom(this.api.getExamTypes());
    }
    if (this.master == 'Exam') {
      this.masterdata = await lastValueFrom(this.api.getExams());
    }
    if (this.master == 'Specialist') {
      this.masterdata = await lastValueFrom(this.api.getSpecialists());
    }
    if (this.master == 'Diagnosis') {
      this.masterdata = await lastValueFrom(this.api.getDiagnosis());
    }
    if (this.master == 'Surgery') {
      this.masterdata = await lastValueFrom(this.api.getSurgerys());
    }
    if (this.master == 'CertificateType') {
      this.masterdata = await lastValueFrom(this.api.getCertificateTypes());
    }
    if (this.master == 'Health') {
      this.masterdata = await lastValueFrom(this.api.getHealths());
    }
    if (this.master == 'ExamData') {
      this.masterdata = await lastValueFrom(this.api.getExamDatas());
    }
    this.loading = false;
  }
  getCols() : number {
    if (this.master == 'Exam' || this.master == 'Medicine' || this.master == 'ExamData') { return 5; }
    return 4;
  }
  deleteTemplate(element:string, num:number) {
    this.template[element].splice(num,1);
  }
  setActive(n:number) {
    if (n != this.active) {
      this.active = n;
      if (n == 1) {
        this.reloadMasterdata();
      }
      else if (n == 2) {
        this.reloadSurgerys();
      }
    }
  }
  async reloadSurgerys() {
    this.api.getSurgerys().subscribe((data:any) => {
      this.surgerys = data;
    });
  }
  async loadTemplates() {
    this.loading = true;
    if (!this.firstLoadMasterDataTemplates) {
      this.api.getExamTypes().subscribe((data:any)=>{ this.ExamTypes = data; });
      this.api.getExams().subscribe((data:any)=>{ this.Exams = data; });
      this.api.getMedicines().subscribe((data:any)=>{ this.Medicines = data; });
      this.api.getSpecialists().subscribe((data:any)=>{ this.Specialists = data; }); 
      this.api.getCertificateTypes().subscribe((data:any)=>{ this.CertificateTypes = data; });  
      this.firstLoadMasterDataTemplates = true;
    }
    
    this.api.loadTemplate(this.surgery).subscribe((data:any) => {
      this.template = data;
      this.loading = false;
    });
  }
  async addMasterdata() {
    const mdl = this.modal.open(MasterdataEditorComponent, {
      backdrop: false,
      keyboard: true
    });
    if (this.master == 'Exam') {
      mdl.componentInstance.loading = true;
      const rows = await lastValueFrom(this.api.getExamTypes());
      mdl.componentInstance.rows = rows;
      mdl.componentInstance.loading = false;
    }
    if (this.master == 'Medicine') {
      mdl.componentInstance.loading = true;
      const rows = await lastValueFrom(this.api.getLabs());
      mdl.componentInstance.rows = rows;
      mdl.componentInstance.loading = false;
    }
    if (this.master == 'ExamData') {
      mdl.componentInstance.loading = true;
      const rows = await lastValueFrom(this.api.getExams());
      mdl.componentInstance.rows = rows;
      mdl.componentInstance.loading = false;
    }
    mdl.componentInstance.data = { Name: '', Active: 1 };
    mdl.componentInstance.mode = 'add';
    mdl.componentInstance.master = this.master;
    mdl.result.then((data) => {
      if (data.success) { this.reloadMasterdata(); }
    },(err) => { 
      console.log('dismiss:',err); 
    });
  } 
  async editMasterdata(o:any) {
    const mdl = this.modal.open(MasterdataEditorComponent, {
      backdrop: false,
      keyboard: true
    });
    if (this.master == 'Exam') {
      mdl.componentInstance.loading = true;
      const rows = await lastValueFrom(this.api.getExamTypes());
      mdl.componentInstance.rows = rows;
      mdl.componentInstance.loading = false;
    }
    if (this.master == 'Medicine') {
      mdl.componentInstance.loading = true;
      const rows = await lastValueFrom(this.api.getLabs());
      mdl.componentInstance.rows = rows;
      mdl.componentInstance.loading = false;
    }
    if (this.master == 'ExamData') {
      mdl.componentInstance.loading = true;
      const rows = await lastValueFrom(this.api.getExams());
      mdl.componentInstance.rows = rows;
      mdl.componentInstance.loading = false;
    }
    mdl.componentInstance.data = o;
    mdl.componentInstance.mode = 'edit';
    mdl.componentInstance.master = this.master;
    mdl.result.then((data) => {
      if (data.success) { this.reloadMasterdata(); }
    },(err) => { 
      console.log('dismiss:',err); 
    });
  }
  deleteMasterdata(o:any) {
    this.api.confirmModal('Eliminar','¿Eliminar valor?').then(async (ok) => {
      if (ok.isConfirmed) {

        this.loading = true;
        try {
          if (this.master == 'Lab') {
            const setup = await lastValueFrom(this.api.deleteLab(o.LabID));
          }
          if (this.master == 'Medicine') {
            const setup = await lastValueFrom(this.api.deleteMedicine(o.MedicineID));
          }
          if (this.master == 'ExamType') {
            const setup = await lastValueFrom(this.api.deleteExamType(o.ExamTypeID));
          }
          if (this.master == 'Exam') {
            const setup = await lastValueFrom(this.api.deleteExam(o.ExamID));
          }
          if (this.master == 'Specialist') {
            const setup = await lastValueFrom(this.api.deleteSpecialist(o.SpecialistID));
          }
          if (this.master == 'Diagnosis') {
            const setup = await lastValueFrom(this.api.deleteDiagnosis(o.DiagnosisID));
          }
          if (this.master == 'Surgery') {
            const setup = await lastValueFrom(this.api.deleteSurgery(o.SurgeryID));
          }
          if (this.master == 'CertificateType') {
            const setup = await lastValueFrom(this.api.deleteCertificateType(o.CertificateTypeID));
          }
          if (this.master == 'Health') {
            const setup = await lastValueFrom(this.api.deleteHealth(o.HealthID));
          }
          if (this.master == 'ExamData') {
            const setup = await lastValueFrom(this.api.deleteExamData(o.ExamDataID));
          }
          this.loading = false;
          this.reloadMasterdata();
          this.api.toastOk("Realizado correctamente");
        } catch (err:any) {
          this.loading = false;
          this.api.toastError(err.error.message);  
        }

      }
    });
  }
  getMasterdataId(o:any) {
    if (this.master == 'Lab') {
      return o.LabID;
    }
    if (this.master == 'Medicine') {
      return o.MedicineID;
    }
    if (this.master == 'ExamType') {
      return o.ExamTypeID;
    }
    if (this.master == 'Exam') {
      return o.ExamID;
    }
    if (this.master == 'Specialist') {
      return o.SpecialistID;
    }
    if (this.master == 'Diagnosis') {
      return o.DiagnosisID;
    }
    if (this.master == 'Surgery') {
      return o.SurgeryID;
    }
    if (this.master == 'CertificateType') {
      return o.CertificateTypeID;
    }
    if (this.master == 'Health') {
      return o.HealthID;
    }
    if (this.master == 'ExamData') {
      return o.ExamDataID;
    }
  }
  saveTemplate() {
    this.loading = true;
    this.api.setTemplate(this.surgery,this.template).subscribe((data:any) => {
      this.loading = false;
      this.api.toastOk("Guardado correctamente");
    },(err:any) => {
      this.loading = false;
      this.api.toastError(err.error.error);
    });
  }
  examEvaluate(index:number) {
    
  }
  getExams(index:number) { 
    return this.Exams.filter((x:any) => { return parseInt(x.ExamTypeID) == parseInt(this.template.Orders[index].ExamTypeID) });
  }
  addOrder() {
    this.template.Orders.push({
      ExamTypeID: 0,
      ExamID: 0,
      Description: '',
    });
  }
  addCertificate() {
    this.template.Certificates.push({
      CertificateTypeID: 0,
      Description: ''
    });
  }
  addInterview() {
    this.template.Interviews.push({
      SpecialistID: '',
      Description: '',
      DiagnosisID: '',
      WantText: '',
      VB: false
    });
  }
  addRecipe() {
    this.template.Recipes.push({
      MedicineID: 0,
      Dose: '',
      Period: '',
      Periodicity: ''
    });
  }
 
}
