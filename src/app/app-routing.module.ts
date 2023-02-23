import { CreateCategoryComponent } from './pages/manage/category/create-category/create-category.component';
import { EditCategoryComponent } from './pages/manage/category/edit-category/edit-category.component';
import { IndexCategoryComponent } from './pages/manage/category/index-category/index-category.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'categories', component: IndexCategoryComponent },
  { path: 'categories/:id', component: EditCategoryComponent },
  { path: 'createCategories', component: CreateCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
