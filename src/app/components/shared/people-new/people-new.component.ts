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
  selector: 'app-people-new',
  templateUrl: './people-new.component.html',
  styleUrls: ['./people-new.component.scss']
})
export class PeopleNewComponent implements OnInit {

  public healths: any[] = [];
  public data: any = {
    CardCode:    '',
    Name:       '',
    Lastname:   '',
    Lastname2:  '',
    Phone:      '',
    Phone2:     '',
    Email:      '',
    Address:    '',
    County:     '',
    City:       '',
    HealthID:     '',
    Profession: '',
    Obs:        '',
    Mode:       'fast',
    dates:      {
        date: new Date().toISOString().substring(0,10),
        time: new Date().toISOString().substring(11,16)
    }
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
    this.api.getHealths().subscribe((data:any) => {
      this.healths = data;
    });
  }
  async save() {
    this.loading = true;
    try {
      const s:any = await lastValueFrom(this.api.addPeople(this.data));
      this.api.toastOk("Creado correctamente");
      this.modal.close({success: true, data: s.data, date: s.date});
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
