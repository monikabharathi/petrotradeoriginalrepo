import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-deleteauthorizedepot',
  templateUrl: './deleteauthorizedepot.component.html',
  styleUrls: ['./deleteauthorizedepot.component.css']
})
export class DeleteauthorizedepotComponent implements OnInit {
  config: any;
  filter:any;
  collection = {data:[]};
  depotlist : any [ ] ;
  listcall: any;
  loading:boolean=true;

  constructor(
    private rest: RestapiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private passData: PassdataService
    ) { }
    
 ngOnInit() {
   
    this.getdepotlist();
    this.spinner.show(); 
  }
  // Get Waiting For Delete Authorize Depot List
  getdepotlist(){
    let postData= {
      listcall:'DELETE'
    };
    //Sending Request For Get Waiting For Delete Authorize Depot List
    console.log(' Sending Request For Get Waiting For Delete Authorize Depot List : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('getdepotlist',JSON.stringify(postData))
      .subscribe(
        res => this.GetRespAuthDepot(res),
        error => {
          this.GetErrorAuthDepot(error);
          this.spinner.hide();
        });
  }
//Get Rrsponse For Waiting For Delete  Authorize Depot List
  GetRespAuthDepot(resp){
    this.depotlist=resp;
    console.log('Get Response For Waiting For Delete Authorize Depot List: '+JSON.stringify(resp));
    this.initPagination();
    setTimeout(()=>{
      this.loading=false;
      this.spinner.hide();
    },100);
  }
  //Get Error For Waiting For Delete Authorize Depot List
  GetErrorAuthDepot(error){
    console.log('Get Error For Waiting For Delete Authorize Depot List: '+JSON.stringify(error));
  }
  //view the particular Delete authorize Depot value
  ViewDeleteAuthorizeDepot ( data ){

    console.log('view delete authorize particular Depot value : ' + JSON.stringify(data));
    let postData = {
     listcall:'DELETEVIEW',
     depotid:data.DEPOT_ID
   };
   console.log('send particular delete autorize Depot value : ' + JSON.stringify(postData));
  this.rest.sendPostRequest('getdepotlist ', JSON.stringify(postData))
   .subscribe(
     res => this.getdepotrespview(res),
     error => this.getError1(error));
}
getdepotrespview(resp) {
 this.passData.setJSONData(resp);
console.log('getdepotrespview: ' + JSON.stringify(resp));
  this.router.navigate(['/layout/viewdeleteauthorizedepot']);
}
getError1(error) {
 console.log(error);
}

  //pagination 
  initPagination(){
    this.collection.data=this.depotlist;
    console.log('Pagination Data showing Depot data : '+JSON.stringify(this.collection.data));
    if(this.collection.data!=null){
    this.config = {
      itemsPerPage:10,
      currentPage: 1,
      totalItems: this.depotlist.length
    };
  }
 }
 pageChanged(event){
    this.config.currentPage = event;
  }
//pagination ended
}
