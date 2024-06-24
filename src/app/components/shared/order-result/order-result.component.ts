import { Component, Input, OnInit, Output, EventEmitter, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxRutService } from '@numetalsour/ngx-rut';
import { ApiService } from 'src/app/api.service';
import { DummyService } from 'src/app/dummy.service';
import { MaskService } from 'src/app/mask.service';

@Component({
  selector: 'app-order-result',
  templateUrl: './order-result.component.html',
  styleUrls: ['./order-result.component.scss']
})
export class OrderResultComponent implements OnInit {

  public data: any = {};
  public loading: boolean = false;
  public render: boolean = false;
  public faSpinner = faSpinner; 

  public ExamsData: any[] = []; 
  public Exams: any[] = [];
  public itemsA: any[] = [];
  public itemsB: any[] = [];
  public ficha: string  = '';
  public comments: string  = '';
  @Input() DateID: string = '';
  @Input() PeopleID: string = '';
  @Input() fecha: string = '';
  @Input() SingleID: string = '';
  @Input() ExamTypeID: string = '';
  @Input() ExamTypeName: string = '';

  constructor(
    private api: ApiService,
    public modal: NgbActiveModal,
    public dummy: DummyService,
    public rut: NgxRutService,
    public mask: MaskService
  ) { }

  ngOnInit(): void {
    
    this.loading = true;
    console.log('DateID', this.DateID);
    console.log('SingleID', this.SingleID);
    console.log('ExamTypeID', this.ExamTypeID);

    this.api.getPeopleFicha(this.PeopleID).subscribe((data:any) => {
      this.ficha = data.text;
    })
    this.api.getExamDatas().subscribe((data:any)=>{ 
      this.ExamsData = data.filter((x:any) => { return this.Exams.indexOf(x.ExamName) > - 1 }); // solo valores solicitados en la entrada
      
      this.comments = (this.ExamsData[0].comments || '');
      if (this.DateID!='') {
        this.api.getExamValuesByDate(this.DateID).subscribe((data:any) => {
          for (let i = 0; i < this.ExamsData.length; i++) {
            for (let j = 0; j < data.length; j++) {
              let f = this.ExamsData.findIndex((x:any) => { return x.ExamDataID == data[j].ExamDataID });
              if (f > -1) {
                this.ExamsData[f].Value = data[j].Value;
              }
            }
          }
          this.renderiza();
        });
      }
      else if (this.SingleID!='') {
        this.api.getExamValuesByGroup(this.SingleID).subscribe((data:any) => {
          for (let i = 0; i < this.ExamsData.length; i++) {
            for (let j = 0; j < data.length; j++) {
              let f = this.ExamsData.findIndex((x:any) => { return x.ExamDataID == data[j].ExamDataID });
              if (f > -1) {
                this.ExamsData[f].Value = data[j].Value;
              }
            }
          }
          this.renderiza();
        });
      }


    });
    
  }
  renderiza() {
    //console.log(this.ExamsData);

    this.itemsA = this.ExamsData.filter((x:any) => { return x.Side == 'A' }).sort((a,b) => { return parseInt(a.SideOrder) - parseInt(b.SideOrder) }).map((item) => ({
      ExamTypeName: item.ExamTypeName,
      ExamTypeID: item.ExamTypeID
    })).filter((item, index, self) =>
      index === self.findIndex((t) => ( t.ExamTypeID === item.ExamTypeID
    )));
    this.itemsB = this.ExamsData.filter((x:any) => { return x.Side == 'B' }).sort((a,b) => { return parseInt(a.SideOrder) - parseInt(b.SideOrder) }).map((item) => ({
      ExamTypeName: item.ExamTypeName,
      ExamTypeID: item.ExamTypeID
    })).filter((item, index, self) =>
      index === self.findIndex((t) => ( t.ExamTypeID === item.ExamTypeID
    )));

    for (let i = 0; i<this.itemsA.length; i++) {
      this.itemsA[i].sub = this.getItemsByExamTypeId(this.itemsA[i].ExamTypeID);
    }
    for (let i = 0; i<this.itemsB.length; i++) {
      this.itemsB[i].sub = this.getItemsByExamTypeId(this.itemsB[i].ExamTypeID);
    }
    console.log("this.itemsA", this.itemsA);
    console.log('this.itemsB',this.itemsB);

    this.render = true; 
    this.loading = false; 
  }
  ngAfterViewInit() { 
    
  }

  getItemsByExamTypeId(id:string) {
    let z = this.ExamsData.filter((x:any) => { return x.ExamTypeID == id }).map((item) => ({
      ExamDataID: item.ExamDataID,
      ExamName: item.ExamName,
      ExamDataType: item.ExamDataType,
      Name: item.Name,
      ExamOrden: item.ExamOrden,
      Value: item.Value
    })).sort((a,b) => { return parseInt(a.ExamOrden) - parseInt(b.ExamOrden) });
    return z;
  }
  getValue(id:string) {
    let d = this.ExamsData.findIndex((x:any) => { return x.ExamDataID == id });
    if (d > -1) {
      let v = this.ExamsData[d].Value || '';
      return v;
    } else {
      return '';
    }
  }
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46 && charCode != 48 && charCode != 44) {
      return false;
    }
    return true;
  }
  setValue(id:string, event:any) {
    let d = this.ExamsData.findIndex((x:any) => { return x.ExamDataID == id });
    if (d > -1) {
      this.ExamsData[d].Value = event.target.value;
    }
  }
  save() {
    this.loading = true;
    
    this.api.saveExamData({
      DateID: this.DateID,
      SingleID: this.SingleID,
      data: this.ExamsData,
      comments: this.comments
    }).subscribe((data:any) => {
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
}
