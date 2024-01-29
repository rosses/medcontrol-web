import { Component, Input, OnInit, Output, EventEmitter, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxRutService } from '@numetalsour/ngx-rut';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { DummyService } from 'src/app/dummy.service';
import { MaskService } from 'src/app/mask.service';

@Component({
  selector: 'app-add-medical-express',
  templateUrl: './add-medical-express.component.html',
  styleUrls: ['./add-medical-express.component.scss']
})
export class AddMedicalExpressComponent implements OnInit {

  public master: string = '';
  public mode: string = 'add';
  public data: any = {
    Name: '',
    LabID: 1
  };
  public rows: any = [];
  public loading: boolean = false;
  public faSpinner = faSpinner;

  constructor(
    private api: ApiService,
    public modal: NgbActiveModal,
    public dummy: DummyService
  ) { }

  ngOnInit(): void {
    this.loadlab();
  }
  async loadlab() { 
    this.rows = await lastValueFrom(this.api.getLabs());      
  }
  ngAfterViewInit() {

  }

  async save() {
    this.loading = true;
    try {
      const setup = await lastValueFrom(this.api.addMedicine(this.data));      
      this.api.toastOk("Realizado con éxito");
      this.modal.close(setup);
      this.loading = false;
    } catch (err:any) {
      this.loading = false;
      this.api.toastError(err.error.message);  
    }
 
  }
  cancel() {
    this.modal.dismiss();
  }
}
