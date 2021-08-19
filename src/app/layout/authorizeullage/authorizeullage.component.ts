import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-authorizeullage',
  templateUrl: './authorizeullage.component.html',
  styleUrls: ['./authorizeullage.component.css']
})
export class AuthorizeullageComponent implements OnInit {
  config: any;
  collection = { data: [] };
  ullagelist : any [ ] ;
  listcall: any;
  filter:any;
  loading:boolean=true;
  selectedTank: any = [];
  constructor(
    private rest: RestapiService,
    private passData: PassdataService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) { }
 ngOnInit() {

    console.log('Get waiting for authorize ullage list ');
    this.getullagelist();
    this.spinner.show(); 
  }
  //Get waiting for authorize product list
  getullagelist(){
    let postData= {
      listcall:'AUTHORIZE'
    };
    console.log(' authorize ullage list : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homeullagelist',JSON.stringify(postData))
      .subscribe(
        res => this.getproductauthResp(res),
        error => {
          this.getError(error);
          this.spinner.hide();
        });
  }

  getproductauthResp(resp){
    this.ullagelist=resp;
    console.log('Get all waiting authorize ullage list values: '+JSON.stringify(resp));
    this.initPagination();
    setTimeout(()=>{
      this.loading=false;
      this.spinner.hide();
    },200);
  }
  getError(error){
    console.log(error);
  }
  //view the particular Authorize Depot value
  viewauthorizetank ( data ){
    console.log('view authorize particular Product value : ' + JSON.stringify(data));
    this.selectedTank.push(data.TANK_ID)
    let postData = {
      listcall:'AUTHORIZEVIEW',
      productid:data.PRODUCT_ID,
      depotid:data.DEPOT_ID,
      tankid: this.selectedTank,
      flag:data.FLAG
    };
    console.log(' send particular ullage value : ' + JSON.stringify(postData));
   this.rest.sendPostRequest('homeullagelist ', JSON.stringify(postData))
    .subscribe(
      res => this.getproductrespview(res),
      error => this.getError1(error));
}
getproductrespview(resp) {
  this.passData.setJSONData(resp);
  console.log('getproductrespview: ' + JSON.stringify(resp));
   this.router.navigate(['/layout/viewauthorizeullage']);
}
getError1(error) {
  console.log(error);
}
 //pagination 
  initPagination(){
    this.collection.data=this.ullagelist;
    console.log('pagination Data of authorized ullagelist: '+JSON.stringify(this.collection.data));
    if(this.collection.data!=null){
    this.config = {
      itemsPerPage:10,
      currentPage: 1,
      totalItems:this.ullagelist.length
    };
  }
   }
 pageChanged(event){
    this.config.currentPage = event;
  }
  //pagination ended
}
