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
  editUnidad: boolean = false;
  addProfessionModal: boolean = false;
  addUnidadModal: boolean = false;
  addEnterpriseModal: boolean = false;
  actionProfessionModal: boolean = false;
  actionEnterpriseModal: boolean = false;
  actionUnidadModal: boolean = false;

  action: string = '';
  loading: boolean = true;
  
  jobs = [{
    name: '',
    skippable: false,
    requireVacunas: true,
    _id: '',
    units: []
  }];
  
  selJob = {
    name: '',
    skippable: false,
    requireVacunas: true,
    id: '',
    units: []
  };
  
  selJobs: string[] = [];
  selId: string = '';

  selUnits: string[] = [];
  unids: any = [];
  selUnidad: any = {};
  
  form = {};

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loading = true;
    this.api.getJobs().subscribe(data => {
      this.jobs = data;
      this.api.getUnits().subscribe((data:any) => {
        let ut = data;
        ut.sort((a:any, b:any) => (a.name < b.name ? -1 : 1));
        this.unids = ut;
        this.loading = false;
      });
    });
  }

  addProfession() {
    this.edit = false;
    this.addProfessionModal = true;
  }
  addUnidad() {
    this.editUnidad = false;
    this.addUnidadModal = true;
  }
  
  editProfession(id: string){
    this.loading = true;
    this.api.getJob(id).subscribe(data => {
      this.edit = true;
      this.selJob = data;
      this.addProfessionModal = true;
      this.loading = false;
    })
  }

  deleteProfession( id: string ) {
    this.actionProfessionModal = true;
    this.action = 'eliminar';
    this.selId = id;
  }

  editUnit(id: string){
    this.loading = true;
    this.api.getUnit(id).subscribe(data => {
      this.editUnidad = true;
      this.selUnidad = data;
      this.addUnidadModal = true;
      this.loading = false;
    })
  }

  deleteUnit( id: string ) {
    this.api.confirmModal('Eliminar','¿Eliminar unidad y quitar relaciones existentes?').then((ok) => {
      if (ok.isConfirmed) {
        this.loading = true;
        this.api.deleteUnit(id).subscribe((data:any) => {
          this.loading = true;
          this.getUnidades(false);
        });
      }
    })
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
  getUnidades($event: any){
    this.addUnidadModal = $event;
    this.api.getUnits().subscribe((data:any) => {
      let ut = data;
      ut.sort((a:any, b:any) => (a.name < b.name ? -1 : 1));
      this.unids = ut;
      this.loading = false;
    });
  }
  onDismissActionModal(){
    this.actionProfessionModal = false;
    this.loading = true;
    this.api.getJobs().subscribe(data => {
      this.jobs = data;
      this.loading = false;
    });
  }
}
