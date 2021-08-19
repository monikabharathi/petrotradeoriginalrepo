import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aauthorizeprofile',
  templateUrl: './authorizeprofile.component.html',
  styleUrls: ['./authorizeprofile.component.css']
})
export class AuthorizeprofileComponent implements OnInit {
  filter:any;
  config: any;
  parentmenu: any = {};
  collection = { data: [] };
  profilelist : any [ ] ;
  listcall: any;
  loading:boolean=true;
  constructor( private rest: RestapiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private passData: PassdataService,
    private toastr: ToastrService,) { }

  ngOnInit() {
  this.getProfileAuthrized();
  }
  getProfileAuthrized(){
    let postData= {
    };
    console.log(' Sending Request Get waiting for authorize depot list : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('listofprofileWatingforauth',JSON.stringify(postData))
      .subscribe(
        res => this.GetRespProfilesActive(res),
        error => {
          this.GetErrorProfilesActive(error);
          this.spinner.hide();
        });
     
  }
//Response for waiting authorize depot list
GetRespProfilesActive(resp){
  /* if (resp.RESP_STATUS === 'SUCCESS') { */
    this.profilelist=resp.RESP_DESC;
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
  console.log('Error for waiting authorize depot list: '+JSON.stringify(error));
}






 //pagination 
initPagination(){
  this.collection.data=this.profilelist;
  console.log('pagination Data of authorized profile: '+JSON.stringify(this.collection.data.length));
  if(this.collection.data!=null){
  this.config = {
    itemsPerPage:10,
    currentPage: 1,
    totalItems:this.profilelist.length
  };
}
 }


 pageChanged(event) {
  this.config.currentPage = event;
}
 ViewAuthProfile(data) {
  
  this.passData.setJSONData(data);
  console.log('getProfileViewrespview: ' + JSON.stringify(data));
  this.router.navigate(['/layout/viewauthorizeprofile']);
 }


}
