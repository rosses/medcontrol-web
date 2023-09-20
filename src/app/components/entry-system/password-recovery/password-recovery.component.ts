import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  loading: boolean = false;

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  recoverPassword() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/login']);
    }, 2000);
  }

}
