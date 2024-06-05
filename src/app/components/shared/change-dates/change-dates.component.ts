import { Component, Input, OnInit, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxRutService } from '@numetalsour/ngx-rut';
import { Observable, lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { DummyService } from 'src/app/dummy.service';
import { MaskService } from 'src/app/mask.service';

@Component({
  selector: 'app-change-dates',
  templateUrl: './change-dates.component.html',
  styleUrls: ['./change-dates.component.scss']
})
export class ChangeDatesComponent implements OnInit {

  public data: any = {
    DateAsEnter: '',
    DateAsSurgery: '',
    DateAsFinish: '',
    PeopleID: '',
    PeopleSurgeryID: ''
  };
  public loading: boolean = false;
  public faSpinner = faSpinner;

  constructor(
    private api: ApiService,
    public modal: NgbActiveModal,
    public dummy: DummyService,
    public rut: NgxRutService,
    public mask: MaskService
  ) { }

  ngOnInit(): void {

  }
  async save() {
    this.loading = true;
    try {
      const s:any = await lastValueFrom(this.api.changeDatesPeople(this.data));
      this.api.toastOk("Guardado correctamente");
      this.modal.close({success: true, data: s.data });
      this.loading = false;
    } catch (err:any) {
      this.api.toastError(err.error.message);
      this.loading = false;
    }
  }
 
  cancel() {
    this.modal.dismiss();
  }
}
