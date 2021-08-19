import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { PassdataService } from '../../services/passdata.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent implements OnInit {

  user : any  = {};
  userData: any;
  mysubmit : any;
  constructor(  private rest: RestapiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private passData: PassdataService,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {
this.mysubmit=false;
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



    this.user.companyname = this.userData.companyname;
    this.user.title = this.userData.title;
    this.user.employeename = this.userData.employeename;
    this.user.department = this.userData.department;
    this.user.officelocation =this.userData.officelocation;








  }
  

  deleteUser()
{
  this.mysubmit=true;

  const postData = {
   };
   const subUrl='deleteUser?userid='+this.userData.userId;
    //Sending The Added Values For Product
   console.log('Sending The Auth V user delete :' + JSON.stringify(postData));
   this.rest.sendPostRequest(subUrl, JSON.stringify(postData))
     .subscribe(
       res => this.GetRespaddProfile(res),
       error => this.GetErroraddProfile(error)); 
 }

//Getting Response for Add Profile
GetRespaddProfile(resp) {
  console.log('Getting Response for user delete : ' + JSON.stringify(resp));
  if (resp.RESP_STATUS === 'SUCCESS') {
    this.toastr.success(resp.RESP_DESC);
    console.log('User  Delete  Successfully');
    setTimeout(() => {
      this.toastr.clear();
    }, 2500);
    setTimeout(() => {
      this.router.navigate(['/layout/user']);
      console.log('Navigate to user');
    }, 3000);
  } else {
    console.log('Failed For user delete');
    this.toastr.error(resp.RESP_DESC);
  }
 }
 //Getting Error For Add Profile
 GetErroraddProfile(error) {
  if(localStorage.getItem("TOKEN")===null)
  {
  this.toastr.error("Session Time Out Please Login Again....");
  setTimeout(() => {
    this.toastr.clear();
  }, 1500);
  setTimeout(() => {
    this.router.navigate(['/login']);
    console.log('Navigate to login');
  }, 2000);

}
  console.log('Getting Error for  user delete : ' + JSON.stringify(error));
 
 
 }
 

}
