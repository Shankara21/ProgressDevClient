import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  host: { class: 'flex justify-center' },
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document, public ControlService: ControlService, private cookieService: CookieService, private router: Router) { }
  dateNow = new Date();
  token: any;

  // Auth
  username: any;
  fullname: any;
  email: any;
  userLevel: any;
  refreshToken: any;
  decoded: any;
  id: any;

  showMenu = false
  ngOnInit(): void {
    setInterval(() => {
      this.dateNow = new Date();
    }, 1000);
    this.token = this.cookieService.get('progressDevToken');


    if (!this.cookieService.get('progressDevToken')) {
      this.router.navigate(['/login']);
    }
    this.refreshToken = new FormGroup({
      refreshToken: new FormControl(this.token)
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

    // console.log(this.ControlService.username);


  }
  logout() {
    this.ControlService.logout(this.token).subscribe((res: any) => {
      this.cookieService.delete('progressDevToken');
      this.router.navigate(['/login']);
    })
  }
}
