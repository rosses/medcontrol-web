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
 
  }
}
