import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pin-code',
  templateUrl: './pin-code.component.html',
  styleUrls: ['./pin-code.component.scss']
})
export class PinCodeComponent implements OnInit {

  @Input() code: number | string = 1234;

  public get cod() : string[] {
    let output = [],
    sNumber = typeof this.code == 'number' ? this.code.toString() : this.code;
    for (var i = 0, len = sNumber.length; i < len; i += 1) {
        output.push(sNumber.charAt(i));
    }
    return output;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
