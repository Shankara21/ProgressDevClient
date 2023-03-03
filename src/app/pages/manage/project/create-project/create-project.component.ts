import { Router } from '@angular/router';
import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  errorMsg: any;
  constructor(public ControlService: ControlService, private router: Router) { }
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
  ngOnInit(): void {
    this.ControlService.getCategories().subscribe((data: any) => {
      this.categories = data.map((item: any) => ({ ...item, checked: false }));
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
      this.errorMsg = 'Please enter project name';
    } else {
      this.ControlService.showSection(this.form.value.sectionId).subscribe((data: any) => {
        this.redirect = data.code;
        this.ControlService.createProjectDetails(this.form.value).subscribe((data: any) => {
          this.router.navigate([`projects/${this.redirect.toLowerCase()}`]);
        });
      })
    }
  }
}
