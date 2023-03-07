import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  // auth
  decoded: any;
  refreshToken: any;
  id: any

  constructor(public ControlService: ControlService, public router: Router, private cookieService: CookieService) { }
  params = this.router.url.split('/')[2];
  category: any;
  code: any;
  name: any;
  form!: FormGroup;
  ngOnInit(): void {
    const token = this.cookieService.get('progressDevToken');

    if (!this.cookieService.get('progressDevToken')) {
      this.router.navigate(['/login']);
    }

    this.refreshToken = new FormGroup({
      refreshToken: new FormControl(token)
    })

    this.ControlService.refreshToken(this.refreshToken.value).subscribe((res: any) => {
      this.decoded = jwt_decode(res.accessToken);
      this.ControlService.username = this.decoded.username;
      this.ControlService.email = this.decoded.email;
      this.ControlService.fullname = this.decoded.fullname;
      this.ControlService.userLevel = this.decoded.userLevel;
      this.ControlService.id = this.decoded.id;
      this.id = this.decoded.id;
      this.ControlService.data = {
        username: this.decoded.username,
        email: this.decoded.email,
        fullname: this.decoded.fullname,
        userLevel: this.decoded.userLevel
      }
    });

    this.ControlService.getCategory(this.params).subscribe((data: any) => {
      this.category = data;
      this.code = this.category.code;
      this.name = this.category.name;
    });
    this.form = new FormGroup({
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required])
    });
  }
  submit() {
    this.ControlService.updateCategory(this.params, this.form.value).subscribe((data: any) => {
      this.router.navigate(['/categories']);
    });
  }
}
