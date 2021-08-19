import { Component, OnInit,TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-addullage',
  templateUrl: './addullage.component.html',
  styleUrls: ['./addullage.component.css']
})
export class AddullageComponent implements OnInit {
  msg: any;
  mysubmit : any;
  modalRef: BsModalRef;
  config1 = {
    keyboard: true
  };
  depotlist = [];
  tanklist = [];
  tankname: [];
  config: any;
  filter: any;
  historicdata: [];
  productlist = [];
  ullage: any = {};
  depotid: any;
  data: any;
  form: any;
  value: any;
  collection = { data: [] };
  maxvalue: any;
  minvalue: any;
  constructor(
    private router: Router,
    private rest: RestapiService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.mysubmit=false;
    this.getdepotlist();
    this.tankstatuslist();
  }
  

  showAlert(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.config1);
  }
  //Getting DepotList For Add Ullage
  getdepotlist() {
    let postData = {
      listcall: ''
    };
    //sending request for Getting DepotList For Add Ullage
    console.log(' sending request for Getting DepotList For Add Ullage: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('authorizeddepotlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespDepot(res),
        error => this.GetErrorDepot(error));
  }
  //getting response for  Getting DepotList For Add Ullage
  GetRespDepot(resp) {

    this.depotlist = resp;

    
    console.log('getting response for  Getting DepotList For Add Ullage: ' + JSON.stringify(resp));
  }
  //getting Error for  Getting DepotList For Add Ullage
  GetErrorDepot(error) {
    console.log('getting Error for  Getting DepotList For Add Ullage: ' + JSON.stringify(error));
  }

  //Getting TankStatuslist For AddLinkSupplier
  tankstatuslist() {
    let postData = {
    };
    //sending request for Getting TankStatuslist For AddLinkSupplier
    console.log(' sending request for Getting TankStatuslist For AddLinkSupplier : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('tankstatus', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespTankStatus(res),
        error => this.GetErrorTankStatus(error));
  }
  //getting response for Getting TankStatuslist For AddLinkSupplier
  GetRespTankStatus(resp) {
    this.tanklist = resp;
    console.log('getting response for Getting TankStatuslist For AddLinkSupplier: ' + JSON.stringify(resp));
  }
  //getting Error for Getting TankStatuslist For AddLinkSupplier
  GetErrorTankStatus(error) {
    console.log('getting Error for Getting TankStatuslist For AddLinkSupplier: ' + JSON.stringify(error));
  }

  //Getting TankName Based On DepotName Selection
  gettankname(depotid: string): void {
    console.log("gettankname for selction- depotid->" + depotid);
    this.depotid = depotid
    let postData = {
      depotid: depotid
    };
    //send Request Getting TankName Based On DepotName Selection :
    console.log('send Request Getting TankName Based On DepotName Selection : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('tankname', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespTankName(res),
        error => this.GetErrorTankName(error));
  }

  //Response for Getting TankName Based On DepotName Selection :
  GetRespTankName(resp) {
    this.tankname = resp;
    console.log('Response for Getting TankName Based On DepotName Selection :: ' + JSON.stringify(resp));
    // let tankname;
    this.ullage.tankname = resp.RESP_STATUS;

  }
  //Error for Getting TankName Based On DepotName Selection ::
  GetErrorTankName(error) {
    console.log('Error for Getting TankName Based On DepotName Selection :: ' + JSON.stringify(error));
  }


  historicproductid(productid: string): void {
    console.log("  historicproductid:" + productid);
    let postData = {
      listcall: 'VIEWEDIT',
      productid: productid,
      depotid: this.depotid
    };
    console.log('send data for historic view : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homeullagelist', JSON.stringify(postData))
      .subscribe(
        res => this.getResphistoric(res),
        error => this.getErrorhistoric(error));
  }

  //getting historicproductid response based on depot name selection
  getResphistoric(resp) {
    this.historicdata = resp;
    console.log('historic view in ullage: ' + JSON.stringify(this.historicdata));
    this.value = resp.length;
    console.log('this.value: ' + this.value);
    this.initPagination();
  }
  hideTankdetails() {
    this.value = 99;
  }
  getErrorhistoric(error) {
    console.log(error);
  }
  //pagination start
  initPagination() {
    this.collection.data = this.historicdata;
    console.log('Pagination Data showing Depot data : ' + JSON.stringify(this.collection.data));
    if (this.collection.data != null) {
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.historicdata.length
      };
    }
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  //pagination ended


  //Getting the productlist for ullage based on depot selection
  getproductlistfordepot(depotid: string): void {
    this.productlist = null;
    this.ullage.productname = null;
    console.log("depot id for selction-->" + depotid);
    let postData = {
      depotid: depotid,
      listcall: 'PRODLINKDEPOT'
    };
    //Sending Request Getting the productlist for ullage based on depot selection
    console.log('Sending Request Getting the productlist for ullage based on depot selection: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homeproductlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespProduct(res),
        error => this.GetErrorProduct(error));
  }
  //Response for Getting the productlist for ullage based on depot selection
  GetRespProduct(resp) {
    this.productlist = resp;
    this.value = 99;

    //alert(this.productlist.length)
    if( this.productlist.length===0)
    {
      
    this.toastr.error("No Products Are Configured With Selected Depot !!! ");
    setTimeout(() => {
      this.toastr.clear();
    }, 2000);

    }
    console.log('Response for Getting the productlist for ullage based on depot selection ' + JSON.stringify(resp));
  }
  //Error for Getting the productlist for ullage based on depot selection
  GetErrorProduct(error) {
    console.log('Error for Getting the productlist for ullage based on depot selection ' + JSON.stringify(error));
  }
 //Getting Values For Add Ullage After Submit
  validateullage(f: NgForm,DeleteAlert) {
    console.log('Getting Values For Add Ullage After Submit');
    console.log('depotname : ' + this.ullage.depotname);
    console.log('productname : ' + this.ullage.productname);
    console.log('tankname : ' + this.ullage.tankname);
    console.log('tankstatus : ' + this.ullage.tankstatus);
    console.log('maxvalue : ' + this.ullage.maxvalue);
    console.log('minvalue : ' + this.ullage.minvalue);

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
      minvalue: this.ullage.minvalue
    };
    this.mysubmit=true;

    //sending Added Values For Ullage
    console.log('sending Added Values For Ullage :' + JSON.stringify(postData));
    this.rest.sendPostRequest('addUllage', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespAddUllage(res),
        error => this.GetErrorAddUllage(error));
  }
}
  //Getting Response for add ullage
  GetRespAddUllage(resp) {
    console.log('Getting Response for add ullage: ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.maxvalue='';
      this.minvalue='';
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
      console.log('Failed ullage Added ');
      this.toastr.error(resp.RESP_DESC);
    }
  }
  // Getting Error for add ullage
  GetErrorAddUllage(error) {
    this.maxvalue='';
    this.minvalue='';
    console.log(' Getting Error for add ullage' + JSON.stringify(error));
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
  } 
}

