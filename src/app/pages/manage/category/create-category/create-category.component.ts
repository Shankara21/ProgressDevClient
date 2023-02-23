import { Router } from '@angular/router';
import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  constructor(public ControlService: ControlService, public router: Router) { }
  form!: FormGroup;
  ngOnInit(): void {

    this.form = new FormGroup({
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required])
    });
  }
  submit() {
    this.ControlService.createCategory(this.form.value).subscribe((data: any) => {
      this.router.navigate(['/categories']);
    });
  }
}
