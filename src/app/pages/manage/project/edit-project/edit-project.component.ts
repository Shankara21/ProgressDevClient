import { Router } from '@angular/router';
import { ControlService } from 'src/app/Services/control.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
};

Chart.register(...registerables)
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})

export class EditProjectComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  constructor(public ControlService: ControlService, private router: Router) {
  }
  // pagination
  p: number = 1;
  itemsPerPage: number = 10;
  totalProduct: any;

  // search
  term: any;

  success = false;

  paramsId = this.router.url.split('/')[2];

  // Default Array
  tempOnProgress: any;
  tempDone: any;

  // For Status 0
  projectsProgress: any;

  // For Status 1
  projectDone: any[] = [];

  form!: FormGroup;

  path: any;
  documentName: any;
  categoryId: any;

  // Chart
  progressChart: any;
  progress: any;

  // detailsProject
  detailsProject: any;
  nextProcess: any;

  // updateData
  document!: File;

  // create obstacle
  obstacleForm!: FormGroup;
  ngOnInit(): void {

    this.ControlService.getByStatus(0, this.paramsId).subscribe((data: any) => {
      this.tempOnProgress = data;
      this.projectsProgress = this.tempOnProgress.projectDone;
      this.nextProcess = this.projectsProgress[0].Category;

    })
    this.ControlService.getByStatus(1, this.paramsId).subscribe((data: any) => {
      this.tempDone = data;
      this.projectDone = this.tempDone.projectDone;
      // console.log(this.tempDone);
    })
    this.form = new FormGroup({
      categoryId: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
      projectId: new FormControl('', [Validators.required]),
    })

    this.ControlService.showProject(this.paramsId).subscribe((data: any) => {
      this.detailsProject = data;
      this.progress = data.progress;
      this.chartOptions = {
        series: [this.progress],
        chart: {
          height: 350,
          type: "radialBar"
        },
        fill: {
          colors: [function ({ value }: { value: any }) {
            if (value < 25) {
              return "#FF0000";
            } else if (value >= 25 && value < 50) {
              return "#FF7F00";
            } else if (value >= 50 && value < 75) {
              return "#FFFF00";
            } else if (value >= 75 && value < 100) {
              return "#00FF00";
            } else {
              return "#00FF00";
            }
          }]
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: "22px"
              },
              value: {
                fontSize: "16px"
              },
              total: {
                show: true,
                label: "Percentage",
                formatter: function (w: any) {
                  return w.globals.seriesTotals.reduce((a: any, b: any) => {
                    return a + b;
                  }, 0) + "%";
                }
              }
            }
          }
        },
        labels: ["Done"]
      };
    })

    this.obstacleForm = new FormGroup({
      obstacle: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
    })
  }
  obstacleSubmit() {
    this.obstacleForm.value.id = this.paramsId;
    this.ControlService.createObstacle(this.obstacleForm.value).subscribe((data: any) => {
      this.ControlService.showProject(this.paramsId).subscribe((data: any) => {
        this.detailsProject = data;
      })
    })
  }
  onChange(event: any) {
    this.document = event.target.files[0];
    console.log(this.document);
  }
  getPath(params: any, name: any) {
    this.path = `http://localhost:3000/${params}`
    this.documentName = name;
  }
  submit() {
    // this.form.value.categoryId = this.categoryId;
    this.form.value.projectId = this.paramsId;
    // convert to number
    this.form.value.categoryId = Number(this.form.value.categoryId);
    this.form.value.projectId = Number(this.form.value.projectId);
    // console.log(this.form.value);

    const formData = new FormData();
    formData.append('categoryId', this.form.value.categoryId);
    formData.append('projectId', this.form.value.projectId);
    formData.append('document', this.document, this.document.name);

    this.ControlService.updateProjectDetails(formData).subscribe((data: any) => {
      // mengubah nilai success hanya dalam 5 detik
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 3000);

      this.ControlService.getByStatus(0, this.paramsId).subscribe((data: any) => {
        this.tempOnProgress = data;
        this.projectsProgress = this.tempOnProgress.projectDone;
        this.nextProcess = this.projectsProgress[0].Category;
      })
      this.ControlService.getByStatus(1, this.paramsId).subscribe((data: any) => {
        this.tempDone = data;
        this.projectDone = this.tempDone.projectDone;
        // console.log(this.tempDone);
      })
      this.ControlService.showProject(this.paramsId).subscribe((data: any) => {
        // this.detailsProject = data;
        // console.log(this.detailsProject);

        this.progress = data.progress;
        this.chartOptions = {
          series: [this.progress],
          chart: {
            height: 350,
            type: "radialBar"
          },
          fill: {
            colors: [function ({ value }: { value: any }) {
              if (value < 25) {
                return "#FF0000";
              } else if (value >= 25 && value < 50) {
                return "#FF7F00";
              } else if (value >= 50 && value < 75) {
                return "#FFFF00";
              } else if (value >= 75 && value < 100) {
                return "#00FF00";
              } else {
                return "#00FF00";
              }
            }]
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: "22px"
                },
                value: {
                  fontSize: "16px"
                },
                total: {
                  show: true,
                  label: "Percentage",
                  formatter: function (w: any) {
                    return w.globals.seriesTotals.reduce((a: any, b: any) => {
                      return a + b;
                    }, 0) + "%";
                  }
                }
              }
            }
          },
          labels: ["Done"]
        };
      })
    })

  }
}
