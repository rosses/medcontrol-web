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
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent implements OnInit {

  public statuses: any[] = [];
  public data: any = {
    StatusID: '',
    PeopleID: ''
  };
  public loading: boolean = true;
  public faSpinner = faSpinner;

  constructor(
    private api: ApiService,
    public modal: NgbActiveModal,
    public dummy: DummyService,
    public rut: NgxRutService,
    public mask: MaskService
  ) { }

  ngOnInit(): void {
    this.api.getStatuses().subscribe((data:any) => {
      this.statuses = data;
      this.loading = false;
    });
  }
  async save() {
    this.loading = true;
    try {
      const s:any = await lastValueFrom(this.api.changeStatusPeople(this.data));
      this.api.toastOk("Guardado correctamente");
      this.modal.close({success: true, data: this.statuses.filter((x:any) => { return x.StatusID == this.data.StatusID })[0] });
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
