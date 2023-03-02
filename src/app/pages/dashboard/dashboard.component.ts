import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CookieService } from "ngx-cookie-service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // auth
  decoded: any;
  refreshToken: any;
  id: any

  // projects
  name: any[] = [];
  progress: any[] = [];
  constructor(private elementRef: ElementRef, public ControlService: ControlService, private router: Router, private cookieService: CookieService) { }
  // public chart: any;

  // card
  nameProject: any[] = [];
  progressProject: any[] = [];

  // chart
  projectChart: any;
  prosessChart: any;
  rawChart: any;
  packagingChart: any;
  ngOnInit(): void {
    const token = this.cookieService.get('progressDevToken');

    if (!this.cookieService.get('progressDevToken')) {
      this.router.navigate(['/login']);
    }

    this.refreshToken = new FormGroup({
      refreshToken: new FormControl(token)
    })

    // mengecek apakah ada yang login
    this.ControlService.refreshToken(this.refreshToken.value).subscribe((res: any) => {
      this.decoded = jwt_decode(res.accessToken);
      this.ControlService.username = this.decoded.username;
      this.ControlService.email = this.decoded.email;
      this.ControlService.fullname = this.decoded.fullname;
      this.ControlService.userLevel = this.decoded.userLevel;
      this.ControlService.id = this.decoded.id;
      this.id = this.decoded.id;


      this.ControlService.data = {
        username: this.decoded.username,
        email: this.decoded.email,
        fullname: this.decoded.fullname,
        userLevel: this.decoded.userLevel
      }
    });

    // Get Project
    // this.ControlService.getProjects("pjd").subscribe((res: any) => {

    //   this.name = res.projects.map((item: any) => item.name);
    //   this.progress = res.projects.map((item: any) => item.progress);
    //   this.projectChart = new Chart("progressChart2", {

    //     type: 'bar',
    //     data: {
    //       labels: this.name,
    //       datasets: [{
    //         label: 'Progress',
    //         data: this.progress,
    //         borderWidth: 0,
    //         borderRadius: 20,
    //         backgroundColor: [
    //           'rgba(255, 99, 132)',
    //           'rgba(54, 162, 235)',
    //           'rgba(255, 206, 86)',
    //           'rgba(75, 192, 192)',
    //           'rgba(153, 102, 255)',
    //           'rgba(255, 159, 64)'
    //         ],
    //       }]
    //     },
    //     options: {
    //       responsive: true,
    //       maintainAspectRatio: false,
    //       scales: {
    //         // Menambahkan % pada yAxis
    //         y: {
    //           beginAtZero: true,
    //           max: 100,
    //           ticks: {
    //             callback: function (value: any) {
    //               return value + '%';
    //             }
    //           }
    //         },

    //       }
    //     }
    //   })
    // })
    this.ControlService.getAllProjects().subscribe((res: any) => {
      this.progressProject = res.map((item: any) => item.project);
      console.log(this.progressProject[0]);

      const tempProjectName = this.progressProject[0].map((item: any) => item.name);
      const tempProjectProgress = this.progressProject[0].map((item: any) => item.progress);

      this.projectChart = new Chart("progressChart1", {
        type: 'bar',
        data: {
          labels: tempProjectName,
          datasets: [{
            label: 'Progress',
            data: tempProjectProgress,
            borderWidth: 0,
            borderRadius: 20,
            backgroundColor: [
              '#D61355',
              '#F94A29',
              '#FCE22A',
              '#30E3DF',
              '#FFB830',
              '#3B14A7'
            ],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            // Menambahkan % pada yAxis
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function (value: any) {
                  return value + '%';
                }
              }
            },

          }
        }
      })

      const tempProcessName = this.progressProject[1].map((item: any) => item.name);
      const tempProcessProgress = this.progressProject[1].map((item: any) => item.progress);
      this.prosessChart = new Chart("progressChart2", {
        type: 'bar',
        data: {
          labels: tempProcessName,
          datasets: [{
            label: 'Progress',
            data: tempProcessProgress,
            borderWidth: 0,
            borderRadius: 20,
            backgroundColor: [
              '#EB5353',
              '#F9D923',
              '#36AE7C',
              '#187498',
              '#4D96FF',
              '#E4508F'
            ],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            // Menambahkan % pada yAxis
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function (value: any) {
                  return value + '%';
                }
              }
            },

          }
        }
      });

      const tempRawName = this.progressProject[2].map((item: any) => item.name);
      const tempRawProgress = this.progressProject[2].map((item: any) => item.progress);
      this.rawChart = new Chart("progressChart3", {
        type: 'bar',
        data: {
          labels: tempRawName,
          datasets: [{
            label: 'Progress',
            data: tempRawProgress,
            borderWidth: 0,
            borderRadius: 20,
            backgroundColor: [
              '#0081C9',
              '#5BC0F8',
              '#F49D1A',
              '#B01E68',
              '#7743DB',
              '#379237'
            ],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            // Menambahkan % pada yAxis
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function (value: any) {
                  return value + '%';
                }
              }
            },

          }
        }
      })

      const tempPackagingName = this.progressProject[3].map((item: any) => item.name);
      const tempPackagingProgress = this.progressProject[3].map((item: any) => item.progress);
      this.packagingChart = new Chart("progressChart4", {
        type: 'bar',
        data: {
          labels: tempPackagingName,
          datasets: [{
            label: 'Progress',
            data: tempPackagingProgress,
            borderWidth: 0,
            borderRadius: 20,
            backgroundColor: [
              '#53BF9D',
              '#F94C66',
              '#BD4291',
              '#FFC54D',
              '#F900BF',
              '#FF1700'
            ],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            // Menambahkan % pada yAxis
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function (value: any) {
                  return value + '%';
                }
              }
            },

          }
        }
      })
    })
  }
}
