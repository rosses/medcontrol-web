import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-radio-btn',
  templateUrl: './radio-btn.component.html',
  styleUrls: ['./radio-btn.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioBtnComponent,
      multi: true
    }
  ]
})
export class RadioBtnComponent implements OnInit, ControlValueAccessor {
  
  @Input() name: string = '';
  @Input() radioChecked: any;
  @Input() value: boolean = true;

  faCircle = faCircle;
  faCircleDot = faCircleDot;
  
  private onChangefn!: Function;

  constructor() { }
  writeValue(value: any): void {
  }
  registerOnChange(fn: any): void {
    this.onChangefn = fn;
  }
  registerOnTouched(value: any): void {
  }

  ngOnInit(): void {
  }

  toggleState(radioCmp: HTMLInputElement) {
    radioCmp.checked = true;
    const skippable = radioCmp.value === 'true' ? false : true;
    this.onChangefn(skippable);
  }

}
