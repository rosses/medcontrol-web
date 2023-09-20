import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-cmp',
  templateUrl: './modal-cmp.component.html',
  styleUrls: ['./modal-cmp.component.scss']
})
export class ModalCmpComponent implements OnInit {

  @Input() toggle: boolean = true;
  @Input() title: string = '';
  @Input() close: boolean = false;

  @Output() changeShow = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.changeShow.emit(false)
  }

}
