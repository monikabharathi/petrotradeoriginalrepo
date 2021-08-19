import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-authorizedepot',
  templateUrl: './authorizedepot.component.html',
  styleUrls: ['./authorizedepot.component.css']
})
export class AuthorizedepotComponent implements OnInit {
  filter:any;
  config: any;
  collection = { data: [] };
  depotlist : any [ ] ;
  listcall: any;
  loading:boolean=true;
  constructor(
    private rest: RestapiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private passData: PassdataService,
  
    private toastr: ToastrService,
    ) { 
    
  }
  ngOnInit() {
    this.getdepotlist();
    this.spinner.show(); 
  }
  //Get waiting for authorize depot list
  getdepotlist(){
    let postData= {
      listcall:'AUTHORIZE'
    };
    //Get waiting for authorize depot list
    console.log(' Sending Request Get waiting for authorize depot list : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('getdepotlist',JSON.stringify(postData))
      .subscribe(
        res => this.GetRespDepotAuth(res),
        error => {
          this.GetErrorDepotAuth(error);
          this.spinner.hide();
        });
  }
//Response for waiting authorize depot list
  GetRespDepotAuth(resp){
    this.depotlist=resp;
    console.log('Response for waiting authorize depot list: '+JSON.stringify(resp));
    this.initPagination();
    setTimeout(()=>{
      this.loading=false;
      this.spinner.hide();
    },200);
  }
  //Error for waiting authorize depot list
  GetErrorDepotAuth(error){
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


 //view the particular Authorize Depot value
 ViewAuthorizeDepot ( data ){
  console.log('view particular authorize Depot value : '+ JSON.stringify(data));
   let postData = {
    listcall:'UNIQUEVIEW',
    depotid: data.DEPOT_ID
  };
  console.log('Sending Request for view particular authorize Depot value : ' + JSON.stringify(postData));
 this.rest.sendPostRequest('getdepotlist ', JSON.stringify(postData))
  .subscribe(
    res => this.GetRespDepotView(res),
    error => this.GetErrorDepotView(error));
}
//Response for view particular authorize Depot value
GetRespDepotView(resp) {
this.passData.setJSONData(resp);
console.log('Response for view particular authorize Depot value: ' + JSON.stringify(resp));
 this.router.navigate(['/layout/viewauthorizedepot']);
}
//Error for view particular authorize Depot value
GetErrorDepotView(error) {
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
  console.log('Error for view particular authorize Depot value: ' + JSON.stringify(error));
}

 //pagination 
initPagination(){
  this.collection.data=this.depotlist;
  console.log('pagination Data of authorized depot: '+JSON.stringify(this.collection.data));
  if(this.collection.data!=null){
  this.config = {
    itemsPerPage:10,
    currentPage: 1,
    totalItems:this.depotlist.length
  };
}
 }
pageChanged(event){
  this.config.currentPage = event;
}
//pagination ended
}
