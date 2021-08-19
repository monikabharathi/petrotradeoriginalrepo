import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RestapiService } from '../../services/restapi.service';
import { PassdataService } from '../../services/passdata.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-deleteprofile',
  templateUrl: './deleteprofile.component.html',
  styleUrls: ['./deleteprofile.component.css']
})
export class DeleteprofileComponent implements OnInit {
  profileData: any;
 
  menu:any={parentmenu:[],submenu:[],childmenu:[]};
  parentmenu: any = {};
  submenu: any = {};
  subpersubmeny: any = {};
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
  console.log('Getting Error For parentmenu : ' + JSON.stringify(error));

 }

 deleteProfile()
 
 {
this.mysubmit=true;
   const postData = {
    profileid:this.profileData.profileid
    
   };
    //Sending The delete  Values For Product
   console.log('Sending The deleet  Values For Profile :' + JSON.stringify(postData));
   this.rest.sendPostRequest('deleteProfile', JSON.stringify(postData))
     .subscribe(
       res => this.GetRespdeleteProfile(res),
       error => this.GetErrordeleteProfile(error)); 
 }


//Getting Response for Add Profile
GetRespdeleteProfile(resp) {
 console.log('Getting Response for Add Profile : ' + JSON.stringify(resp));
 if (resp.RESP_STATUS === 'SUCCESS') {
   this.toastr.success(resp.RESP_DESC);
   console.log('Profile deleted Successfully');
   setTimeout(() => {
     this.toastr.clear();
   }, 2500);
   setTimeout(() => {
     this.router.navigate(['/layout/profile']);
     console.log('Navigate to Profile');
   }, 3000);
 } else {
   console.log('Failed For delete Profile');
   this.toastr.error(resp.RESP_DESC);
 }
}
//Getting Error For Add Profile
GetErrordeleteProfile(error) {
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
 console.log('Getting Error for Add Product : ' + JSON.stringify(error));

}





 }







