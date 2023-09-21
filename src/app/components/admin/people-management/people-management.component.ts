import { Component, OnInit } from '@angular/core';
import { faAngleUp, faAngleDown, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api.service';
import { DummyService } from 'src/app/dummy.service';
import { PeopleNewComponent } from '../../shared/people-new/people-new.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-people-management',
  templateUrl: './people-management.component.html',
  styleUrls: ['./people-management.component.scss']
})
export class PeopleManagementComponent implements OnInit {

  public me: any = {};
  public loading: boolean = false;
  public active:number = 1;

  constructor(
    public api: ApiService,
    public modal: NgbModal, 
    private ar: ActivatedRoute,
    public dummy: DummyService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      let cc = this.ar.snapshot.paramMap.get('cardcode');
      let f = this.dummy.people.map((e:any) => { return e.cardcode}).indexOf(cc);
      if (f>-1) {
        this.me = this.dummy.people[f];
        this.loading = false;
      }
    },1500); 
  }

  filterbox() {

  }
  addPeople() {
    const mdl = this.modal.open(PeopleNewComponent, {
      backdrop: false,
      keyboard: true,
      size: 'lg'
    });
    mdl.result.then((data) => {
      console.log('then.data: ', data);
    },(err) => { console.log('dismiss:',err); });
  } 

}
