import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { IndexCategoryComponent } from './pages/manage/category/index-category/index-category.component';
import { EditCategoryComponent } from './pages/manage/category/edit-category/edit-category.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { CreateCategoryComponent } from './pages/manage/category/create-category/create-category.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { IndexProjectComponent } from './pages/manage/project/index-project/index-project.component';
import { CreateProjectComponent } from './pages/manage/project/create-project/create-project.component';
import { EditProjectComponent } from './pages/manage/project/edit-project/edit-project.component';
import { NgApexchartsModule } from 'ng-apexcharts';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    FooterComponent,
    IndexCategoryComponent,
    EditCategoryComponent,
    CreateCategoryComponent,
    LoginComponent,
    RegisterComponent,
    IndexProjectComponent,
    CreateProjectComponent,
    EditProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxExtendedPdfViewerModule,
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
