import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-deleteauthorizeproduct',
  templateUrl: './deleteauthorizeproduct.component.html',
  styleUrls: ['./deleteauthorizeproduct.component.css']
})
export class DeleteauthorizeproductComponent implements OnInit {
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

    console.log('Get waiting for deelte authorize product list ');
    this.getauthdeleteproductlist();
    this.spinner.show(); 
  }
  //Get waiting for authorize product list
  getauthdeleteproductlist(){
    let postData= {
      listcall:'DELETE'
    };
    console.log(' delete authorize product list : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homeproductlist',JSON.stringify(postData))
      .subscribe(
        res => this.getdeleteproductauthResp(res),
        error => {
          this.getError(error);
          this.spinner.hide();
        });
  }

  getdeleteproductauthResp(resp){
    this.productlist=resp;
    console.log('Get all waiting delete authorize product list values: '+JSON.stringify(resp));
    this.initPagination();
    setTimeout(()=>{
      this.loading=false;
      this.spinner.hide();
    },100);
  }
  getError(error){
    console.log(error);
  }
  //view the particular Delete Authorize product value
  viewdeleteauthorizeproduct ( data ){
    console.log('view delete authorize particular Product value : ' + JSON.stringify(data));
     let postData = {
      listcall:'VIEW',
      productid:data.PRODUCT_ID
    };
    console.log('send particular delete autorize product value : ' + JSON.stringify(postData));
   this.rest.sendPostRequest('homeproductlist ', JSON.stringify(postData))
    .subscribe(
      res => this.getproductrespview(res),
      error => this.getError1(error));
}
getproductrespview(resp) {
  this.passData.setJSONData(resp);
console.log('getproductrespview: ' + JSON.stringify(resp));
   this.router.navigate(['/layout/viewdeleteauthorizeproduct']);
}
getError1(error) {
  console.log(error);
}
   //pagination 
  initPagination(){
    this.collection.data=this.productlist;
    console.log('pagination Data of delete authorized product: '+JSON.stringify(this.collection.data));
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
