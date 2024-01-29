import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  hide: boolean = true;
  public userData: any = {
    email: '',
    password: ''
  };

  constructor(private router: Router, public api: ApiService) { }

  ngOnInit(): void { 
  }

  login() {
    this.loading = true; 

 
    this.api.login(this.userData).subscribe(async (data:any) => { 
      await this.api.setProfile(data.user);
      await this.api.setToken(data.access_token);
      this.router.navigateByUrl('/admin/people');
      this.loading = false;
    }, (err:any) => {
      console.log(err);
      this.api.toastError(err.error.message);
      this.loading = false;
    });
  }

  enterBtn(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login()
    }
  }
}
