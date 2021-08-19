import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { RestapiService } from '../../services/restapi.service';
import { PassdataService } from '../../services/passdata.service';

@Component({
  selector: 'app-viewauthorizesupplier',
  templateUrl: './viewauthorizesupplier.component.html',
  styleUrls: ['./viewauthorizesupplier.component.css']
})
export class ViewauthorizesupplierComponent implements OnInit {
  supplierlist: any;
  res: any;
  constructor(
    private passData: PassdataService,
    private router: Router,
    private rest: RestapiService,
    private toastr: ToastrService,

  ) { }

  ngOnInit() {

    let data = this.passData.getJSONData();
    this.supplierlist = this.passData.getJSONData();
    console.log('Data : ' + JSON.stringify(data));
  }

  // validating the authorize the supplier
  authroizesupplier(c) {
    console.log(' validating the authroizesupplier data' + JSON.stringify(c));
    let supplierid;
    let depotid;
   
    for(let i of c){
      supplierid=i.SUPPLIER_ID;
      depotid=i.DEPOT_ID;
     }
    const postData = {
      supplierid: supplierid,
      depotid:depotid,
       authdeauth: 'A'
    };
    console.log('Add authorize supplier data: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('authdeauthsupplier', JSON.stringify(postData))
      .subscribe(
        res => this.getauthsupplierResp(res),
        error => this.getauthsupplierError(error));
  }

  //Getting Response for Authorize the add supplier
  getauthsupplierResp(resp) {
    console.log('Get authDepotResp : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('supplier Authorized Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/supplier']);
        console.log('Navigate to supplier');
      }, 3000);
    } else {
      this.toastr.error(resp.RESP_DESC);
    }
  }

  //error
  getauthsupplierError(error) {
    console.log('ErrorOccured authorized product : ' + JSON.stringify(error));
  }
  // validating the De-Authorize the Add supplier
  Deauthroizesupplier(c) {
    console.log('Validating the Deauthroizesupplier data' + JSON.stringify(c));
   
    let supplierid;
    let depotid;
   
    for(let i of c){
      supplierid=i.SUPPLIER_ID;
      depotid=i.DEPOT_ID;
     }
    const postData = {
      supplierid: supplierid,
      depotid:depotid,
       authdeauth: ''
    };
    console.log('Add De-authorize supplier data: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('authdeauthsupplier', JSON.stringify(postData))
      .subscribe(
        res => this.getdeauthsupplierResp(res),
        error => this.getdeauthsupplierError(error));
  }

  //Getting Response for authorize the add supplier
  getdeauthsupplierResp(resp) {
    console.log('getdeauthsupplierResp : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('supplier De-Authorized Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/supplier']);
        console.log('Navigate to supplier');
      }, 3000);
    } else {
      this.toastr.error(resp.RESP_DESC);
    }
  }
  //error
  getdeauthsupplierError(error) {
    console.log('ErrorOccured De-authorized suplier : ' + JSON.stringify(error));
  }
}

