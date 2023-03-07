import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private url = 'http://localhost:3000/';
  private production = 'http://192.168.9.47:3737/'
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
    return this.HttpClient.get(this.production + 'categories')
      .pipe(catchError(this.errorHttpHandler))
  }
  getCategory(id: any) {
    return this.HttpClient.get(this.production + 'categories/' + id)
      .pipe(catchError(this.errorHttpHandler))
  }
  createCategory(params: any) {
    return this.HttpClient.post(this.production + `categories`, params)
      .pipe(catchError(this.errorHttpHandler))
  }
  updateCategory(id: any, params: any) {
    return this.HttpClient.put(this.production + `categories/${id}`, params)
      .pipe(catchError(this.errorHttpHandler))
  }
  deleteCategory(id: any) {
    return this.HttpClient.delete(this.production + `categories/${id}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  showCategory(id: any) {
    return this.HttpClient.get(this.production + `categories/${id}`)
      .pipe(catchError(this.errorHttpHandler))
  }

  // Projects
  getAllProjects() {
    return this.HttpClient.get(this.production + 'projects/index')
      .pipe(catchError(this.errorHttpHandler))
  }
  getProjects(params: any) {
    return this.HttpClient.get(this.production + 'projects/filter/' + params)
      .pipe(catchError(this.errorHttpHandler))
  }
  showProject(params: any) {
    return this.HttpClient.get(this.production + `projects/find/${params}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  createObstacle(params: any) {
    return this.HttpClient.post(this.production + `projects/createObstacle`, params)
      .pipe(catchError(this.errorHttpHandler))
  }
  deleteProject(params: any) {
    return this.HttpClient.delete(this.production + `projectdetails/${params}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  filterByYear(year: any, section: any) {
    return this.HttpClient.get(this.production + `projects/year/${year}/${section}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  filterALLChartYear(year: any) {
    return this.HttpClient.get(this.production + `projects/filterAllByYear/${year}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  filterChartBySection(section: any, year: any) {
    return this.HttpClient.get(this.production + `projects/filterBySection/${year}/${section}`)
      .pipe(catchError(this.errorHttpHandler))
  }

  // ProjectsDetails
  createProjectDetails(params: any) {
    return this.HttpClient.post(this.production + `projectdetails`, params)
      .pipe(catchError(this.errorHttpHandler))
  }
  getByStatus(status: any, projectId: any) {
    return this.HttpClient.get(this.production + `projectdetails/status/${status}/${projectId}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  updateProjectDetails(params: any) {
    return this.HttpClient.put(this.production + `projectdetails`, params)
      .pipe(catchError(this.errorHttpHandler))
  }

  // Auth
  login(params: any) {
    return this.HttpClient.post(this.production + 'users/login', params)
  }
  register(params: any) {
    return this.HttpClient.post(this.production + 'users/register', params)
  }
  logout(params: any) {
    return this.HttpClient.delete(this.production + `users/logout/${params}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  refreshToken(params: any) {
    return this.HttpClient.post(this.production + `users/refreshToken`, params)
      .pipe(catchError(this.errorHttpHandler))
  }

  // User
  getUser() {
    return this.HttpClient.get(this.production + 'users')
      .pipe(catchError(this.errorHttpHandler))
  }
  findUser(id: any) {
    return this.HttpClient.get(this.production + `users/${id}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  deleteUser(id: any) {
    return this.HttpClient.delete(this.production + `users/${id}`)
      .pipe(catchError(this.errorHttpHandler))
  }
  updateUser(id: any, params: any) {
    return this.HttpClient.put(this.production + `users/${id}`, params)
      .pipe(catchError(this.errorHttpHandler))
  }

  // Section
  getSections() {
    return this.HttpClient.get(this.production + 'sections')
      .pipe(catchError(this.errorHttpHandler))
  }
  showSection(id: any) {
    return this.HttpClient.get(this.production + `sections/${id}`)
      .pipe(catchError(this.errorHttpHandler))
  }

  // SectionCategory
  getSectionCategories(params: any) {
    return this.HttpClient.get(this.production + `sectioncategories/${params}`)
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
