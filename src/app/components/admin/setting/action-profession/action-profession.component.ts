import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-action-profession',
  templateUrl: './action-profession.component.html',
  styleUrls: ['./action-profession.component.scss']
})
export class ActionProfessionComponent implements OnInit {

  @Input() show: boolean = false;
  @Input() action: string = 'mirar';
  @Input() jobs: string[] = [];
  @Input() selJob: string = '';

  @Output() onDismiss: EventEmitter<any> = new EventEmitter();

  completed: boolean = false;
  loading: boolean = false;

  actionMap = {
    'activar': 'activar',
    'pausar': 'pausar',
    'eliminar': 'eliminar'
  }
  actionResp = {
    'activar': 'activada',
    'pausar': 'pausada',
    'eliminar': 'eliminada'
  }

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  dismissAction() {
    this.onDismiss.emit();
    this.completed = false;
    this.loading = false;
  }

  triggerAction(action: string) {
    if(action === 'eliminar'){
      this.api.deleteJob(this.selJob).subscribe(data => {
        console.log(data);
      })
    }
    
    this.loading = true;
    setTimeout(() => {
      this.completed = true;
      this.loading = false;
      this.onDismiss.emit();
    }, 1000);
  }

}
