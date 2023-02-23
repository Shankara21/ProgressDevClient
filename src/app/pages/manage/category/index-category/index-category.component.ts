import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-category',
  templateUrl: './index-category.component.html',
  styleUrls: ['./index-category.component.css']
})
export class IndexCategoryComponent {
  constructor(public ControlService: ControlService) { }

  isShow: boolean = false;

  // pagination
  p: number = 1;
  itemsPerPage: number = 10;
  totalProduct: any;

  // search
  term: any;


  categories:any[] = [];
  ngOnInit(): void {
    this.ControlService.getCategories().subscribe((data: any) => { 
      this.categories = data;
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
