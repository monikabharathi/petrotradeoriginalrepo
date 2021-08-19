import { Component, OnInit } from '@angular/core';
import { PassdataService } from '../../services/passdata.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestapiService } from '../../services/restapi.service';

@Component({
  selector: 'app-deletesupplier',
  templateUrl: './deletesupplier.component.html',
  styleUrls: ['./deletesupplier.component.css']
})
export class DeletesupplierComponent implements OnInit {
  supplierlist: any;
mysubmit : any;
  res: any;
  constructor(
    private passData: PassdataService,
    private router: Router,
     private rest: RestapiService,
   private toastr: ToastrService
  ) {
    
   }

  ngOnInit() {
    this.mysubmit=false;
     let data = this.passData.getJSONData();
    this.supplierlist = this.passData.getJSONData();
    console.log('deleted Data for supplier: ' + JSON.stringify(data));
  }
//validating the delete supplier
deletesupplier(c) {
  this.mysubmit=true;
  let supplierid; 
  let depotid;
let suppliername;
  for(let i of c){
    supplierid=i.SUPPLIER_ID;
    depotid=i.DEPOT_ID;
    suppliername=i.SUPPLIER_NAME;
  }
  const postData = {
    supplierid: supplierid,
    depotid:depotid,
    suppliername:suppliername
}
  console.log('Deleted supplier Data : ' + JSON.stringify(postData));
  this.rest.sendPostRequest('deletesuppliermaker', JSON.stringify(postData))
    .subscribe(
      res => this.getDeletesupplierResp(res),
      error => this.getError(error));
}
//  Getting the response for the delete supplier
getDeletesupplierResp(resp) {
  console.log('getDeletesupplierResp : ' + JSON.stringify(resp));
  if (resp.RESP_STATUS === 'SUCCESS') {
    this.toastr.success(resp.RESP_DESC);
    console.log('supplier Deleted Successfully');
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

