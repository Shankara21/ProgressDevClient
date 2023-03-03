import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-category',
  templateUrl: './index-category.component.html',
  styleUrls: ['./index-category.component.css']
})
export class IndexCategoryComponent {
  constructor(public ControlService: ControlService, private router:Router) { }

  isShow: boolean = false;

  // pagination
  p: number = 1;
  itemsPerPage: number = 10;
  totalProduct: any;

  // search
  term: any;

  // params
  params = this.router.url.split('/')[2];

  categories:any[] = [];
  ngOnInit(): void {
    console.log(this.params);

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
