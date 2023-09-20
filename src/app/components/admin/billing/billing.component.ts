import { Component, OnInit } from '@angular/core';
import { faAngleUp, faAngleDown, faCircleDot, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  showModalBill: boolean = false;

  faXmark = faXmark;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faCircle = faCircle;
  faCircleDot = faCircleDot;

  adminList: any[] = [
    { open: false },
    { open: false }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  toggleBillModal() {
    this.showModalBill = !this.showModalBill;
  }

}
