import { Component, Input, OnInit, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-unidad',
  templateUrl: './add-unidad.component.html',
  styleUrls: ['./add-unidad.component.scss']
})
export class AddUnidadComponent implements OnInit {

  @Input() edit: boolean = false;
  @Input() show: boolean = false;
  @Input() job = {
    _id: '',
    name: ''
  };
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  
  editable = false;
  addUnidadModal: boolean = false;
  faXmark = faXmark;
  units: any[] = [];


  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
  }
  

  addUnidad() {
    if (!this.edit) {
      this.api.addUnit({
        name: this.job.name
      }).subscribe(data => {
        console.log(data);
        this.addUnidadModal = !this.addUnidadModal;
        this.onClose.emit(false);
        this.job = {_id: '', name: ''};
      });
    }
    else{
      this.api.editUnit(this.job).subscribe(data => {
        console.log(data)
        this.addUnidadModal = !this.addUnidadModal
        this.onClose.emit(false);
        this.job = {_id: '', name: ''};
        this.editable = false;
      });
    }
  }
  
  getProfession(id: string){
    this.api.getUnit(id).subscribe(data => {
      console.log(data);
      this.job = data;
    })
  }

  ngOnChanges(changes: SimpleChanges) {   
    this.editable = true;// changes['edit'].currentValue;
  }

  close() {
    this.editable = false;
    this.job = {_id: '', name: ''};
    this.onClose.emit(false);
  }
 

}
