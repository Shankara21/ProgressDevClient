import { CreateProjectComponent } from './pages/manage/project/create-project/create-project.component';
import { EditProjectComponent } from './pages/manage/project/edit-project/edit-project.component';
import { IndexProjectComponent } from './pages/manage/project/index-project/index-project.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
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
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'projects/pjd', component: IndexProjectComponent },
  { path: 'projects/psd', component: IndexProjectComponent },
  { path: 'projects/rmd', component: IndexProjectComponent },
  { path: 'projects/pmd', component: IndexProjectComponent },
  { path: 'projectShow/:id', component: EditProjectComponent },
  { path: 'projectCreate', component: CreateProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
