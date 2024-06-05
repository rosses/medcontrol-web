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
  selector: 'app-change-dates2',
  templateUrl: './change-dates2.component.html',
  styleUrls: ['./change-dates2.component.scss']
})
export class ChangeDates2Component implements OnInit {

  public data: any = {
    DatePost1: '',
    DatePost2: '',
    DatePost3: '',
    DatePost4: '',
    DatePost5: '',
    DatePost6: '',
    DateMsg1: '',
    DateMsg2: '',
    DateMsg3: '',
    DateMsg4: '',
    DateMsg5: '',
    DateMsg6: '',
    PeopleID: '',
    PeopleSurgeryID: '',
    DateID: ''
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
    console.log(this.data);
  }
  async save() {
    this.loading = true;
    try {
      const s:any = await lastValueFrom(this.api.changeDatesPeople2(this.data));
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
