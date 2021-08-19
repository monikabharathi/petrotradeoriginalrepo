import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UserIdleService } from 'angular-user-idle';
import { RestapiService } from '../services/restapi.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  timeStart = false;
  seconds = 5;
  clientX = 0;
  clientY = 0;

  color = 'blue';
  showSettings = false;
  showMinisidebar = false;
  showDarktheme = false;
  showRtl = false;

  public innerWidth: any;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(
    public router: Router,
    public rest: RestapiService,
    private userIdle: UserIdleService,) { }

  ngOnInit() {
    this.handleLayout();
   // alert('/');
    //if (this.router.url === '/') {//depot
      this.router.navigate(['/layout/stock']);
      
   // }
   // this.handleLayout();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleLayout();
  }

  toggleSidebar() {
    this.showMinisidebar = !this.showMinisidebar;
  }

  handleLayout() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.showMinisidebar = true;
    } else {
      this.showMinisidebar = false;
    }
  }
 
  


}