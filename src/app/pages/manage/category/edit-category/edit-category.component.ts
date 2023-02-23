import { Router } from '@angular/router';
import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor(public ControlService: ControlService, public router: Router) { }
  id = this.router.url.split('/')[2];
  category: any;
  code: any;
  name: any;
  form!: FormGroup;
  ngOnInit(): void {
    this.ControlService.getCategory(this.id).subscribe((data: any) => {
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
    this.ControlService.updateCategory(this.id, this.form.value).subscribe((data: any) => {
      this.router.navigate(['/categories']);
    });
  }
}
