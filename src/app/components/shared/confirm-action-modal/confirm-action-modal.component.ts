import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-action-modal',
  templateUrl: './confirm-action-modal.component.html',
  styleUrls: ['./confirm-action-modal.component.scss']
})
export class ConfirmActionModalComponent implements OnInit {

  completed: boolean = false;
  loading: boolean = false;

  @Input() action: string = '_action_';
  @Input() actionEffect: string = '_actionEffect_';
  @Input() show: boolean = false;
  @Input() title: string = 'title';
  @Output() onResponse: EventEmitter<boolean> = new EventEmitter();
  @Output() onDismiss: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  confirm(resp: boolean) {
    if (!resp) {
      this.dismiss()
    }
    this.onResponse.emit(resp);
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.completed = true;
    }, 1000);
  }

  dismiss() {
    this.onDismiss.emit(false);
    this.completed = false;
    this.loading = false;
  }


}
