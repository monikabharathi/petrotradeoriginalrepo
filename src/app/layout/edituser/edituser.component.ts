import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PassdataService } from '../../services/passdata.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
  providers: [
    DatePipe
  ]
})
export class EdituserComponent implements OnInit {
  user : any  = {};
  form :any;
  mysubmit: any;
  profilename:any;
  Profilelist = [];
  profileListData=[];
  checkerProfilelist = [];
  mkaerProfilelist = [];
  userData: any;
  constructor(
    private router: Router,
     private rest: RestapiService,
     private datePipe: DatePipe,
     private passData: PassdataService,
    private toastr: ToastrService

  ) { }

  ngOnInit() {
    this.UserType("B");
this.mysubmit=false;
this.getProfileList();
    let data=this.passData.getJSONData();
    this.userData=this.passData.getJSONData();
    console.log('view profile Data== : '+JSON.stringify(this.userData.userName));
    this.getProfileByUseType(this.userData.userType);

    this.user.username=this.userData.userName;
    this.user.usertype=this.userData.userType;
    this.user.firstname=this.userData.firstName;
    this.user.lastname=this.userData.lasName;
    this.user.profile=this.userData.profileId;
   // this.user.profilename=this.userData.profileName;
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


  UserType(type)
  {
   // alert(this.user.usertype);
  
    if(this.user.usertype==='M')
    {
      //alert(this.user.usertype);
      this.profileListData=this.mkaerProfilelist;
    }
    else
    {
     this.profileListData=this.checkerProfilelist;
   
    } 
  }


  getProfileByUseType(userType)
  {
   // alert(this.user.usertype);
  
    if(userType==='M')
    {
      //alert(this.user.usertype);
      this.profileListData=this.mkaerProfilelist;
    }
    else
    {
     this.profileListData=this.checkerProfilelist;
   
    } 
  }
  




  

  getProfileList() {
  let postData = {
  };
   //Sending Request For Getting The Unit List For Add Product 
   console.log('Sending Request For Getting The Unit List For Add Product  : ' + JSON.stringify(postData));
  this.rest.sendPostRequest('gettingactiveprofiles', JSON.stringify(postData))
    .subscribe(
      res => this.GetRespProfileListProduct(res),
      error => this.GetErrorProfileListProduct(error));
}
//Getting Response ForProfileList To Add Product
GetRespProfileListProduct(resp) {
  

  this.Profilelist = resp.RESP_DESC;
  if(this.Profilelist !=null || this.Profilelist.length !=0)
  {
  for(let check  of this.Profilelist) { 

    if(check.profiletype==='M')
    {
   this.mkaerProfilelist.push(check);
    }
    else{
      this.checkerProfilelist.push(check);

    }
  }

  }


  this.Profilelist = resp.RESP_DESC;
  }

//Getting Error For ProfileList To Add Product
GetErrorProfileListProduct(error) {
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
  console.log('Getting Error For ProfileList To Add Product: ' + JSON.stringify(error));
}




  
editUser(form)
{
  this.mysubmit=true;
  this.getProfileName( this.user.profile);

 // console.log('safteydate : ' + this.datePipe.transform(this.user.dob, "MM-dd-yyyy"));

     const postData = {
      userId: this.userData.userId,
      userName: this.user.username,
      addedBy: this.userData.addedBy,
    //  userType: this.user.usertype,
       userType: "B",
      firstName:this.user.firstname,
      userpassword:this.userData.userpassword,
      lasName : this.user.lastname,
      profileId : this.user.profile,

      profileName:this.profilename,
    //  dob:  this.datePipe.transform(this.user.dob,  "MM-dd-yyyy"),
      mobileNo: this.user.mobile,
      emailid: this.user.gmail,
      city: this.user.city,
      //address: this.user.address,
      country : this.user.country,


      companyname : this.user.companyname,
       title : this.user.title,
       employeename : this.user.employeename,
       department : this.user.department,
       officelocation :this.user.officelocation
     
    };
     //Sending The Added Values For Product
    console.log('Sending The Added Values For User :' + JSON.stringify(postData));
    this.rest.sendPostRequest('editUser', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespaddProfile(res),
        error => this.GetErroraddProfile(error)); 
  }


//Getting Response for Add Profile
GetRespaddProfile(resp) {
  console.log('Getting Response for Add user : ' + JSON.stringify(resp));
  if (resp.RESP_STATUS === 'SUCCESS') {
    this.toastr.success(resp.RESP_DESC);
    console.log('User Added Successfully');
    setTimeout(() => {
      this.toastr.clear();
    }, 2500);
    setTimeout(() => {
      this.router.navigate(['/layout/user']);
      console.log('Navigate to user');
    }, 3000);
  } else {
    console.log('Failed For Add Profile');
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
  console.log('Getting Error for Add User : ' + JSON.stringify(error));

}

getProfileName(profileid)
{
  
  console.log("My List "+JSON.stringify(this.Profilelist));
  for(let profile  of this.Profilelist) { 

    console.log("Checking profile "+JSON.stringify(profile));
    console.log("Checking profile ID "+JSON.stringify(profile.profileid));
    console.log("Seelct profile  "+profileid);
    if(profile.profileid==profileid)
    {
     this.profilename=profile.profilename;

    }
  }
}

}
