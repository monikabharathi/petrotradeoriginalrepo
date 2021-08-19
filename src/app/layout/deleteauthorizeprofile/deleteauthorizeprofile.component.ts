import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { RestapiService } from '../../services/restapi.service';
import { PassdataService } from '../../services/passdata.service';

@Component({
  selector: 'app-deleteauthorizeprofile',
  templateUrl: './deleteauthorizeprofile.component.html',
  styleUrls: ['./deleteauthorizeprofile.component.css']
})
export class Deleteauthorizeprofile implements OnInit {
  profileData: any;
 
  menu:any={parentmenu:[],submenu:[],childmenu:[]};
  parentmenu: any = {};
  submenu: any = {};
  subpersubmeny: any = {};

  constructor(  private rest: RestapiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private passData: PassdataService,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {

    let data=this.passData.getJSONData();
    this.profileData=this.passData.getJSONData();
    console.log('view profile Data== : '+JSON.stringify(this.profileData.profiletype));
 
    const postData = {
      MKCK :this.profileData.profiletype
  
    };

    this.rest.sendPostRequest('getparentMenus', JSON.stringify(postData))
    .subscribe(
      res => this.GetRespParentMenus(res),
      error => this.GetErrorParentMenus(error));
  }


 //Getting Response For Add Depot
 GetRespParentMenus(resp) {
  console.log('Getting Response Forparentmenu : ' + JSON.stringify(resp));
  if ( resp.RESP_STATUS === 'SUCCESS' ) {
     this.parentmenu=resp.RESP_DESC;
     this.profileData.menuids.forEach(element => {
  

     for(let p of this.parentmenu.parent){
      if(p.PARENTID===element){
       p.FLAG=true;
      }
    }



    

      for(let s of this.parentmenu.sub){
        if(s.SUBMENUID===element){
          s.FLAG=true;
        }
      }

        for(let cm of this.parentmenu.undersub){
          if(cm.SUPERMENUID===element){
            cm.FLAG=true;
          }
        }
      });




    }
}
 GetErrorParentMenus(error) {
  console.log('Getting Error For parentmenu : ' + JSON.stringify(error));

}

addAuthProfile()
{
  const postData = {
   };
   const subUrl='authdeauthDeleteProfile?profileid='+this.profileData.profileid+'&purpose='+'auth';
    //Sending The Added Values For Product
   console.log('Sending The Auth Values For Profile :' + JSON.stringify(postData));
   this.rest.sendPostRequest(subUrl, JSON.stringify(postData))
     .subscribe(
       res => this.GetRespaddProfile(res),
       error => this.GetErroraddProfile(error)); 
 }


 
 addDeAuthProfile()
{
  const postData = {
   };
   const subUrl='authdeauthDeleteProfile?profileid='+this.profileData.profileid+'&purpose='+'deauth';
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
   console.log('Profile Auth Successfully');
   setTimeout(() => {
     this.toastr.clear();
   }, 2500);
   setTimeout(() => {
     this.router.navigate(['/layout/profile']);
     console.log('Navigate to Profile');
   }, 3000);
 } else {
   console.log('Failed For Add Profile');
   this.toastr.error(resp.RESP_DESC);
 }
}
//Getting Error For Add Profile
GetErroraddProfile(error) {
 console.log('Getting Error for Add Product : ' + JSON.stringify(error));


}
}
