import { Component, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  edit: boolean = false;
  addProfessionModal: boolean = false;
  actionProfessionModal: boolean = false;

  action: string = '';
  
  jobs = [{
    name: '',
    skippable: false,
    _id: ''
  }];
  
  selJob = {
    name: '',
    skippable: false,
    id: ''
  };
  
  selJobs: string[] = [];
  selId: string = '';
  
  form = {};

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getJobs().subscribe(data => {
      this.jobs = data;
    })
  }

  addProfession() {
    this.edit = false;
    this.addProfessionModal = true;
  }
  
  editProfession(id: string){
    this.edit = true;
    this.addProfessionModal = true;
    this.api.getJob(id).subscribe(data => {
      this.selJob = data
    })
  }

  deleteProfession( id: string ) {
    this.actionProfessionModal = true;
    this.action = 'eliminar';
    this.selId = id;
  }
  
  pausarProfesion(  ){
    this.actionProfessionModal = true;
    this.action = 'pausar';
    
    //TODO: pausar profesiones
  }

  getProfessions($event: any){
    this.addProfessionModal = $event;
    this.api.getJobs().subscribe(data => {
      this.jobs = data;
    });
  }
  
  onDismissActionModal(){
    this.actionProfessionModal = false;
    this.api.getJobs().subscribe(data => {
      this.jobs = data;
    });
  }
}
