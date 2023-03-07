import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  constructor(public ControlService: ControlService, private router: Router, private cookieService: CookieService) { }
  // auth
  decoded: any;
  refreshToken: any;
  id: any


  errorMsg: any;
  categories: any[] = [];
  form!: FormGroup;
  selectedValues: any[] = [];
  tempSelectedValues: any[] = [];
  sections: any[] = []
  redirect: any;
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  getSectionName: any;
  tempCategories: any[] = [];

  error = false;
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


    this.ControlService.getSections().subscribe((data: any) => {
      this.sections = data;
    })
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      sectionId: new FormControl('', [Validators.required]),
      targetTime: new FormControl('', [Validators.required]),
    })
  }
  updateSelectedValues() {
    this.selectedValues = this.categories.filter(item => item.checked).map(item => item.code);
  }
  submit() {
    this.form.value.category = this.selectedValues;

    if (this.form.value.name == '') {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 3000);
      this.errorMsg = 'Please enter project name';
    } else if (this.form.value.targetTime == '') {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 3000);
      this.errorMsg = 'Please select target time';
    } else if (this.form.value.sectionId == '') {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 3000);
      this.errorMsg = 'Please select section';
    } else {
      this.ControlService.showSection(this.form.value.sectionId).subscribe((data: any) => {
        this.redirect = data.code;
        this.ControlService.createProjectDetails(this.form.value).subscribe((data: any) => {
          this.router.navigate([`projects/${this.redirect.toLowerCase()}`]);
        });
      })
    }
  }
  getSection() {
    this.categories = [];
    this.ControlService.showSection(this.form.value.sectionId).subscribe((data: any) => {
      this.getSectionName = data.code;
      this.ControlService.getSectionCategories(this.getSectionName).subscribe((data: any) => {
        data.sectionCategories.forEach((element: any) => {
          this.categories.push(element.Category);
        })
        this.categories = this.categories.map((item: any) => ({ ...item, checked: false }));
        console.log(this.categories);
      })
    })
  }
}
