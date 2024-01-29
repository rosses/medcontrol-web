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
  selector: 'app-whatsapp-share',
  templateUrl: './whatsapp-share.component.html',
  styleUrls: ['./whatsapp-share.component.scss']
})
export class WhatsAppShareComponent implements OnInit {

  public Text: string = '';
  public PhoneNumber: string = '';

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
  async enviar() {
    window.open('https://api.whatsapp.com/send/?phone=56'+this.PhoneNumber+'&text='+encodeURI(this.Text)+'&type=phone_number&app_absent=0','_blank');
    this.cancel();
  }
 
  cancel() {
    this.modal.dismiss();
  }
}
