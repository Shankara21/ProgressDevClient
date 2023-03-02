import { Router } from '@angular/router';
import { ControlService } from 'src/app/Services/control.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-index-project',
  templateUrl: './index-project.component.html',
  styleUrls: ['./index-project.component.css']
})
export class IndexProjectComponent {
  constructor(private ControlService: ControlService, private router: Router) { }
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
  ngOnInit(): void {
    // menampilkan route sekarang
    this.ControlService.getProjects(this.params).subscribe((data: any) => {
      this.projects = data.projects;
      this.sectionFound = data.sectionFound;
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
}
