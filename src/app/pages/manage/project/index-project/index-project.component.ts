import { ControlService } from 'src/app/Services/control.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-index-project',
  templateUrl: './index-project.component.html',
  styleUrls: ['./index-project.component.css']
})
export class IndexProjectComponent {
  constructor(private ControlService: ControlService) { }
  // pagination
  p: number = 1;
  itemsPerPage: number = 10;
  totalProduct: any;

  // search
  term: any;


  projects: any[] = [];
  ngOnInit(): void {
    this.ControlService.getProjects().subscribe((data: any) => {
      this.projects = data;
    })
  }
  delete(id: any) {
    this.ControlService.deleteCategory(id).subscribe((data: any) => {
      this.ControlService.getCategories().subscribe((data: any) => {
        this.projects = data;
      })
    })
  }
}
