import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { RestapiService } from '../../services/restapi.service';
import { PassdataService } from '../../services/passdata.service';

@Component({
  selector: 'app-viewdeleteauthorizesupplier',
  templateUrl: './viewdeleteauthorizesupplier.component.html',
  styleUrls: ['./viewdeleteauthorizesupplier.component.css']
})
export class ViewdeleteauthorizesupplierComponent implements OnInit {
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
    console.log('delete authorize Data : ' + JSON.stringify(data));
  }

  // validating the delete authorize the supplier
  deleteauthroizesupplier(c) {
    console.log(' validating the delete authroizesupplier data' + JSON.stringify(c));
    let supplierid;
    let depotid;
    let suppliername;
    for (let i of c) {
      supplierid = i.SUPPLIER_ID;
      depotid = i.DEPOT_ID;
      suppliername = i.SUPPLIER_NAME;
}
    const postData = {
      supplierid: supplierid,
      depotid: depotid,
      suppliername: suppliername,
      authdeauth: 'A'
    };
    console.log('delete authorize supplier data: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('deletesupplierchecker', JSON.stringify(postData))
      .subscribe(
        res => this.getauthsupplierResp(res),
        error => this.getauthsupplierError(error));
  }

  //Getting Response for delete Authorize the  supplier
  getauthsupplierResp(resp) {
    console.log('Get authDepotResp : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('delete supplier Authorized Successfully');
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
  // validating the delete De-Authorize the  supplier
  deleteDeauthroizesupplier(c) {
    console.log('Validating the deleteDeauthroizesupplier data' + JSON.stringify(c));

    let supplierid;
    let depotid;
    let suppliername;
    for (let i of c) {
      supplierid = i.SUPPLIER_ID;
      depotid = i.DEPOT_ID;
      suppliername = i.SUPPLIER_NAME;
    }
    const postData = {
      supplierid: supplierid,
      depotid: depotid,
      suppliername:suppliername,
      authdeauth: ''
    };
    console.log('Delete De-authorize supplier data: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('deletesupplierchecker', JSON.stringify(postData))
      .subscribe(
        res => this.getdeauthsupplierResp(res),
        error => this.getdeauthsupplierError(error));
  }

  //Getting Response for delete deauthorize the  supplier
  getdeauthsupplierResp(resp) {
    console.log('getdeauthsupplierResp : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('delete supplier De-Authorized Successfully');
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

