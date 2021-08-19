import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PassdataService } from '../../services/passdata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewdeleteauthorizeuser',
  templateUrl: './viewdeleteauthorizeuser.component.html',
  styleUrls: ['./viewdeleteauthorizeuser.component.css']
})
export class Viewdeleteauthorizeuser implements OnInit {

  user : any  = {};
  userData: any;
  constructor(  private rest: RestapiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private passData: PassdataService,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {

    let data=this.passData.getJSONData();
    this.userData=this.passData.getJSONData();
    console.log('view profile Data== : '+JSON.stringify(this.userData.userName));


    this.user.username=this.userData.userName;
    this.user.usertype=this.userData.userType;
    this.user.firstname=this.userData.firstName;
    this.user.lastname=this.userData.lasName;
    this.user.profile=this.userData.profileId;
    this.user.profilename=this.userData.profileName;
    this.user.dob=this.userData.dob;
    this.user.mobile=this.userData.mobileNo;
    this.user.gmail=this.userData.emailid;
    this.user.city=this.userData.city;
    this.user.address=this.userData.address;
    this.user.country=this.userData.country;

  }



  addDeleteAuthProfile()
  {
    const postData = {
     };
     const subUrl='authdeauthDelete?userid='+this.userData.userId+'&purpose='+'auth';
      //Sending The Added Values For Product
     console.log('Sending The Auth Values For user  :' + JSON.stringify(postData));
     this.rest.sendPostRequest(subUrl, JSON.stringify(postData))
       .subscribe(
         res => this.GetRespaddProfile(res),
         error => this.GetErroraddProfile(error)); 
   }
  
  
   
   addDeleteDeAuthProfile()
  {
    const postData = {
     };
     const subUrl='authdeauthDelete?userid='+this.userData.userId+'&purpose='+'deauth';
      //Sending The Added Values For Product
     console.log('Sending The De Auth Values For Profile :' + JSON.stringify(postData));
     this.rest.sendPostRequest(subUrl, JSON.stringify(postData))
       .subscribe(
         res => this.GetRespaddProfile(res),
         error => this.GetErroraddProfile(error)); 
   }
  
  //Getting Response for Add Profile
  GetRespaddProfile(resp) {
   console.log('Getting Response for Add Profile : ' + JSON.stringify(resp));
   if (resp.RESP_STATUS === 'SUCCESS') {
     this.toastr.success(resp.RESP_DESC);
     console.log('User Auth Successfully');
  
     setTimeout(() => {
       this.toastr.clear();
     }, 2500);
     setTimeout(() => {
  
      this.router.navigate(['/layout/user']);

  
       console.log('Navigate to User');
     }, 3000);
   } else {
     console.log('Failed For auth  User');
     this.toastr.error(resp.RESP_DESC);
   }
  }
  //Getting Error For Add Profile
  GetErroraddProfile(error) {
   console.log('Getting Error for Add User auth  : ' + JSON.stringify(error));
  
  
  }
  
  

}
