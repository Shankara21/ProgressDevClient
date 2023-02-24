import { ControlService } from 'src/app/Services/control.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(public router: Router, public controlService: ControlService) { }
  ngOnInit(): void {
  }
}
