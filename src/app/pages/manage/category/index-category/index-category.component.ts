import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-index-category',
  templateUrl: './index-category.component.html',
  styleUrls: ['./index-category.component.css']
})
export class IndexCategoryComponent {
  constructor(public ControlService: ControlService, private router: Router, private cookieService: CookieService) { }

  // auth
  decoded: any;
  refreshToken: any;
  id: any

  isShow: boolean = false;

  // pagination
  p: number = 1;
  itemsPerPage: number = 10;
  totalProduct: any;

  // search
  term: any;

  // params
  params = this.router.url.split('/')[2];

  categories: any[] = [];
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

    this.ControlService.getSectionCategories(this.params).subscribe((data: any) => {
      data.sectionCategories.forEach((element: any) => {
        this.categories.push(element.Category);
      })
      this.categories = this.categories.map((item: any) => ({ ...item, index: this.categories.indexOf(item) }));

    })
  }
  delete(id: any) {
    this.ControlService.deleteCategory(id).subscribe((data: any) => {
      this.ControlService.getCategories().subscribe((data: any) => {
        this.categories = data;
      })
    })
  }
}
