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

  constructor(public ControlService: ControlService, private router: Router) { }
  categories: any[] = [];
  form!: FormGroup;
  selectedValues: any[] = [];
  ngOnInit(): void {
    this.ControlService.getCategories().subscribe((data: any) => {
      this.categories = data.map((item: any) => ({ ...item, checked: false }));

    });
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    })
  }
  updateSelectedValues() {
    this.selectedValues = this.categories.filter(item => item.checked).map(item => item.code);
  }
  submit() {
    this.form.value.category = this.selectedValues;
    this.ControlService.createProjectDetails(this.form.value).subscribe((data: any) => {
      this.router.navigate(['/projects']);
    });
  }
}
