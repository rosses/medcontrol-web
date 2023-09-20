import { Component, OnInit } from '@angular/core';
import { faXmark, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-superintendencia',
  templateUrl: './superintendencia.component.html',
  styleUrls: ['./superintendencia.component.scss']
})
export class SuperintendenciaComponent implements OnInit {
  
  loading: boolean = true;
  peoples: any = [];
  auxPeoples: any = [];
  jobs: any = [];
  search: string = '';
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loading = true;
    this.api.getJobs().subscribe((data:any) => {
      this.jobs = data;
      this.api.getUsers({isValidAppUser:true}).subscribe(data => {
        this.peoples = data;
        this.auxPeoples = data;
        this.loading = false;
      });
    });
  }
  
  filterbox() {
    if (this.search.trim() == '') {
      this.peoples = JSON.parse(JSON.stringify(this.auxPeoples));
    }
    else {
      let x = [];
      let s = this.search.toLowerCase().trim();
      for (let i = 0; i < this.auxPeoples.length; i++) {
        if (!this.auxPeoples[i].rut) { this.auxPeoples[i].rut=''; }
        if (!this.auxPeoples[i].name) { this.auxPeoples[i].name=''; }
        if (!this.auxPeoples[i].lastname) { this.auxPeoples[i].lastname=''; }
        if (!this.auxPeoples[i].lastname2) { this.auxPeoples[i].lastname2=''; }
        if (!this.auxPeoples[i].email) { this.auxPeoples[i].email=''; }
        if (!this.auxPeoples[i].phone) { this.auxPeoples[i].phone=''; } 

        if (this.auxPeoples[i].rut.toLowerCase().indexOf(s) > -1 || 
            this.auxPeoples[i].name.toLowerCase().indexOf(s) > -1 || 
            this.auxPeoples[i].lastname.toLowerCase().indexOf(s) > -1 || 
            this.auxPeoples[i].lastname2.toLowerCase().indexOf(s) > -1 || 
            this.auxPeoples[i].email.toLowerCase().indexOf(s) > -1 || 
            this.auxPeoples[i].phone.toLowerCase().indexOf(s) > -1) {
              x.push(this.auxPeoples[i]);
        }
      }
      this.peoples = x;
    }
  }

  getPro(id:string) {
    if (id) {
      try {
        return this.jobs.filter((x:any) => { return x._id == id; })[0].name;
      } catch (err) {
        console.error(err);
        return '';
      }
    } else { 
      return ''; 
    }
  }

  changeActivation(i:number) {
    this.api.setActivation(this.peoples[i]._id, this.peoples[i].registroValidado).subscribe((data:any) => {

    });
  }
  
}
