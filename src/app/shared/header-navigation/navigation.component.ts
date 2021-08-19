import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbPanelChangeEvent, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
declare var $: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};
  notifications: Object=[];
  mymessages: Object=[];
  username: any;
  lastlogin: any;
  constructor(private modalService: NgbModal,private router: Router,private rest: RestapiService,) {
    this.initMessage();
    this.initNotification();
    this.userDetails();
  }

 
  public showSearch = false;
  userDetails(){
  this.username=localStorage.getItem('USERNAME')
  this.lastlogin=localStorage.getItem('LASTLOGIN');

  }

  // This is for Notifications
  initNotification(){
    this.notifications = [
      {
        round: 'round-danger',
        icon: 'ti-link',
        title: 'Luanch Admin',
        subject: 'Just see the my new admin!',
        time: '9:30 AM'
      },
      {
        round: 'round-success',
        icon: 'ti-calendar',
        title: 'Event today',
        subject: 'Just a reminder that you have event',
        time: '9:10 AM'
      },
      {
        round: 'round-info',
        icon: 'ti-settings',
        title: 'Settings',
        subject: 'You can customize this template as you want',
        time: '9:08 AM'
      },
      {
        round: 'round-primary',
        icon: 'ti-user',
        title: 'Pavan kumar',
        subject: 'Just see the my admin!',
        time: '9:00 AM'
      }
    ];
  }
  initMessage() {
    // This is for Mymessages
    this.mymessages = [
      {
        useravatar: 'assets/images/users/1.jpg',
        status: 'online',
        from: 'Sunny',
        subject: 'Just see the my admin!',
        time: '9:30 AM'
      },
      {
        useravatar: 'assets/images/users/1.jpg',
        status: 'busy',
        from: 'Ganesh Nigam',
        subject: 'I have sung a song! See you at',
        time: '9:10 AM'
      },
      {
        useravatar: 'assets/images/users/1.jpg',
        status: 'away',
        from: 'Sathish Singh',
        subject: 'I am a singer!',
        time: '9:08 AM'
      },
      {
        useravatar: 'assets/images/users/1.jpg',
        status: 'offline',
        from: 'Suryakanty kumar',
        subject: 'Just see the my admin!',
        time: '9:00 AM'
      }
    ];
  }
  ngAfterViewInit() {}






  
  logout()
  {
  
    const postData = {
      
    };
    console.log('Logout User:' + JSON.stringify(postData));
    this.rest.sendPostRequest('logout', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespLogout(res),
        error => this.GetErrorLogout(error)); 
  }
  
  GetRespLogout(resp) {
    console.log('Getting Response for  user Login : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
  
      //this.rest.token=null;
  
      localStorage.removeItem('TOKEN');
      localStorage.removeItem('USERTYPE');
      localStorage.removeItem('USERNAME');  
      localStorage.removeItem('LASTLOGIN'); 
      localStorage.removeItem('USERID'); 
  
      
      localStorage.removeItem('MENUSIDS'); 
      localStorage.removeItem('ALLMENUS'); 
      
      this.router.navigate(['/login']);
  
  }
  else{
    //localStorage.removeItem('MENUSDATA'); 
  
      localStorage.removeItem('TOKEN');
      localStorage.removeItem('USERTYPE');
      localStorage.removeItem('USERNAME');  
      localStorage.removeItem('LASTLOGIN'); 
      localStorage.removeItem('USERID'); 

      localStorage.removeItem('MENUSIDS'); 
      localStorage.removeItem('ALLMENUS'); 
  
  
    this.router.navigate(['/login']);
  }
  
  
  
  }
  GetErrorLogout(error) {
  
    this.router.navigate(['/login']);
  
  }}



