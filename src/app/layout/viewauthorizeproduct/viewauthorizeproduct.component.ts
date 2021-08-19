import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { PassdataService } from '../../services/passdata.service';
@Component({
  selector: 'app-viewauthorizeproduct',
  templateUrl: './viewauthorizeproduct.component.html',
  styleUrls: ['./viewauthorizeproduct.component.css']
})
export class ViewauthorizeproductComponent implements OnInit {
  productlist: any;
  res: any;
  constructor(
    private passData: PassdataService,
    private router: Router,
    private rest: RestapiService,
    private toastr: ToastrService,

  ) { }

  ngOnInit() {

    let data = this.passData.getJSONData();
    this.productlist = this.passData.getJSONData();
    console.log('Data : ' + JSON.stringify(data));
  }

  // validating the authorize the product
  authroizeproduct(c) {
    console.log(' validating the authroizeproduct data' + JSON.stringify(c));
    let productid;
    let productname;
    for(let i of c){
      productid=i.PRODUCT_ID;
      productname=i.PRODUCT_NAME;
    }
    const postData = {
      productid: productid,
      productname: productname,
      authdeauth: 'A'
    };
    console.log('Add authorize product data: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('Addauthdeauthprod', JSON.stringify(postData))
      .subscribe(
        res => this.getauthproductResp(res),
        error => this.getauthproductError(error));
  }

  //Getting Response for Authorize the add product
  getauthproductResp(resp) {
    console.log('Get authDepotResp : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('product Authorized Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/product']);
        console.log('Navigate to product');
      }, 3000);
    } else {
      this.toastr.error(resp.RESP_DESC);
    }
  }

  //error
  getauthproductError(error) {
    console.log('ErrorOccured authorized product : ' + JSON.stringify(error));
  }
  // validating the De-Authorize the Add Depot
  Deauthroizeproduct(c) {
    console.log('Validating the Deauthroizeproduct data' + JSON.stringify(c));
   
    let productid;
    let productname;
    for(let i of c){
      productid=i.PRODUCT_ID;
      productname=i.PRODUCT_NAME;
    }
    const postData = {
      productid:productid,
      productname: productname,
      authdeauth: ''
    };
    console.log('Add De-authorize product data: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('Addauthdeauthprod', JSON.stringify(postData))
      .subscribe(
        res => this.getdeauthproductResp(res),
        error => this.getdeauthproductError(error));
  }

  //Getting Response for authorize the add product
  getdeauthproductResp(resp) {
    console.log('Get de-authDepotResp : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('product De-Authorized Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/product']);
        console.log('Navigate to product');
      }, 3000);
    } else {
      this.toastr.error(resp.RESP_DESC);
    }
  }
  //error
  getdeauthproductError(error) {
    console.log('ErrorOccured De-authorized product : ' + JSON.stringify(error));
  }
}

