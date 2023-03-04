import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private url = 'http://localhost:3000/';
  constructor(private HttpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public id: any;
  public username: any;
  public fullname: any;
  public email: any;
  public userLevel: any;

  public path: any;

  public data: any;
  //////////////////////
  //?/ Http Methods ///
  ////////////////////

  // Categories
  getCategories() {
    return this.HttpClient.get(this.url + 'categories')
      .pipe(catchError(this.errorHttpHandler))
  }
  getCategory(id: any) {
    return this.HttpClient.get(this.url + 'categories/' + id)
      .pipe(catchError(this.errorHttpHandler))
  }
  createCategory(params: any) {
    return this.HttpClient.post(this.url + `categories`, params)
      .pipe(catchError(this.errorHttpHandler))
  }
  updateCategory(id: any, params: any) {
    return this.HttpClient.put(this.url + `categories/${id}`, params)
      .pipe(catchError(this.errorHttpHandler))
  }
  deleteCategory(id: any) {
    return this.HttpClient.delete(this.url + `categories/${id}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  showCategory(id: any) {
    return this.HttpClient.get(this.url + `categories/${id}`)
      .pipe(catchError(this.errorHttpHandler))
  }

  // Projects
  getAllProjects() {
    return this.HttpClient.get(this.url + 'projects/index')
      .pipe(catchError(this.errorHttpHandler))
  }
  getProjects(params: any) {
    return this.HttpClient.get(this.url + 'projects/filter/' + params)
      .pipe(catchError(this.errorHttpHandler))
  }
  showProject(params: any) {
    return this.HttpClient.get(this.url + `projects/find/${params}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  createObstacle(params: any) {
    return this.HttpClient.post(this.url + `projects/createObstacle`, params)
      .pipe(catchError(this.errorHttpHandler))
  }
  deleteProject(params: any) {
    return this.HttpClient.delete(this.url + `projectdetails/${params}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  filterByYear(year: any, section: any) {
    return this.HttpClient.get(this.url + `projects/year/${year}/${section}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  filterALLChartYear(year: any) {
    return this.HttpClient.get(this.url + `projects/filterAllByYear/${year}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  filterChartBySection(section: any, year: any) {
    return this.HttpClient.get(this.url + `projects/filterBySection/${year}/${section}`)
      .pipe(catchError(this.errorHttpHandler))
  }

  // ProjectsDetails
  createProjectDetails(params: any) {
    return this.HttpClient.post(this.url + `projectdetails`, params)
      .pipe(catchError(this.errorHttpHandler))
  }
  getByStatus(status: any, projectId: any) {
    return this.HttpClient.get(this.url + `projectdetails/status/${status}/${projectId}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  updateProjectDetails(params: any) {
    return this.HttpClient.put(this.url + `projectdetails`, params)
      .pipe(catchError(this.errorHttpHandler))
  }

  // Auth
  login(params: any) {
    return this.HttpClient.post(this.url + 'users/login', params)
  }
  register(params: any) {
    return this.HttpClient.post(this.url + 'users/register', params)
  }
  logout(params: any) {
    return this.HttpClient.delete(this.url + `users/logout/${params}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  refreshToken(params: any) {
    return this.HttpClient.post(this.url + `users/refreshToken`, params)
      .pipe(catchError(this.errorHttpHandler))
  }

  // User
  getUser() {
    return this.HttpClient.get(this.url + 'users')
      .pipe(catchError(this.errorHttpHandler))
  }
  findUser(id: any) {
    return this.HttpClient.get(this.url + `users/${id}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  deleteUser(id: any) {
    return this.HttpClient.delete(this.url + `users/${id}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  updateUser(id: any, params: any) {
    return this.HttpClient.put(this.url + `users/${id}`, params)
      .pipe(catchError(this.errorHttpHandler))
  }

  // Section
  getSections() {
    return this.HttpClient.get(this.url + 'sections')
      .pipe(catchError(this.errorHttpHandler))
  }
  showSection(id: any) {
    return this.HttpClient.get(this.url + `sections/${id}`)
      .pipe(catchError(this.errorHttpHandler))
  }

  // SectionCategory
  getSectionCategories(params: any) {
    return this.HttpClient.get(this.url + `sectioncategories/${params}`)
      .pipe(catchError(this.errorHttpHandler))
  }

  //////////////////////
  //!/ Http Methods ///
  ////////////////////

  // Error handling
  errorHttpHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error ${error.error.message}`
    }
    else {
      errorMessage = `Error code : ${error.status}\n${error.message}`
    }
    return throwError(errorMessage)
  }
}
