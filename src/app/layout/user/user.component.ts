import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PassdataService } from '../../services/passdata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  filter:any;
  config: any;
  parentmenu: any = {};
  collection = { data: [] };
  userlist : any [ ] ;
  listcall: any;
  loading:boolean=true;

   //maker
   deletevisiable: any;
   editvisiable: any;
   addvisiable: any;
 //both
   viewvisiable: any;
  //checker
   deleteauthvisiable: any;
   authprofilevisiable: any
   menuactions: any;
  constructor( private rest: RestapiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private passData: PassdataService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.getProfileAuthrized();

    this.menuactions = JSON.parse(localStorage.getItem('MENUSACTIONS'));

    console.log("MenusActions :: "+JSON.stringify(this.menuactions.undersub));
    
    
    this.deletevisiable=false;
    this.editvisiable=false;
    this.viewvisiable=false;
    this.addvisiable=false;
    
    
    this.deleteauthvisiable=true;
    this.authprofilevisiable=true;
    
    
    
    
    
    for (let unaction of this.menuactions.undersub) {
    if (unaction.SUBMENUID === '00201' && unaction.SUPERMENUID==='0020101' && unaction.FLAG===false) {
    
    //add profile
    this.addvisiable=true;
    
    }
    if (unaction.SUBMENUID === '00201' && unaction.SUPERMENUID==='0020102' && unaction.FLAG===false) {
    
    //edit profile
    this.editvisiable=true;
    
    }
    if (unaction.SUBMENUID === '00201' && unaction.SUPERMENUID==='0020103' && unaction.FLAG===false) {
    
    //delete profile
    this.deletevisiable=true;
    
    }
    if (unaction.SUBMENUID === '00201' && unaction.SUPERMENUID==='0020104'&& unaction.FLAG===false) {
    
    
    //view profile
    this.viewvisiable=true;
    
    }
    
    }

/* 
 if(localStorage.getItem('USERTYPE')==='B')
    {
      this.deletevisiable=false;
      this.editvisiable=false;
      this.viewvisiable=false;
      this.addvisiable=false;
  
  
  
    this.deleteauthvisiable=true;
    this.authprofilevisiable=true;
    }
  else{
    this.viewvisiable=false;
    this.deleteauthvisiable=false;
    this.authprofilevisiable=false;
  
  
    this.deletevisiable=true;
      this.editvisiable=true;
      this.addvisiable=true;
  } */

  
  this.spinner.show(); 
  setTimeout(()=>{
    this.loading=false;
    this.spinner.hide();
  },2500);
  
  }
  getProfileAuthrized(){
    let postData= {
    };
    console.log(' Sending Request Get waiting for authorize User list : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('gettingactiveusers',JSON.stringify(postData))
      .subscribe(
        res => this.GetRespProfilesActive(res),
        error => {
          this.GetErrorProfilesActive(error);
          this.spinner.hide();
        });
     
  }
//Response for waiting authorize user  list
GetRespProfilesActive(resp){
  /* if (resp.RESP_STATUS === 'SUCCESS') { */
    this.userlist=resp.RESP_DESC;
    //alert('Data : '+JSON.stringify(resp.RESC_DESC));
    console.log('Response for waiting authorize profile list: '+JSON.stringify(resp));
    this.initPagination();
    setTimeout(()=>{
      this.loading=false;
      this.spinner.hide();
    },200);

 /*  }
  else{
    //this.profilelist=resp.RESP_DESC;
    this.toastr.error(resp.RESP_DESC);
    //this.initPagination();
    setTimeout(()=>{
      this.loading=false;
      this.spinner.hide();
    },200);
 */
 // }

 
}
//Error for waiting authorize depot list
GetErrorProfilesActive(error){
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
  console.log('Error for waiting authorize depot list: '+JSON.stringify(error));
}






 //pagination 
initPagination(){
  this.collection.data=this.userlist;
  console.log('pagination Data of authorized profile: '+JSON.stringify(this.collection.data));
  if(this.collection.data!=null){
  this.config = {
    itemsPerPage:10,
    currentPage: 1,
    totalItems:this.userlist.length
  };
}
 }
 pageChanged(event) {
  this.config.currentPage = event;
}

 ViewUser(data) {
  
  this.passData.setJSONData(data);
  console.log('getProfileViewrespview: ' + JSON.stringify(data));
  this.router.navigate(['/layout/viewuser']);
 }

 
 DeleteUser(data) {
  
  this.passData.setJSONData(data);
  console.log('getProfile deleteprofile : ' + JSON.stringify(data));
  this.router.navigate(['/layout/deleteuser']);
 }

 EditUser(data) {
  
  this.passData.setJSONData(data);
  console.log('getProfile EditUser : ' + JSON.stringify(data));
  this.router.navigate(['/layout/edituser']);
 }

}
