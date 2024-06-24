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
  public rows: any[] = [];
  public table: any[] = [];
  public Exams: any[] = [];
  public itemsA: any[] = [];
  public itemsB: any[] = [];
  @Input() DateID: string = '';
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
    this.api.getExamDatas().subscribe((data:any)=>{ 
      this.ExamsData = data.filter((x:any) => { return this.Exams.indexOf(x.ExamName) > - 1 }); // solo valores solicitados en la entrada
      

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
        
          this.render = true; 
          this.loading = false; 
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
          this.render = true; 
          this.loading = false; 
        });
      }

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
    });
    /*
    this.api.getExamDatas().subscribe((data:any)=>{ 
      this.ExamsData = data; 
      console.log(this.ExamsData);
      if (this.ExamTypeID) {
        this.rows = this.ExamsData.filter((x) => { return x.ExamTypeID == this.ExamTypeID && this.Exams.indexOf(x.ExamName) > -1});
      }
      else {
        this.rows = this.ExamsData.filter((x) => { return this.Exams.indexOf(x.ExamName) > -1});
      }
      console.log('Exams', this.Exams);

      if (this.DateID!='') {
        this.api.getExamValuesByDate(this.DateID).subscribe((data:any) => {
          for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < data.length; j++) {
              if (this.rows[i].ExamDataID == data[j].ExamDataID) {
                this.rows[i].Value = data[j].Value;
                this.rows[i].ExamDataValueID = data[j].ExamDataValueID;
              }
            }
          }
          this.render = true; 
          this.loading = false; 
        });
      }
      else if (this.SingleID!='') {
        this.api.getExamValuesByGroup(this.SingleID).subscribe((data:any) => {
          for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < data.length; j++) {
              if (this.rows[i].ExamDataID == data[j].ExamDataID) {
                this.rows[i].Value = data[j].Value;
                this.rows[i].ExamDataValueID = data[j].ExamDataValueID;
              }
            }
          }
          this.render = true; 
          this.loading = false; 
        });
      }
      this.table = [];
      console.log(this.rows);

      for (let i = 0; i < this.rows.length; i++) {

        if (this.table.filter((x:any) => { return x.ExamTypeID == this.rows[i].ExamTypeID  }).length == 0) {
          this.table.push({
            ExamTypeID: this.rows[i].ExamTypeID,
            ExamTypeName: this.rows[i].ExamTypeName,
            items: []
          });
        }
        
        let fi = this.table.findIndex((x:any)=>{ return x.ExamTypeID == this.rows[i].ExamTypeID});
        if (this.table[fi].items.findIndex((x:any)=>{return x.ExamDataID == this.rows[i].ExamDataID})==-1) {
          this.table[fi].items.push({
            ExamName: this.rows[i].ExamName,
            ExamID: this.rows[i].ExamID,
            ExamDataValueID: this.rows[i].ExamDataValueID,
            ExamDataType: this.rows[i].ExamDataType,
            ExamDataID: this.rows[i].ExamDataID,
            Name: this.rows[i].Name,
            Active: this.rows[i].Active
          });
        }
      } 
      console.log(this.table);
    });
    */
  }
  trackByFna0(index: number, item: any): any {
    return item.ExamDataID; // or any unique identifier for your items
  }
  trackByFna1(index: number, item: any): any {
    return item.ExamDataID; // or any unique identifier for your items
  }
  ngAfterViewInit() { 
    
  }

  getItemsByExamTypeId(id:string) {
    console.log('getItemsByExamTypeId', id);
    let z = this.ExamsData.filter((x:any) => { return x.ExamTypeID == id }).sort((a,b) => { return parseInt(a.ExamsOrden) - parseInt(b.ExamsOrden) }).map((item) => ({
      ExamDataID: item.ExamDataID,
      ExamName: item.ExamName,
      ExamDataType: item.ExamDataType,
      Name: item.Name,
      ExamOrden: item.ExamOrden,
      Value: item.Value
    }));
    console.log(z);
    return z;
  }
  getValue(id:string) {
    let d = this.ExamsData.findIndex((x:any) => { return x.ExamDataID == id });
    if (d > -1) {
      let v = this.ExamsData[d].Value || '';
      console.log('getValue', id, ' => ', v);
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
      //data: this.rows,
      DateID: this.DateID,
      SingleID: this.SingleID,
      data: this.ExamsData
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
