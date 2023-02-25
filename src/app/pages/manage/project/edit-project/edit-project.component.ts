import { Router } from '@angular/router';
import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  constructor(public ControlService: ControlService, private router: Router) { }
  // pagination
  p: number = 1;
  itemsPerPage: number = 10;
  totalProduct: any;

  // search
  term: any;

  paramsId = this.router.url.split('/')[2];

  // Default Array
  tempOnProgress: any;
  tempDone: any;

  // For Status 0
  projectsProgress: any;

  // For Status 1
  projectDone: any[] = [];

  form!: FormGroup;

  path: any;
  documentName: any;
  categoryId: any;

  // updateData
  document!: File;
  ngOnInit(): void {

    this.ControlService.getByStatus(0, this.paramsId).subscribe((data: any) => {
      this.tempOnProgress = data;
      this.projectsProgress = this.tempOnProgress.projectDone;
      console.log(this.projectsProgress);
    })
    this.ControlService.getByStatus(1, this.paramsId).subscribe((data: any) => {
      this.tempDone = data;
      this.projectDone = this.tempDone.projectDone;
      // console.log(this.tempDone);
    })
    this.form = new FormGroup({
      categoryId: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
      projectId: new FormControl('', [Validators.required]),
    })
  }
  onChange(event: any) {
    this.document = event.target.files[0];
    console.log(this.document);
  }
  getPath(params: any, name: any) {
    this.path = `http://localhost:3000/${params}`
    this.documentName = name;
  }
  submit() {
    // this.form.value.categoryId = this.categoryId;
    this.form.value.projectId = this.paramsId;
    // convert to number
    this.form.value.categoryId = Number(this.form.value.categoryId);
    this.form.value.projectId = Number(this.form.value.projectId);

    const formData = new FormData();
    formData.append('categoryId', this.form.value.categoryId);
    formData.append('projectId', this.form.value.projectId);
    formData.append('document', this.document, this.document.name);

    this.ControlService.updateProjectDetails(formData).subscribe((data: any) => {
      console.log(data);
      this.ControlService.getByStatus(0, this.paramsId).subscribe((data: any) => {
        this.tempOnProgress = data;
        this.projectsProgress = this.tempOnProgress.projectDone;
        console.log(this.projectsProgress);
      })
      this.ControlService.getByStatus(1, this.paramsId).subscribe((data: any) => {
        this.tempDone = data;
        this.projectDone = this.tempDone.projectDone;
        // console.log(this.tempDone);
      })
    })

  }
}
