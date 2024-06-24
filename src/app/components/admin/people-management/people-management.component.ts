import { Component, OnInit } from '@angular/core';
import { faAngleUp, faAngleDown, faEdit, faPrint, faChartLine, faCopy, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
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
import { ChangeStatusComponent } from '../../shared/change-status/change-status.component';
import { ChangeDatesComponent } from '../../shared/change-dates/change-dates.component';
import { CopyFichaComponent } from '../../shared/copy-ficha/copy-ficha.component';
import { ChangeDates2Component } from '../../shared/change-dates2/change-dates2.component';
import { WhatsAppShareComponent } from '../../shared/whatsapp-share/whatsapp-share.component';
import { ImcComponent } from '../../shared/imc/imc.component';
import { SingleExamsComponent } from '../../shared/single-exams/single-exams.component';
import { SingleRecipeComponent } from '../../shared/single-recipe/single-recipe.component';


@Component({
  selector: 'app-people-management',
  templateUrl: './people-management.component.html',
  styleUrls: ['./people-management.component.scss']
})
export class PeopleManagementComponent implements OnInit {

  public data: any = {};
  public dataPost: any = {};
  public loading: boolean = false;
  public active:number = 0;
  public dates: any[] = [];
  public exams: any[] = [];
  public evolutions: any[] = [];
  public recipes: any[] = [];
  public certificates: any[] = [];
  public interviews: any[] = [];
  public budgets: any[] = [];
  public budgetstatuses: any[] = [];
  public id: string = '';
  public render: boolean = false;

  public Healts: any[] = [];
  public faEdit = faEdit;
  public faPrint = faPrint;
  public faCopy = faCopy;
  public faChartLine = faChartLine;
  public faCheckCircle = faCheckCircle;
  public addText: any = {
    message: ''
  }

  constructor(
    public api: ApiService,
    public modal: NgbModal, 
    private ar: ActivatedRoute,
    public router: Router,
    public dummy: DummyService
  ) { }

  ngOnInit(): void {
    this.api.getHealths().subscribe((data:any) => { this.Healts = data; });
    this.api.getBudgetStatus().subscribe((data:any) => { this.budgetstatuses = data; });
    this.id = this.ar.snapshot.paramMap.get('id') || '';
    if (this.id == '') {
      this.api.toastError("Error al obtener datos");
      this.router.navigateByUrl('/admin/people');
    }
    else {
      this.setActive(0,true);
    } 
  }
  addTexto() { 
    this.loading = true;
    this.api.addEvolution({
      Description: ""+this.addText.message+"",
      DateAs: new Date().toISOString().substring(0,10),
      PeopleID: this.id
    }).subscribe(async (data:any) => {
      this.evolutions = await lastValueFrom(this.api.getPeopleEvolutions(this.id));
      this.addText.message = '';
      this.api.toastOk("Agregado correctamente");
      this.loading = false;
    },(err:any) => {
      this.api.toastError(err.error.message);
      this.loading = false;
    });
  }
  
  changeDates2(x:any,idx:number) {
    console.log('changeDates2()');
    const mdl = this.modal.open(ChangeDates2Component, {
      backdrop: false,
      keyboard: true,
      size: 'lg'
    }); 
    mdl.componentInstance.data.DatePost1 = (x.DatePost1);
    mdl.componentInstance.data.DatePost2 = (x.DatePost2);
    mdl.componentInstance.data.DatePost3 = (x.DatePost3);
    mdl.componentInstance.data.DatePost4 = (x.DatePost4);
    mdl.componentInstance.data.DatePost5 = (x.DatePost5);
    mdl.componentInstance.data.DatePost6 = (x.DatePost6);
    mdl.componentInstance.data.DateMsg1 = (x.DateMsg1);
    mdl.componentInstance.data.DateMsg2 = (x.DateMsg2);
    mdl.componentInstance.data.DateMsg3 = (x.DateMsg3);
    mdl.componentInstance.data.DateMsg4 = (x.DateMsg4);
    mdl.componentInstance.data.DateMsg5 = (x.DateMsg5);
    mdl.componentInstance.data.DateMsg6 = (x.DateMsg6);
    mdl.componentInstance.data.PeopleID = x.PeopleID;
    mdl.componentInstance.data.DateID = x.DateID;
    mdl.componentInstance.data.PeopleSurgeryID = x.PeopleSurgeryID;
    mdl.result.then((data:any) => {
      if (data.success) {
        this.data.Surgerys[idx] = data.data;
      }
    },(err:any) => { 
      
    });    
  }
  
  changeDates(x:any, idx:number) {
    //console.log('changeDates('+PeopleID+','+DateAsEvaluation+','+DateAsSurgery+','+DateAsFinish+')');
    const mdl = this.modal.open(ChangeDatesComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg'
    }); 
    mdl.componentInstance.data.DateAsEnter = (x.DateAsEvaluation);
    mdl.componentInstance.data.DateAsSurgery = (x.DateAsSurgery);
    mdl.componentInstance.data.DateAsFinish = (x.DateAsFinish);
    mdl.componentInstance.data.PeopleID = x.PeopleID;
    mdl.componentInstance.data.PeopleSurgeryID = x.PeopleSurgeryID;
    mdl.result.then((data:any) => {
      console.log(data);
      if (data.success) {
        this.data.Surgerys[idx] = data.data;
      }
    },(err:any) => { 
      
    });
  }
  imc(w:number, h:number, t: number) {
    const mdl = this.modal.open(ImcComponent, {
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
  async loadPeople(id:string, first: boolean) {
    this.loading = true;
    try {
      this.data = await lastValueFrom(this.api.getPeople(id));
      //this.dataPost = await lastValueFrom(this.api.getPeoplePost(id));
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
  getRequestedInterviewsOk() {
    let t = this.data.RequestedInterviews.length;
    let ok = this.data.RequestedInterviews.filter((x:any)=>{return x.VB_Check==1}).length;
    return Math.round( (ok * 100 / t) * 100 ) / 100;
  }
  getRequestedOrdersOk() {
    let t = this.data.RequestedOrders.length;
    let ok = this.data.RequestedOrders.filter((x:any)=>{return x.Value=='checked'}).length;
    return Math.round( (ok * 100 / t) * 100 ) / 100;
  }
  changeStatus(PeopleID: string, StatusID:string) {
    console.log('changeStatus('+PeopleID+','+StatusID+')');
    const mdl = this.modal.open(ChangeStatusComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg'
    }); 
    mdl.componentInstance.data.StatusID = parseInt(StatusID);
    mdl.componentInstance.data.PeopleID = PeopleID;
    mdl.result.then((data:any) => {
      console.log(data);
      if (data.success) {
        this.data.GroupID = data.data.GroupID;
        this.data.GroupName = data.data.GroupName;
        this.data.StatusID = data.data.StatusID;
        this.data.StatusName = data.data.Name;
      }
    },(err:any) => { 
      
    });
  }
  addOrdenExamenesManual() {
    console.log('addOrdenExamenesManual()');
    const mdl = this.modal.open(SingleExamsComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg',
      windowClass: 'session-modal'
    });  
    mdl.componentInstance.PeopleID = this.id;
    mdl.result.then(async (data:any) => {
      console.log(data);
      if (data.whatsapp) {
        this.sendWhatsApp('orders-single','Tu orden de exámenes',data.GroupSingleID)
      }      
      this.exams = await lastValueFrom(this.api.getPeopleExams(this.id));
      this.loading = false;
    },(err:any) => { 
      
    });
  }

  addRecipeManual() {
    console.log('addRecipeManual()');
    const mdl = this.modal.open(SingleRecipeComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg',
      windowClass: 'session-modal'
    });  
    mdl.componentInstance.PeopleID = this.id;
    mdl.result.then(async (data:any) => {
      console.log(data);
      if (data.whatsapp) {
        this.sendWhatsApp('recipe-single','Tu recetá está disponible',data.GroupSingleID);
      }
      this.recipes = await lastValueFrom(this.api.getPeopleRecipes(this.id));
      this.loading = false;
    },(err:any) => { 
      
    });
  }

  deployResults(DateID:string, ExamTypeID?: any, ExamTypeName?: any, Exams?: any, fecha?: string) {

    let ExamTypeNames = [];
    if (!Exams) {
      Exams = [];
      for (let i = 0; i < this.exams.length; i++) {
        for (let j = 0; j < this.exams[i].data.length; j++) {
          if (this.exams[i].DateID == DateID) {
            Exams = [ ...Exams, ...this.exams[i].data[j].Exams ];
            ExamTypeNames.push(this.exams[i].data[j].ExamTypeName);
          }
        }
      }
    }
    console.log(Exams);
    const mdl = this.modal.open(OrderResultComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg',
      windowClass: 'cargaa'
    }); 
    mdl.componentInstance.fecha = fecha?.split('-').reverse().join('-');
    mdl.componentInstance.DateID = DateID;
    mdl.componentInstance.PeopleID = this.id;
    mdl.componentInstance.ExamTypeName = ExamTypeName;
    mdl.componentInstance.ExamTypeNames = ExamTypeNames;
    mdl.componentInstance.ExamTypeID = ExamTypeID;
    mdl.componentInstance.Exams = Exams;
    mdl.result.then((data:any) => {
      
    },(err:any) => { 
      
    });
  }

  deployResultsSingle(SingleID:string, ExamTypeID?: any, ExamTypeName?: any, Exams?: any , fecha?: string) {

    let ExamTypeNames = [];
    if (!Exams) {
      Exams = [];
      for (let i = 0; i < this.exams.length; i++) {
        for (let j = 0; j < this.exams[i].data.length; j++) {
          if (this.exams[i].DateID == SingleID) {
            Exams = [ ...Exams, ...this.exams[i].data[j].Exams ];
            ExamTypeNames.push(this.exams[i].data[j].ExamTypeName);
          }
        }
      }
    }
    console.log(Exams);
    const mdl = this.modal.open(OrderResultComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg',
      windowClass: 'cargaa'
    }); 
    mdl.componentInstance.fecha = fecha?.split('-').reverse().join('-');
    mdl.componentInstance.SingleID = SingleID;
    mdl.componentInstance.PeopleID = this.id;
    mdl.componentInstance.ExamTypeName = ExamTypeName;
    mdl.componentInstance.ExamTypeNames = ExamTypeNames;
    mdl.componentInstance.ExamTypeID = ExamTypeID;
    mdl.componentInstance.Exams = Exams;
    mdl.result.then((data:any) => {
      
    },(err:any) => { 
      
    });
  }
  verOrdenPDF(DateID:string,single?:boolean) {
    if (single) {
      window.open(environment.url + '/v1/pdf-render/data-single-orders/'+DateID,'_blank');
    } else {
      window.open(environment.url + '/v1/pdf-render/data-orders/'+DateID,'_blank');
    }
  }
  verRecipePDF(DateID:string,single?:boolean) {
    if (single) {
      window.open(environment.url + '/v1/pdf-render/single-recipes/'+DateID,'_blank');
    } else {
      window.open(environment.url + '/v1/pdf-render/recipes/'+DateID,'_blank');
    }
  }
  sendWhatsApp(type: string,text:string, ID: string){
    const mdl = this.modal.open(WhatsAppShareComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg'
    }); 
    let url = "";
    if (type=="recipe") {
      url = (environment.url + '/v1/pdf-render/recipes/'+ID);
    }
    else if (type=="orders") {
      url = (environment.url + '/v1/pdf-render/data-orders/'+ID);
    }
    else if (type=="recipe-single") {
      url = (environment.url + '/v1/pdf-render/single-recipes/'+ID);
    }
    else if (type=="orders-single") {
      url = (environment.url + '/v1/pdf-render/data-single-orders/'+ID);
    }
    mdl.componentInstance.PhoneNumber = ""+(this.data.Phone.length <= 9 ? this.data.Phone : this.data.Phone.substring(this.data.Phone.length - 9));
    mdl.componentInstance.Text = text + ", click para ver: \n" + url;
    mdl.result.then((data:any) => {
      
    },(err:any) => { 
      
    });
  }
  verCertsPDF(DateID:string) {
    window.open(environment.url + '/v1/pdf-render/certificates/'+DateID,'_blank');
  }
  verCertsPDFSingle(CertificateID:string) {
    window.open(environment.url + '/v1/pdf-render/certs-single/'+CertificateID,'_blank');
  }
  filterbox() {

  }
  addQuery(CardCode:string) {
    const mdl = this.modal.open(PeopleNewComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg'
    });
    mdl.componentInstance.data.Mode = 'newdate';
    mdl.componentInstance.data.CardCode = CardCode;
    mdl.componentInstance.data.dates.date = new Date().toISOString().substring(0,10);
    mdl.componentInstance.data.dates.time = new Date().toISOString().substring(11,16);
    mdl.result.then(async (data:any) => {
      if (data.date) {
        if (parseInt(data.date.DateID)>0) {
          this.session(data.date.DateID);
        }
      }
      this.dates = await lastValueFrom(this.api.getPeopleDates(this.id));
    },(err:any) => { console.log('dismiss:',err); });
  }
  compareOrders() {
    this.api.toastError("Not implemented");
  }
  copyFicha(PeopleID:string) {
    const mdl = this.modal.open(CopyFichaComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg'
    });  
    mdl.componentInstance.PeopleID = PeopleID;
    mdl.result.then((data:any) => {

    },(err:any) => { 
      
    });
  }
  printFicha(type:string,ID:string) {
    window.open(environment.url + '/v1/pdf-render/exams-sheet/'+type+'/'+ID,'_blank');
  }
  addEvolution() {
    const mdl = this.modal.open(EvolutionAddComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg'
    });  
    mdl.componentInstance.data.PeopleID = this.id;
    mdl.result.then((data:any) => {
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
    },(err:any) => { 
      
    });
  }
  deleteFreeOrder(id:string) {
    this.api.confirmModal("Eliminar orden","¿Desea eliminar la orden?").then((status:SweetAlertResult) => {
      if (status.isConfirmed) {
        this.loading = true;
        this.api.deleteFreeOrder(id).subscribe((data:any) => {
          this.api.toastOk("Eliminado con éxito");
          this.setActive(4);
        },(err:any) => {
          this.api.toastError(err.error.error);
          this.loading = false;
        })
      }
    });
  }
  deleteFreeRecipe(id:string) {
    this.api.confirmModal("Eliminar receta","¿Desea eliminar la receta?").then((status:SweetAlertResult) => {
      if (status.isConfirmed) {
        this.loading = true;
        this.api.deleteFreeRecipe(id).subscribe((data:any) => {
          this.api.toastOk("Eliminado con éxito");
          this.setActive(5);
        },(err:any) => {
          this.api.toastError(err.error.error);
          this.loading = false;
        })
      }
    });
  }
  deleteRecipes(num:number) {
    this.api.confirmModal("Eliminar receta","¿Desea eliminar la receta?").then((status:SweetAlertResult) => {
      if (status.isConfirmed) {
        this.loading = true;
        this.api.deleteRecipe(this.recipes[num].RecepID).subscribe((data:any) => {
          this.api.toastOk("Eliminado con éxito");
          this.setActive(3);
        },(err:any) => {
          this.api.toastError(err.error.error);
          this.loading = false;
        })
      }
    });
  }
  PDFInterview(id:string) {
    window.open(environment.url + '/v1/pdf-render/certs-interview/'+id,'_blank'); 
  }
  deleteInterview(num:number) {
    this.api.confirmModal("Eliminar interconsulta","¿Desea eliminar la interconsulta?").then((status:SweetAlertResult) => {
      if (status.isConfirmed) {
        this.loading = true;
        this.api.deleteInterview(this.interviews[num].InterviewID).subscribe((data:any) => {
          this.api.toastOk("Eliminado con éxito");
          this.setActive(7);
        },(err:any) => {
          this.api.toastError(err.error.error);
          this.loading = false;
        })
      }
    });
  }
  VBInterview(num:number) {
    this.api.confirmModal("Dar VB","¿Desea dar el VB a la interconsulta?").then((status:SweetAlertResult) => {
      if (status.isConfirmed) {
        this.loading = true;
        this.api.okInterview(this.interviews[num].InterviewID).subscribe((data:any) => {
          this.api.toastOk("Realizado con éxito");
          this.setActive(7);
        },(err:any) => {
          this.api.toastError(err.error.error);
          this.loading = false;
        })
      }
    });
  }
  deleteEvolutions(num:number) {
    this.api.confirmModal("Eliminar evolución","¿Desea eliminar la evolución?").then((status:SweetAlertResult) => {
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
    else if (num == 5) {
      this.recipes = await lastValueFrom(this.api.getPeopleRecipes(this.id));
      this.loading = false;
    }
    else if (num == 6) {
      this.certificates = await lastValueFrom(this.api.getPeopleCertificates(this.id));
      this.loading = false;
    }
    else if (num == 7) {
      this.interviews = await lastValueFrom(this.api.getPeopleInterviews(this.id));
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
    return 0;
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

  session(DateID:string) {
    this.loading = true;
    this.api.getDate(DateID).subscribe((data:any) => {
      const mdl = this.modal.open(SessionCompleteComponent, {
        backdrop: false,
        keyboard: true,
        windowClass: 'session-modal'
      });
      mdl.componentInstance.data = data;
      mdl.componentInstance.data.dropOrders = [];
      mdl.componentInstance.data.dropCertificates = [];
      mdl.componentInstance.data.dropInterviews = [];
      mdl.componentInstance.data.dropRecipes = [];
      mdl.componentInstance.dataPeople = this.data;
      mdl.result.then((data:any) => {
        console.log(data);
        if (data.success) {
          for (let i = 0 ; i < this.dates.length; i++) {
            if (this.dates[i].DateID == DateID) {
              this.dates[i].interviews = data.interviews.length;
              this.dates[i].recipes = data.recipes.length;
              this.dates[i].orders = data.orders.length;
              this.dates[i].certificates = data.certificates.length;
              break;
            }
          }
          if (data.whatsapp) {
            this.sendWhatsApp('orders','Tu orden de exámenes',DateID)
          }
        }
      },(err:any) => { console.log('dismiss:',err); });
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
