import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox-cmp',
  templateUrl: './checkbox-cmp.component.html',
  styleUrls: ['./checkbox-cmp.component.scss']
})
export class CheckboxCmpComponent implements OnInit {

  @Input() checked: boolean = false;
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleField() {
    this.checked = !this.checked;
    this.toggle.emit(this.checked);
  }

}
