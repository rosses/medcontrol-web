import { Component, Input, OnInit, Output, EventEmitter, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxRutService } from '@numetalsour/ngx-rut';
import { ApiService } from 'src/app/api.service';
import { DummyService } from 'src/app/dummy.service';
import { MaskService } from 'src/app/mask.service';

@Component({
  selector: 'app-scheduler-confirmation',
  templateUrl: './scheduler-confirmation.component.html',
  styleUrls: ['./scheduler-confirmation.component.scss']
})
export class SchedulerConfirmationComponent implements OnInit {

  public data: any = {
    cardcode:   '',
    name:       '',
    weight:     0,
    height:     0,
    sistolic:   0,
    diastolic:  0,
    temp:       0
  };
  public loading: boolean = false;
  public faSpinner = faSpinner;
  @ViewChild("temp") tempField!: ElementRef;

  constructor(
    private api: ApiService,
    public modal: NgbActiveModal,
    public dummy: DummyService,
    public rut: NgxRutService,
    public mask: MaskService
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.tempField.nativeElement.focus();
  }

  save() {
    this.loading = true;
    setTimeout (()=>{     
      
      let f = this.dummy.people.map((e:any) => {return e.cardcode;}).indexOf(this.data.cardcode);
      if (f > -1) {
        this.dummy.people[f].dates[0].confirmed = true;
        this.dummy.people[f].dates[0].triage.weight = this.data.weight;
        this.dummy.people[f].dates[0].triage.height = this.data.height;
        this.dummy.people[f].dates[0].triage.sistolic = this.data.sistolic;
        this.dummy.people[f].dates[0].triage.diastolic = this.data.diastolic;
        this.dummy.people[f].dates[0].triage.temp = this.data.temp; 
        this.api.toastOk("Confirmado correctamente");
        this.modal.close({
          success: true
        });
      } else {
        this.api.toastError("Error general");  
      }
      this.loading = false;
    },1500);


  }
 
  cancel() {
    this.modal.dismiss();
  }
}
