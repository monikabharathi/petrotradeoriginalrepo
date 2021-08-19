
import { PassdataService } from '../services/passdata.service';
import { Component, TemplateRef, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { RestapiService } from '../services/restapi.service';
@Component({
  selector: 'app-firsttimechangepassword',
  templateUrl: './firsttimechangepassword.component.html',
  styleUrls: ['./firsttimechangepassword.component.css']
})
export class FirsttimechangepasswordComponent implements OnInit {
  msg: any;
  form: any;
  user : any  = {};
  oldpassword: any;
   userdata:any;
    config = {
    keyboard: true
  };
  constructor(private rest: RestapiService, private router: Router, private passData: PassdataService,private toastr: ToastrService) {}
  
  ngOnInit() {

    let data=this.passData.getJSONData();
    this.userdata=this.passData.getJSONData();
    console.log('oldpassword== : '+JSON.stringify(this.userdata.PASSWORD));
    console.log('USERNAME== : '+JSON.stringify(this.userdata.USERNAME));
    this.user.dboldpassword=this.userdata.PASSWORD;
  }
changePassword( f: NgForm) {
    
    console.log('Db Old Password : ' + this.userdata.PASSWORD);
    console.log('Old Password : ' + this.user.oldpassword);
    console.log('New  Password : ' + this.user.newpassword);
    console.log('Confir mpassword : ' + this.user.confirmpassword);
    console.log('Validating');

if( this.user.oldpassword != this.userdata.PASSWORD)
{

  this.user.oldpassword=null;
  this.user.username=null;
  this.toastr.error("Old Password Is Wrong.");
  setTimeout(() => {
    this.toastr.clear();
  }, 2000);
  return false;
}
 else if(this.user.newpassword != this.user.confirmpassword)
{
  this.user.newpassword=null;
  this.user.confirmpassword=null;
  this.toastr.error("Newpassword Should Be Same As Confirmpassword ");
  setTimeout(() => {
    this.toastr.clear();
  }, 2000);
  return false;

} 

    const postData = {
    };
    const subUrl='firstTimechangepassword?username='+this.userdata.USERNAME+'&oldpassword='+this.user.oldpassword+'&newpassword='+this.user.newpassword+'&confirmpassword='+this.user.confirmpassword;
     //Sending The Added Values For Product
    console.log('Sending The De Auth Values For Profile :' + JSON.stringify(postData));
    this.rest.sendPostRequest(subUrl, JSON.stringify(postData))


    //console.log('Login User:' + JSON.stringify(postData));
    //this.rest.sendPostRequest('firstTimechangepassword', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespChangePassword(res),
        error => this.GetErrorChangePassword(error)); 
  }

  
  GetRespChangePassword(resp) {
  console.log('Change Password First Time : ' + JSON.stringify(resp));
  if (resp.RESP_STATUS === 'SUCCESS') {
    this.toastr.success(resp.RESP_DESC);
    console.log('Change Password First Time');
    this.passData.setJSONData(resp);
 
    setTimeout(() => {
      this.toastr.clear();
    }, 2500);
    setTimeout(() => {
    //  localStorage.clear();
      this.router.navigate(['/login']);
    console.log('Navigate to login');
    }, 2000);
  } else {
    this.passData.setJSONData(resp.PASSWORD);
    console.log('Failed change password');
    this.toastr.error(this.userdata);

    this.router.navigate(['/userfirsttimechangepassword']);
  }
 }

 GetErrorChangePassword(error) {
  this.user.oldpassword=null;
  this.user.newpassword=null;
  this.user.confirmpassword=null;
  console.log('Getting Error for Add User : ' + JSON.stringify(error));
  
}
}
