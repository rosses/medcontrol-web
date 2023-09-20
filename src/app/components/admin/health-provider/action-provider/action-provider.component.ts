import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-action-provider',
  templateUrl: './action-provider.component.html',
  styleUrls: ['./action-provider.component.scss']
})
export class ActionProviderComponent implements OnInit {

  @Input() show: boolean = false;
  @Input() action: string = '';
  @Input() items: string[] = [];

  @Output() onDismiss: EventEmitter<any> = new EventEmitter();

  completed: boolean = false;
  loading: boolean = false;

  actionMap = {
    'activar': 'activar',
    'pausar': 'pausar',
    'eliminar': 'eliminar'
  }
  actionResp = {
    'activar': 'activado',
    'pausar': 'pausado',
    'eliminar': 'eliminado'
  }

  constructor(public api: ApiService) { }

  ngOnInit(): void {
  }

  dismissAction() {
    this.onDismiss.emit();
    this.completed = false;
    this.loading = false;
  }

  triggerAction(action: string) {
    switch (action) {
      case 'eliminar':
        this.items.forEach(item => {
          this.api.removeCustomer(item).subscribe(data => console.log(data));
        });
      break;
    
      default:
        console.log(action)
      break;
    }
    this.loading = true;
    setTimeout(() => {
      this.completed = true;
      this.loading = false;
    }, 1000);
  }

}
