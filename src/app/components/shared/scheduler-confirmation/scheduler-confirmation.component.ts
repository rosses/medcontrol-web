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
    DateID:     0,
    cardcode:   '',
    name:       '',
    Weight:     0,
    Height:     0,
    Sistolic:   0,
    Diastolic:  0,
    Temperature:0
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
    this.api.addDatesConfirm(this.data).subscribe((data:any) => {
      this.api.toastOk("Confirmado correctamente");
      this.modal.close({
        success: true
      });
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
