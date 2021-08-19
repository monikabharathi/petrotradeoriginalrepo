import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { PassdataService } from '../../services/passdata.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
  providers: [
    DatePipe
  ]
})
export class AdduserComponent implements OnInit {
  mysubmit: any;
  countryName: any;
  profilename:any;
  countryList: any = [];
  Profilelist = [];
  profileListData=[];
  mkaerProfilelist = [];
  checkerProfilelist = [];
  user : any  = {};
  form :any;
  constructor(
    private router: Router,
     private rest: RestapiService,
     private datePipe: DatePipe,
    private toastr: ToastrService,
    private passData: PassdataService

  ) { }

  ngOnInit() {
    this.countryList = ['LAOS', 'USA', 'INDIA', 'THAILAND'];
    this.getProfileList();
    this.UserType('B');
this.mysubmit=false;
  }


//addUser

addUser(form)
{
  this.mysubmit=true;
  this.getProfileName( this.user.profile);

     const postData = {
      userName: this.user.username,
     // userType: this.user.usertype,
      userType:"B",
      firstName:this.user.firstname,
      lasName : this.user.lastname,
      profileId : this.user.profile,

      profileName:this.profilename,
    //  dob:  this.datePipe.transform(this.user.dob, "dd-MM-yyyy"),
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
    this.rest.sendPostRequest('addUser', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespaddProfile(res),
        error => this.GetErroraddProfile(error)); 
  }


//Getting Response for Add Profile
GetRespaddProfile(resp) {
  console.log('Getting Response for Add user : ' + JSON.stringify(resp));
  if (resp.RESP_STATUS === 'SUCCESS') {


/* 
     this.toastr.success(resp.RESP_DESC);
    console.log('User Added Successfully');
    setTimeout(() => {
      this.toastr.clear();
    }, 2500);
    setTimeout(() => {
      this.router.navigate(['/layout/user']);
      console.log('Navigate to user');
    }, 3000);
 
 */
    this.passData.setJSONData(resp);

    setTimeout(() => {
      this.toastr.clear();
    }, 2500);
    setTimeout(() => {
           this.router.navigate(['/layout/userpasswordgeneratepage']);
    });
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



//usertype


UserType(type)
{

  if(type==='M')
  {
  //  alert(this.user.usertype);
    this.profileListData=this.mkaerProfilelist;
  }
  else
  {
   this.profileListData=this.checkerProfilelist;
 
  } 
}



//Getting The Unit List For Add Product
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

  console.log('Getting Response For ProfileList To Add Product: ' + JSON.stringify(resp.RESP_DESC));
}
 //Getting Error For ProfileList To Add Product
GetErrorProfileListProduct(error) {
  console.log('Getting Error For ProfileList To Add Product: ' + JSON.stringify(error));
}
checkusername(f:NgForm)
  {
    

   // alert('ProfileName '+this.model.profilename);
     const postData = {
      userName : this.user.username

  } 
  console.log('Sending checkuserName : ' + JSON.stringify(postData));
  this.rest.sendPostRequest('userNamechecking', JSON.stringify(postData))
  .subscribe(
    res => this.GetRespCheckprofileName(res),
    error => this.GetErrorCheckprofileName(error));
}

//Getting Response For Add Depot
GetRespCheckprofileName(resp) {
  console.log('Getting Response ForCheckprofile : ' + JSON.stringify(resp));
  if ( resp.RESP_STATUS === 'SUCCESS' ) {
      this.user.username=null;
      this.toastr.error("This UserName Already Exist.Try Some Another Name.");
      setTimeout(() => {
        this.toastr.clear();
      }, 2000);
     /*  setTimeout(() => {
     console.log('timeout');
      }, 2000);
 */
 } else {
  console.log('username not already exist');
    
 }
}
 //Getting Error For Add Depot
 GetErrorCheckprofileName(error) {
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
  console.log('Getting Error For Add Depot : ' + JSON.stringify(error));

}
  



}
