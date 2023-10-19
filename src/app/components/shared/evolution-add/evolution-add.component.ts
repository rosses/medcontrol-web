import { Component, Input, OnInit, Output, EventEmitter, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxRutService } from '@numetalsour/ngx-rut';
import { ApiService } from 'src/app/api.service';
import { DummyService } from 'src/app/dummy.service';
import { MaskService } from 'src/app/mask.service';

@Component({
  selector: 'app-evolution-add',
  templateUrl: './evolution-add.component.html',
  styleUrls: ['./evolution-add.component.scss']
})
export class EvolutionAddComponent implements OnInit {

  public data: any = {
    Description:  '',
    DateAs:       new Date().toISOString().substring(0,10),
    PeopleID:  ''
  };
  public loading: boolean = false;
  public faSpinner = faSpinner; 

  constructor(
    private api: ApiService,
    public modal: NgbActiveModal,
    public dummy: DummyService,
    public rut: NgxRutService,
    public mask: MaskService
  ) {   
  }

  ngOnInit(): void {
  } 

  save() {
    this.loading = true;
    this.api.addEvolution(this.data).subscribe((data:any) => {
      this.api.toastOk("Agregado correctamente");
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
