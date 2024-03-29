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
  public Exams: any[] = [];
  @Input() DateID: string = '';
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
    });
  }
  ngAfterViewInit() { 
    
  }
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46 && charCode != 48 && charCode != 44) {
      return false;
    }
    return true;
  }
  save() {
    this.loading = true;
    
    this.api.saveExamData({
      data: this.rows,
      DateID: this.DateID,
      SingleID: this.SingleID
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
