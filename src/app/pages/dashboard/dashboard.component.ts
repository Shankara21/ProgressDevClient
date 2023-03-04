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

  // year
  years: any[] = [];

  // form
  allChart!: FormGroup;

  psdChart!: FormGroup;
  pjdChart!: FormGroup;
  rmdChart!: FormGroup;
  pmdChart!: FormGroup;

  ngOnInit(): void {
    const token = this.cookieService.get('progressDevToken');

    if (!this.cookieService.get('progressDevToken')) {
      this.router.navigate(['/login']);
    }

    this.refreshToken = new FormGroup({
      refreshToken: new FormControl(token)
    })

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
    const startYear = 2023
    for (let i = startYear; i < new Date().getFullYear() + 6; i++) {
      this.years.push(i)
    }
    this.ControlService.getAllProjects().subscribe((res: any) => {
      this.progressProject = res.map((item: any) => item.project);

      const tempProjectName = this.progressProject[0].map((item: any) => item.name);
      let tempProjectProgress = this.progressProject[0].map((item: any) => item.progress);

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
      let tempPackagingProgress = this.progressProject[3].map((item: any) => item.progress);
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

    this.allChart = new FormGroup({
      year: new FormControl('', Validators.required)
    })

    this.pjdChart = new FormGroup({
      year: new FormControl('', Validators.required),
      section: new FormControl('pjd', Validators.required)
    })
    this.psdChart = new FormGroup({
      year: new FormControl('', Validators.required),
      section: new FormControl('psd', Validators.required)
    })
    this.rmdChart = new FormGroup({
      year: new FormControl('', Validators.required),
      section: new FormControl('rmd', Validators.required)
    })
    this.pmdChart = new FormGroup({
      year: new FormControl('', Validators.required),
      section: new FormControl('pmd', Validators.required)
    })
  }

  filterAllChart() {
    this.allChart.value.year = Number(this.allChart.value.year)
    console.log('VALUE');
    console.log(this.allChart.value);


    this.ControlService.filterALLChartYear(this.allChart.value.year).subscribe((res: any) => {
      this.progressProject = res.map((item: any) => item.project);

      // console.log(this.progressProject[0]);



      const tempProjectName = this.progressProject[0].map((item: any) => item.name);
      let tempProjectProgress = this.progressProject[0].map((item: any) => item.progress);

      console.log(tempProjectProgress);

      if (this.projectChart) {
        this.projectChart.destroy();
      }
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

      if (this.prosessChart) {
        this.prosessChart.destroy();
      }
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

      if (this.rawChart) {
        this.rawChart.destroy();
      }

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
      let tempPackagingProgress = this.progressProject[3].map((item: any) => item.progress);
      console.log(tempPackagingProgress);

      if (this.packagingChart) {
        this.packagingChart.destroy();
      }
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

    // this.ControlService.filterALLChartYear
  }

  filterPJDChart() {
    this.pjdChart.value.year = Number(this.pjdChart.value.year)
    this.ControlService.filterChartBySection(this.pjdChart.value.section, this.pjdChart.value.year).subscribe((res: any) => {
      let tempPJD = res.projects;
      const tempPJDName = tempPJD.map((item: any) => item.name);
      const tempPJDProgress = tempPJD.map((item: any) => item.progress);
      if (this.projectChart) {
        this.projectChart.destroy();
      }
      this.projectChart = new Chart("progressChart1", {
        type: 'bar',
        data: {
          labels: tempPJDName,
          datasets: [{
            label: 'Progress',
            data: tempPJDProgress,
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

    })

  }

  filterPSDChart() {
    this.psdChart.value.year = Number(this.psdChart.value.year)
    this.ControlService.filterChartBySection(this.psdChart.value.section, this.psdChart.value.year).subscribe((res: any) => {
      let tempPSD = res.projects;
      const tempPSDName = tempPSD.map((item: any) => item.name);
      const tempPSDProgress = tempPSD.map((item: any) => item.progress);
      if (this.prosessChart) {
        this.prosessChart.destroy();
      }
      this.prosessChart = new Chart("progressChart2", {
        type: 'bar',
        data: {
          labels: tempPSDName,
          datasets: [{
            label: 'Progress',
            data: tempPSDProgress,
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
      })

    })
  }

  filterRMDChart() {
    this.rmdChart.value.year = Number(this.rmdChart.value.year)
    this.ControlService.filterChartBySection(this.rmdChart.value.section, this.rmdChart.value.year).subscribe((res: any) => {
      let tempRMD = res.projects;
      const tempRMDName = tempRMD.map((item: any) => item.name);
      const tempRMDProgress = tempRMD.map((item: any) => item.progress);
      if (this.rawChart) {
        this.rawChart.destroy();
      }
      this.rawChart = new Chart("progressChart3", {
        type: 'bar',
        data: {
          labels: tempRMDName,
          datasets: [{
            label: 'Progress',
            data: tempRMDProgress,
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
    }
    )
  }

  filterPMDChart() {
    this.pmdChart.value.year = Number(this.pmdChart.value.year)
    this.ControlService.filterChartBySection(this.pmdChart.value.section, this.pmdChart.value.year).subscribe((res: any) => {
      let tempPMD = res.projects;
      const tempPMDName = tempPMD.map((item: any) => item.name);
      const tempPMDProgress = tempPMD.map((item: any) => item.progress);
      if (this.packagingChart) {
        this.packagingChart.destroy();
      }
      this.packagingChart = new Chart("progressChart4", {
        type: 'bar',
        data: {
          labels: tempPMDName,
          datasets: [{
            label: 'Progress',
            data: tempPMDProgress,
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
    }
    )
  }

}
