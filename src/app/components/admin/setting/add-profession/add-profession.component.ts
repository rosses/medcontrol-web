import { Component, Input, OnInit, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-profession',
  templateUrl: './add-profession.component.html',
  styleUrls: ['./add-profession.component.scss']
})
export class AddProfessionComponent implements OnInit {

  @Input() edit: boolean = false;
  @Input() show: boolean = false;
  @Input() job = {
    name: '',
    skippable: false,
    requireVacunas: true,
    units: []
  };
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  
  editable = false;
  addProfessionModal: boolean = false;
  faXmark = faXmark;
  units: any[] = [];


  constructor(private api: ApiService) {
    this.api.getUnits().subscribe((data:any) => {
      let ut = data;
      ut.sort((a:any, b:any) => (a.name < b.name ? -1 : 1));
      this.units = ut;
    })
  }

  ngOnInit(): void {
  }
  

  addProfession() {
    if (!this.edit) {
      this.api.addJob(this.job).subscribe(data => {
        console.log(data);
        this.addProfessionModal = !this.addProfessionModal;
        this.onClose.emit(false);
        this.job = {name: '', skippable: false, requireVacunas: true, units: []};
      });
    }
    else{
      this.api.editJob(this.job).subscribe(data => {
        console.log(data)
        this.addProfessionModal = !this.addProfessionModal
        this.onClose.emit(false);
        this.job = {name: '', skippable: false, requireVacunas: true, units: []};
        this.editable = false;
      });
    }
  }
  
  getProfession(id: string){
    this.api.getJob(id).subscribe(data => {
      console.log(data);
      this.job = data;
    })
  }

  ngOnChanges(changes: SimpleChanges) {   
    this.editable = true;// changes['edit'].currentValue;
    // refresh
    this.api.getUnits().subscribe((data:any) => {
      let ut = data;
      ut.sort((a:any, b:any) => (a.name < b.name ? -1 : 1));
      this.units = ut;
    })
  }

  close() {
    this.editable = false;
    this.job = {name: '', skippable: false, requireVacunas: true, units: []};
    this.onClose.emit(false);
  }

  changeUnitOfProfession(unit:any) {
    let spp = this.job.units.indexOf(unit as never);
    if (spp == -1) {
      this.job.units.push(unit as never);
    }
    else{
      this.job.units.splice(spp,1);
    }
  }
  meIschecked(unit:any) {
    for (let i = 0; i < this.job.units.length; i++) {
      let m:any = this.job.units[i];
      if (m._id == unit._id) {
        return true;
      }
    }
  }

}
