import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PassdataService } from '../../services/passdata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

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



    this.user.companyname = this.userData.companyname;
    this.user.title = this.userData.title;
    this.user.employeename = this.userData.employeename;
    this.user.department = this.userData.department;
    this.user.officelocation =this.userData.officelocation;
	
	
	
	
	
	
	
	
	
	



 
  }

}
