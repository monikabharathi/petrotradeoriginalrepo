import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-authorizeproduct',
  templateUrl: './authorizeproduct.component.html',
  styleUrls: ['./authorizeproduct.component.css']
})
export class AuthorizeproductComponent implements OnInit {
  config: any;
  filter:any;
  collection = { data: [] };
  productlist : any [ ] ;
  listcall: any;
  loading:boolean=true;
  constructor(
    private rest: RestapiService,
    private passData: PassdataService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) { 
    
  }

  ngOnInit() {

    console.log('Get waiting for authorize product list ');
    this.getproductlist();
    this.spinner.show();
  }
  //Get waiting for authorize product list
  getproductlist(){
    let postData= {
      listcall:'AUTHORIZE'
    };
    console.log(' authorize product list : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homeproductlist',JSON.stringify(postData))
      .subscribe(
        res => this.getproductauthResp(res),
        error => {
          this.getError(error);
          this.spinner.hide();
        });
  }

  getproductauthResp(resp){
    this.productlist=resp;
    console.log('Get all waiting authorize product list values: '+JSON.stringify(resp));
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
  viewauthorizeproduct ( data ){
    console.log('view authorize particular Product value : ' + JSON.stringify(data));
     let postData = {
      listcall:'VIEW',
      productid:data.PRODUCT_ID
    };
    console.log(' send particular product value : ' + JSON.stringify(postData));
   this.rest.sendPostRequest('homeproductlist ', JSON.stringify(postData))
    .subscribe(
      res => this.getproductrespview(res),
      error => this.getError1(error));
}
getproductrespview(resp) {
  this.passData.setJSONData(resp);
console.log('getproductrespview: ' + JSON.stringify(resp));
   this.router.navigate(['/layout/viewauthorizeproduct']);
}
getError1(error) {
  console.log(error);
}






   //pagination 
  initPagination(){
    this.collection.data=this.productlist;
    console.log('pagination Data of authorized product: '+JSON.stringify(this.collection.data));
    if(this.collection.data!=null){
    this.config = {
      itemsPerPage:10,
      currentPage: 1,
      totalItems:this.productlist.length
    };
  }
   }
 pageChanged(event){
    this.config.currentPage = event;
  }
  //pagination ended
}
