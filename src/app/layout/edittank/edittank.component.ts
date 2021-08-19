import { Component, OnInit,TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { PassdataService } from '../../services/passdata.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-edittank',
  templateUrl: './edittank.component.html',
  styleUrls: ['./edittank.component.css']
})
export class EdittankComponent implements OnInit {
  msg: any;
  mysubmit : any;
  modalRef: BsModalRef;
  config1 = {
    keyboard: true
  };
  depotlist = [];
  tanklist = [];
  tankname :[];
  productlist = [];
  ullagelist = [];
  ullage: any = {};
  form:any;
  selectedTank: any = [];
  maxvalue: any;
  minvalue: any;
  constructor(
    private router: Router,
    private rest: RestapiService,
    private toastr: ToastrService,
    private passData: PassdataService,
    private modalService: BsModalService
  ) { }
  showAlert(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.config1);
  }
  ngOnInit() {
   this.mysubmit=false;
    this.tankstatuslist();
    let data=this.passData.getJSONData();
    this.ullagelist=this.passData.getJSONData();
    console.log('edit tank Data : '+JSON.stringify(data));
 
    this.ullage.depotname=data.DEPOT_NAME;
    this.ullage.productname=data.PRODUCT_NAME;
    this.ullage.depotid=data.DEPOT_ID;
    this.ullage.productid=data.PRODUCT_ID;
    this.ullage.tankname=data.TANK_NAME;
    this.ullage.maxvalue=data.MAX_VALUE;
    this.ullage.minvalue=data.MIN_VALUE;
    this.ullage.tankstatus=data.TANK_STATUS;
    this.ullage.tankid=data.TANK_ID;
   
  
  }

 



//getting the tankstatuslist  for supplier add
tankstatuslist() {
  let postData = {
  };
  //sending request for depot list
  console.log(' send tankstatus for ullage : ' + JSON.stringify(postData));
  this.rest.sendPostRequest('tankstatus', JSON.stringify(postData))
    .subscribe(
      res => this.gettankstatusResp(res),
      error => this.getErrortank(error));
}
//getting response for depot
gettankstatusResp(resp) {
  this.tanklist = resp;
  console.log('tanklist for ullage: ' + JSON.stringify(resp));
}
getErrortank(error) {
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
  console.log(error);
}
//getting the productlist for ullage based on depot selection
getproductlistfordepot(depotid: string): void {
  console.log("depot id for selction-->" + depotid);
  let postData = {
    depotid: depotid,
    listcall: 'PRODLINKDEPOT'
  };
  console.log('send depotid for productlist in ullage : ' + JSON.stringify(postData));
  this.rest.sendPostRequest('homeproductlist', JSON.stringify(postData))
    .subscribe(
      res => this.getproductresp(res),
      error => this.getErrorullage(error));
}


//getting product response based on depot name selection
getproductresp(resp) {
  this.productlist = resp;
  console.log('productlist for ullage: ' + JSON.stringify(resp));
}
getErrorullage(error) {
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
  console.log(error);
}

validateullage(f: NgForm,DeleteAlert) {
  console.log('Validate the Add ullage');
  console.log('depotname : ' + this.ullage.depotid);
  console.log('productname : ' + this.ullage.productid);
  console.log('tankname : ' + this.ullage.tankname);
  console.log('tankstatus : ' + this.ullage.tankstatus);
  console.log('maxvalue : ' + this.ullage.maxvalue);
  console.log('minvalue : ' + this.ullage.minvalue); 
  console.log('tankid : ' + this.ullage.tankid);
  this.selectedTank.push(this.ullage.tankid);
 
 
  var maxvalue = parseInt(this.ullage.maxvalue);
  var minvalue =  parseInt(this.ullage.minvalue);
      var check=  minvalue >= maxvalue;
      console.log("check----> "+check); 
     //// alert("  this.minvalue----> "+ minvalue);
     // alert("  this.maxvalue----> "+ maxvalue);
     // alert("check----> "+check);
     
    if (minvalue >= maxvalue) {
       // alert('min value is grater than Max value');
        this.showAlert(DeleteAlert);
        this.maxvalue='';
        this.minvalue='';
        this.ullage.maxvalue='';
        this.ullage.minvalue='';
      }
  
 
 else{
  const postData = {
    depotname: this.ullage.depotname,
    productname: this.ullage.productname,
    tankname: this.ullage.tankname,
    tankstatus: this.ullage.tankstatus,
    maxvalue: this.ullage.maxvalue,
    minvalue: this.ullage.minvalue,
    tankid: this.selectedTank
  };
  this.mysubmit=true;

  console.log('sending a edit ullage Data :' + JSON.stringify(postData));
  this.rest.sendPostRequest('editullage', JSON.stringify(postData))
    .subscribe(
      res => this.getlinksupplierresp(res),
      error => this.getError(error));
}
}
//Getting Response for add ullage
getlinksupplierresp(resp) {
  console.log('getproductresp : ' + JSON.stringify(resp));
  if (resp.RESP_STATUS === 'SUCCESS') {
    this.toastr.success(resp.RESP_DESC);
    console.log('ullage Added Successfully');
    setTimeout(() => {
      this.toastr.clear();
    }, 2500);
    setTimeout(() => {
      this.router.navigate(['/layout/ullage']);
      console.log('Navigate to ullage');
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
