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
  selector: 'app-masterdata-editor',
  templateUrl: './masterdata-editor.component.html',
  styleUrls: ['./masterdata-editor.component.scss']
})
export class MasterdataEditorComponent implements OnInit {

  public master: string = '';
  public mode: string = 'add';
  public data: any = {};
  public rows: any = {};
  public loading: boolean = false;
  public faSpinner = faSpinner;

  constructor(
    private api: ApiService,
    public modal: NgbActiveModal,
    public dummy: DummyService
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {

  }

  async save() {
    this.loading = true;
    try {

      if (this.master == 'Lab' && this.mode == 'add') {
        const setup = await lastValueFrom(this.api.addLab(this.data));
      }
      if (this.master == 'Medicine' && this.mode == 'add') {
        const setup = await lastValueFrom(this.api.addMedicine(this.data));
      }
      if (this.master == 'ExamType' && this.mode == 'add') {
        const setup = await lastValueFrom(this.api.addExamType(this.data));
      }
      if (this.master == 'Exam' && this.mode == 'add') {
        const setup = await lastValueFrom(this.api.addExam(this.data));
      }
      if (this.master == 'Specialist' && this.mode == 'add') {
        const setup = await lastValueFrom(this.api.addSpecialist(this.data));
      }
      if (this.master == 'Diagnosis' && this.mode == 'add') {
        const setup = await lastValueFrom(this.api.addDiagnosis(this.data));
      }
      if (this.master == 'Surgery' && this.mode == 'add') {
        const setup = await lastValueFrom(this.api.addSurgery(this.data));
      }
      if (this.master == 'CertificateType' && this.mode == 'add') {
        const setup = await lastValueFrom(this.api.addCertificateType(this.data));
      }
      if (this.master == 'Health' && this.mode == 'add') {
        const setup = await lastValueFrom(this.api.addHealth(this.data));
      }
      if (this.master == 'ExamData' && this.mode == 'add') {
        const setup = await lastValueFrom(this.api.addExamData(this.data));
      }      

      if (this.master == 'Lab' && this.mode == 'edit') {
        const setup = await lastValueFrom(this.api.editLab(this.data));
      }
      if (this.master == 'Medicine' && this.mode == 'edit') {
        const setup = await lastValueFrom(this.api.editMedicine(this.data));
      }
      if (this.master == 'ExamType' && this.mode == 'edit') {
        const setup = await lastValueFrom(this.api.editExamType(this.data));
      }
      if (this.master == 'Exam' && this.mode == 'edit') {
        const setup = await lastValueFrom(this.api.editExam(this.data));
      }
      if (this.master == 'Specialist' && this.mode == 'edit') {
        const setup = await lastValueFrom(this.api.editSpecialist(this.data));
      }
      if (this.master == 'Diagnosis' && this.mode == 'edit') {
        const setup = await lastValueFrom(this.api.editDiagnosis(this.data));
      }
      if (this.master == 'Surgery' && this.mode == 'edit') {
        const setup = await lastValueFrom(this.api.editSurgery(this.data));
      }
      if (this.master == 'CertificateType' && this.mode == 'edit') {
        const setup = await lastValueFrom(this.api.editCertificateType(this.data));
      }
      if (this.master == 'Health' && this.mode == 'edit') {
        const setup = await lastValueFrom(this.api.editHealth(this.data));
      }
      if (this.master == 'ExamData' && this.mode == 'edit') {
        const setup = await lastValueFrom(this.api.editExamData(this.data));
      }
      
      this.api.toastOk("Realizado con éxito");
      this.modal.close({
        success: true
      });
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
