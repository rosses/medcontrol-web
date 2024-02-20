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
  selector: 'app-imc',
  templateUrl: './imc.component.html',
  styleUrls: ['./imc.component.scss']
})
export class ImcComponent implements OnInit {

  public w: number = 0;
  public h: number = 0;
  public t: number = 0;

  public loading: boolean = false;
  public faSpinner = faSpinner;
  public cg: any = [
    0.6, 0.7, 0.8, 1
  ]
  constructor(
    private api: ApiService,
    public modal: NgbActiveModal,
    public dummy: DummyService,
    public rut: NgxRutService,
    public mask: MaskService
  ) { }

  ngOnInit(): void {
  }
  mr(n:number) {  
    return Math.round(n * 10) / 10;
  }
  async enviar() {
  
  }
  exceso() {
    return this.mr(this.w - this.mr((this.h*this.h/10000)*25));
  }
  cancel() {
    this.modal.dismiss();
  }
  porcentaje() {
    return this.mr((this.w - this.mr((this.h*this.h/10000)*25)) * 100 / this.w);
  }
  getIMC(w:number,h:number) {
    if (w != 0 && h != 0) {
      let m2 = (h/100) * (h/100);
      let calc = Math.round( (w / m2) * 100 ) / 100;
      return calc;
    }
    return 0;
  }
}
