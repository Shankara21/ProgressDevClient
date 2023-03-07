import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ControlService } from 'src/app/Services/control.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-index-project',
  templateUrl: './index-project.component.html',
  styleUrls: ['./index-project.component.css']
})
export class IndexProjectComponent {
  constructor(private ControlService: ControlService, private router: Router, private cookieService: CookieService) { }
  // auth
  decoded: any;
  refreshToken: any;
  id: any

  // pagination
  p: number = 1;
  itemsPerPage: number = 10;
  totalProduct: any;

  success = false;

  // search
  term: any;

  // params
  params = this.router.url.split('/')[2];

  // Project
  projects: any[] = [];
  sectionFound: any;

  years: any[] = [];

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
    // history location sebelum sekarang

    // menampilkan route sekarang
    this.ControlService.getProjects(this.params).subscribe((data: any) => {
      this.projects = data.projects;
      this.sectionFound = data.sectionFound;
    })
    const startYear = 2023
    // years bersifat dinamis dari tahun sekarang dan 5 tahun selanjutnya
    for (let i = startYear; i < new Date().getFullYear() + 6; i++) {
      this.years.push(i)
    }
    this.form = new FormGroup({
      year: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
    })
  }
  delete(id: any) {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 3000);
    this.ControlService.deleteProject(id).subscribe((data: any) => {
      this.ControlService.getProjects(this.params).subscribe((data: any) => {
        this.projects = data.projects;
        this.sectionFound = data.sectionFound;
      })
    })
  }
  filterYear() {
    this.form.value.code = this.params;
    this.form.value.year = Number(this.form.value.year);
    console.log(this.form.value);

    this.ControlService.filterByYear(this.form.value.year, this.form.value.code).subscribe((data: any) => {
      console.log('hasil');
      console.log(data);
      this.projects = data.projects;
      this.sectionFound = data.sectionFound;
    })
  }
}
