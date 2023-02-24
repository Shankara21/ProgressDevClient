import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CookieService } from "ngx-cookie-service";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // auth
  decoded: any;
  refreshToken: any;
  id: any
  constructor(private elementRef: ElementRef, public ControlService: ControlService, private router: Router, private cookieService: CookieService) { }
  ngOnInit(): void {
    const token = this.cookieService.get('progressDevToken');

    if (!this.cookieService.get('progressDevToken')) {
      this.router.navigate(['/login']);
    }

    this.refreshToken = new FormGroup({
      refreshToken: new FormControl(token)
    })

    // mengecek apakah ada yang login
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
  }
}
