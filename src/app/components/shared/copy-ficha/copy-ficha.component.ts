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
  selector: 'app-copy-ficha',
  templateUrl: './copy-ficha.component.html',
  styleUrls: ['./copy-ficha.component.scss']
})
export class CopyFichaComponent implements OnInit {

  public ficha: string = '';
  public PeopleID: string = '';
  public loading: boolean = true;

  constructor(
    private api: ApiService,
    public modal: NgbActiveModal,
    public dummy: DummyService,
    public rut: NgxRutService,
    public mask: MaskService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.api.getPeopleFicha(this.PeopleID).subscribe((data:any) => {
      this.ficha = data.text;
      this.loading = false;
    });
  }
 
  cancel() {
    this.modal.dismiss();
  }
}
