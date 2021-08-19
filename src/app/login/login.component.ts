import { Component, TemplateRef, OnInit, HostListener } from '@angular/core';

import { PassdataService } from '../services/passdata.service';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Idle } from 'idlejs/dist';
import { RestapiService } from '../services/restapi.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg: any;
  form: any;
 
  user : any  = {};
  parentmenu: any = {};
  submenu: any = {};
  subpersubmeny: any = {};
  selmenuids:any={};
  
  username: any;
  password: any;
  constructor(
    private rest: RestapiService, 
    private router: Router, 
    private passData: PassdataService,
    private toastr: ToastrService) {  
    }
 /*  showAlert(template: TemplateRef<any>, data: string) {
    this.modalRef = this.modalService.show(template, this.config);
  } */

  ngOnInit() {
  }
  
  validateLogin( f: NgForm) {
    localStorage.clear();
    console.log('Username : ' + this.user.username);
    console.log('Password : ' + this.user.password);
    console.log('Validating');
    const postData = {
      userName: this.user.username,
      userpassword: this.user.password
    };
    console.log('Login User:' + JSON.stringify(postData));
    this.rest.sendPostRequest('login', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespLogin(res),
        error => this.GetErrorLogin(error)); 
  }

  GetRespLogin(resp) {
    console.log("Resp Token "+JSON.stringify(resp.TOKEN));
    console.log('Getting Response for  user Login : ' + JSON.stringify(resp));
    //setTimeout(() => {
      this.toastr.clear();
    //}, 50);
    //localStorage.clear();
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.startSessionCount();
         this.passData.setJSONData(resp);
      localStorage.setItem('ALLMENUS', JSON.stringify(resp.ALLMENUS)); 
      localStorage.setItem('MENUSIDS', JSON.stringify(resp.MENUSIDS));       
      console.log('STORINGGGGGGGGGGGGGGGGGGg');
      console.log("Local : "+localStorage.getItem('ALLMENUS'));
      console.log( "Local string "+JSON.stringify(localStorage.getItem('ALLMENUS')));

      localStorage.setItem('TOKEN', resp.TOKEN);
      localStorage.setItem('USERTYPE', resp.USERTYPE);
      localStorage.setItem('USERNAME', resp.USERNAME);  
      localStorage.setItem('LASTLOGIN', resp.LASTLOGIN); 
      localStorage.setItem('USERID', resp.USERID); 
       
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);

      console.log('User Login Successfully');
     // this.passData.setJSONData(resp); menusdata
    // this.rest.menusdata=resp;
      //this.passData.setJSONData(resp);
     // localStorage.setItem('resp', resp);
     this.router.navigate(['layout/stock']);
      /* setTimeout(() => {
        this.router.navigate(['/layout']);
        console.log('Navigate to user');
      }, 3000); */
    }
    //FIRSTTIME
    else if(resp.RESP_STATUS === 'FIRSTTIME')
    {

      this.passData.setJSONData(resp);

      setTimeout(() => {
        this.toastr.clear();
      }, 200);
      setTimeout(() => {
      /*   this.router.navigate(['/userfirsttimechangepassword']); */
      this.router.navigate(['/firsttimechangepassword']);
       
        console.log('Navigate to user');
      }, 500);

    }
    //BLOCK
    else if(resp.RESP_STATUS === 'BLOCK')
    {
      this.user.username=null;
      this.user.password=null;
      this.toastr.error(resp.RESP_DESC);
      setTimeout(() => {
        this.toastr.clear();
      }, 1500);
      setTimeout(() => {
        this.router.navigate(['/login']);
        console.log('Navigate to user');
      }, 2000);

    }
    //FAIL
    else if(resp.RESP_STATUS === 'FAIL')
    {
      this.user.username=null;
      this.user.password=null;
      this.toastr.error(resp.RESP_DESC);
      setTimeout(() => {
        this.toastr.clear();
      }, 1500);
      setTimeout(() => {
        this.router.navigate(['/login']);
        console.log('Navigate to user');
      }, 2000);

    }
    //EXCEPTION
    else if(resp.RESP_STATUS === 'EXCEPTION')
    {
      this.user.username=null;
      this.user.password=null;
      this.toastr.error(resp.RESP_DESC);
      setTimeout(() => {
        this.toastr.clear();
      }, 1500);
      setTimeout(() => {
        this.router.navigate(['/login']);
        console.log('Navigate to user');
      }, 1000);

    }

    else {
      console.log('Failed For Add Profile');
      this.toastr.error(resp.RESP_DESC);
    }
  }
  //Getting Error For Add Profile
  GetErrorLogin(error) {
    //this.user.username=null;
      //this.user.password=null;
      this.toastr.error("Application Server Not Connected  !!!!");
      setTimeout(() => {
        this.toastr.clear();
      }, 1000);
      setTimeout(() => {
        this.router.navigate(['/login']);
        console.log('Navigate to login');
      }, 1000);
    console.log('Getting Error for Add User : ' + JSON.stringify(error));
    
  }
  
  startSessionCount() {
    console.log('Session Reset');
    const idle = new Idle()
    .whenNotInteractive()
    .within(1000, 1000) // 3=number 1000=milli second
    .do(() => this.checkPage(idle))
    .start();
  }
  checkPage(idle) {
    console.log('Session Timeout');
    alert("Session Timeout !!!");
    this.logout();
  }
  logout() {

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
      localStorage.removeItem('TOKEN');
      localStorage.removeItem('USERTYPE');
      localStorage.removeItem('USERNAME');
      localStorage.removeItem('LASTLOGIN');
      localStorage.removeItem('USERID');
      localStorage.removeItem('MENUSIDS');
      localStorage.removeItem('ALLMENUS');
      localStorage.removeItem('MENUSACTIONS');
      this.router.navigate(['/login']);
    }
    else {
      localStorage.removeItem('TOKEN');
      localStorage.removeItem('USERTYPE');
      localStorage.removeItem('USERNAME');
      localStorage.removeItem('LASTLOGIN');
      localStorage.removeItem('USERID');

      localStorage.removeItem('MENUSIDS');
      localStorage.removeItem('ALLMENUS');
      localStorage.removeItem('MENUSACTIONS');
      this.router.navigate(['/login']);
    }
  }
  GetErrorLogout(error) {
    this.router.navigate(['/login']);
  }
  }

