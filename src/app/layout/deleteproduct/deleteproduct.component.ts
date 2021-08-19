import { Component, OnInit } from '@angular/core';
import { PassdataService } from '../../services/passdata.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestapiService } from '../../services/restapi.service';
@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
  styleUrls: ['./deleteproduct.component.css']
})
export class DeleteproductComponent implements OnInit {
  productlist: any;
  depotName: any;
  res: any;
  mysubmit : any;
  constructor(
 private passData: PassdataService,
     private router: Router,
private rest: RestapiService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
this.mysubmit=false;
    let data = this.passData.getJSONData();
    this.productlist = this.passData.getJSONData();
    console.log('Data : ' + JSON.stringify(data));
  }

  //validating the delete product
  deleteproduct(c) {
    this.mysubmit=true;
    let productid;
    let productname;
    for(let i of c){
      productid=i.PRODUCT_ID;
      productname=i.PRODUCT_NAME;
    }
    const postData = {
      productid: productid,
      productname: productname
    }
    console.log('Deleted product Data : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('deleteproductmaker', JSON.stringify(postData))
      .subscribe(
        res => this.getDeleteProductResp(res),
        error => this.getError(error));
  }
  //  Getting the response for the delete product
  getDeleteProductResp(resp) {
    console.log('getDeleteProductResp : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('product Deleted Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/product']);
        console.log('Navigate to Depot');
      }, 3000);
    } else {
      this.toastr.error(resp.RESP_DESC);
    }
  }
  getError(error) {
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
    console.log('ErrorOccured : ' + JSON.stringify(error));
  }

}

