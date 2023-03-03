import { ControlService } from 'src/app/Services/control.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private ControlService: ControlService, private cookieService: CookieService) { }
  form!: FormGroup
  errorMsg: any;
  ngOnInit(): void {
    if (this.cookieService.get('progressDevToken')) {
      this.router.navigate(['/dashboard']);
    }
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  submit() {
    this.ControlService.login(this.form.value).subscribe((res: any) => {
      this.cookieService.set('progressDevToken', res.token, 4 / 24 );
      this.router.navigate(['/dashboard']);
    }, (err: any) => {
      this.errorMsg = err.error.message;
    });
  }
}
