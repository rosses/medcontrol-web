import { Component, Input, OnInit, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxRutService } from '@numetalsour/ngx-rut';
import { ApiService } from 'src/app/api.service';
import { DummyService } from 'src/app/dummy.service';
import { MaskService } from 'src/app/mask.service';

@Component({
  selector: 'app-people-new',
  templateUrl: './people-new.component.html',
  styleUrls: ['./people-new.component.scss']
})
export class PeopleNewComponent implements OnInit {

  public data: any = {
    cardcode:    '',
    name:       '',
    lastname:   '',
    lastname2:  '',
    phone:      '',
    phone2:     '',
    email:      '',
    stage:      'enproceso',
    stageName:  'CONSULTAS',
    health:     '',
    lastObs:    '',
    dates: [{
      date: '',
      time: '',
      confirmed: false,
      triage: {
        weight: 0,
        height: 0,
        sistolic: 0,
        diastolic: 0,
        temp: 0
      }
    }]
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
  save() {
    this.loading = true;
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


  }
 
  cancel() {
    this.modal.dismiss();
  }
}
