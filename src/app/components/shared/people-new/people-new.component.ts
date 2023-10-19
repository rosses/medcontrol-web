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
    Health:     '',
    Profession: '',
    Obs:        '',
    Mode:       'fast',
    dates:      {
        date: '',
        time: ''
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
      this.modal.close({success: true});
      this.loading = false;
    } catch (err:any) {
      this.api.toastError(err.error.message);
      this.loading = false;
    }

    /*
    setTimeout (()=>{     
      console.log(this.data);
      if (
        this.data.cardcode == '' || 
        this.data.name == '' || 
        this.data.lastname == '' || 
        this.data.dates[0].date == '' || 
        this.data.dates[0].time == '' 
      ) {
        this.api.toastError("Campos con (*) son obligatorios");
        this.loading = false;
      }
      else {
        let d = this.data;
        d.name = d.name.toUpperCase();
        d.lastname = d.lastname.toUpperCase();
        d.lastname2 = d.lastname2.toUpperCase();
        d.cardcode = this.rut.formatRut(d.cardcode).split('.').join('');
        let f = d.dates[0].date.split('-').reverse();
        f[2] = f[2].substring(2,4);
        d.dates[0].date = f.join('/');
        
        this.dummy.people.push(d);
        this.api.toastOk("Creado correctamente");
        this.modal.close({
          success: true
        });
        this.loading = false;
      }
    },1500);
    */

  }
 
  cancel() {
    this.modal.dismiss();
  }
}
function lastFromValue(arg0: Observable<any>) {
  throw new Error('Function not implemented.');
}

