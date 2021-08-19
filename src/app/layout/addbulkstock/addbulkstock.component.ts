import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestapiService } from '../../services/restapi.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-addbulkstock',
  templateUrl: './addbulkstock.component.html',
  styleUrls: ['./addbulkstock.component.css'],
  providers: [
    DatePipe
  ]
})
export class AddbulkstockComponent implements OnInit {
  msg: any;
  modalRef: BsModalRef;
  config = {
    keyboard: true
  };
  minDate: Date;
  maxDate: Date;
  depotlist = [];
  productlist = [];
  //pustproductlist=[];
  bulkstock: any = {};
  form: any;
  bulkstockdate: any;
  DepotId: any;
  p: any = {};
  //p : any;
  // updatedProductList: any = { productid: [], openingbalance: [], purchase: [], loaded: [], transfer: [], closing: [] };
  // updatedProductList: any={};
  opening: any;
  purchase: any;
  loaded: any;
  transfer: any;
  closing: any;
  total1: any; total2: any; total3: any;
  final: any;
  gl: any = [];
  addvalue: string;
  openingbalance: any;
  isRequired: boolean;
  mysubmit: any;
  ishidecalcel : any;
  constructor(
    private router: Router,
    private rest: RestapiService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private modalService: BsModalService,
  ) 
  {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() );
  }
  showAlert(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
  ngOnInit() {
    this.getdepotlist();
    debugger;
}
  //Getting The Depot List For Add BulkStock
  getdepotlist() {
    let postData = {
      listcall: ''
    };
    //Sending Request For Getting The Depot List For Add BulkStock
    console.log('Sending Request For Getting The Depot List For Add BulkStock: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('authorizeddepotlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespDepot(res),
        error => this.GetErrorDepot(error));
  }
  // Response For Getting The Depot List For Add BulkStock
  GetRespDepot(resp) {
    this.depotlist = resp;
    console.log('Response For Getting The Depot List For Add BulkStock: ' + JSON.stringify(resp));
  }
  // Error For Getting The Depot List For Add BulkStock
  GetErrorDepot(error) {
    console.log('Error For Getting The Depot List For Add BulkStock: ' + JSON.stringify(error));
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
  //Getting The Product List For Add BulkStock Based on DepotidSelection
  getproductlistfordepot(depotid: string): void {
    //this.form.valid='true';
    this.bulkstock.bulkstockDateValue='';
    this.DepotId = depotid;
    console.log("Depotid Selection For ProductList in Add BulkStock" + depotid);
    let postData = {
      depotid: depotid,
};
    //Sending Request For Getting The product List For Add BulkStock 
    console.log('Sending Request For Getting The Product List For Add BulkStock : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('authorizedproductlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespProductListbBulkStock(res),
        error => this.GetErrorProductListBulkStock(error));
  }


  //Getting Response For ProductList To Add BulkStock
  GetRespProductListbBulkStock(resp) {

   // this.pustproductlist=resp;
    this.productlist = resp;
    console.log('Resp :: '+this.productlist.length);

    this.mysubmit="true";
if(this.productlist.length !== 0)
{

    let i=0;
    for(let p of this.productlist) {
      this.gl[i] =' ';

      p.purchase=' ';
      p.loaded=' ';
     p.closing=undefined;
      p.transfer=' ';
      p.openingbalance=' ';
      p.checkboxstatus=false;
      p.flag=true;    
    
  i++;
    }
  }
  else{
    this.toastr.error("No Products Are Configured With Selected Depot !!! ");
    setTimeout(() => {
      this.toastr.clear();
    }, 2000);

  }
   
    console.log('Getting Response For ProductList To Add BulkStock : ' + JSON.stringify(resp));

  }
  //Getting Error For ProductList To Add BulkStock
  GetErrorProductListBulkStock(error) {
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

    console.log('Getting Error For ProductList To Add BulkStock : ' + JSON.stringify(error));
  }
 
  chageeventofcheckbox(date)
  {
    let index=0;
  // alert(date);
 
    for(let p of this.productlist) {
      this.gl[index] =' ';

    //  alert('check  : '+p.checkboxstatus);
      p.purchase=' ';
      p.loaded=' ';
      p.closing=undefined;
      p.transfer=' ';
      p.openingbalance=' ';
      p.checkboxstatus=false;
      p.flag=false;
      index++;
    }
    this.mysubmit=true;

    
  }

  checkBox(p, value,index,productid,DeleteAlert)
  {

   // this.mysubmit="true";
console.log(' this.productlist '+JSON.stringify(this.productlist));
this.mysubmit=true;

    for(let p of this.productlist) {
      
     // alert('status :: '+p.checkboxstatus);
      if(p.checkboxstatus===true)
      {
        this.mysubmit=false;

      }
    
  
    }



 // alert(index+"conditon "+" productid "+productid+"depotid ");
    console.log('depotid : ' + this.bulkstock.depotname);

  /*   console.log('loadeddate : ' + this.datePipe.transform(this.bulkstock.bulkstockDateValue, "yyyy-MM-dd"));
    console.log("Add one more day ");
    console.log(this.datePipe.transform(this.bulkstock.bulkstockDateValue, "yyyy-MM-dd")+1)
 */
    
    if(value===true && this.datePipe.transform(this.bulkstock.bulkstockDateValue, "yyyy-MM-dd") !==null )
    {
      this.mysubmit=true;

      console.log('entered ')
    p.checkboxstatus=true;
    let postData = {
    depotid: this.bulkstock.depotname,
    loadeddate: this.datePipe.transform(this.bulkstock.bulkstockDateValue, "yyyy-MM-dd"),
    prodid:productid  };

    console.log('Sending Request For validation Add BulkStock for openiing bal : ');

     this.rest.sendPostRequest('stockclosinglist', JSON.stringify(postData))
   .subscribe(
       res => this.GetopeningRespvalidation(p,DeleteAlert, res),
       error => this.GetopeningErrorvalidation(p,error));

    }
    else{
      console.log( ' else entered ')

    
      //p.checkboxstatus=false;

     // p.openingbalance='';
    }
    
  }

  GetopeningRespvalidation(prod,template: TemplateRef<any>, resp): void {
    

   


    console.log('Getting Response For validation To Add BulkStock vVALIDATE : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      

      if(resp.CHECK>5)
      {

        alert(resp.VALIDATE);
      }
     this.mysubmit=false;
      prod.openingbalance=resp.RESP_DESC;
    } 
  else  if (resp.RESP_STATUS === 'FAILED') {
    this.mysubmit=false;

      this.showAlert(template);
      prod.checkboxstatus=false;
      prod.openingbalance='';
    } else {
      console.log('success');
      prod.openingbalance='';
      prod.checkboxstatus=false;
     this.showAlert(template);
    }


  }
  GetopeningErrorvalidation(prod,error: any): void {
    throw new Error("Method not implemented.");
  }
  // Getting validation
  Bulkstockdate(Bulkstockdate: Date, DeleteAlert): void {
    console.log('Selected Bulkstockdate in add bulkstock' + this.datePipe.transform(Bulkstockdate, 'yyyy-MM-dd'));
    this.bulkstockdate = this.datePipe.transform(Bulkstockdate, 'yyyy-MM-dd')
    this.DepotId = this.DepotId;
    let postData = {
      depotid: this.DepotId,
      loadeddate: this.bulkstockdate
    };

    //Sending Request For Getting The product List For Add BulkStock 
    console.log('Sending Request For validation Add BulkStock : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('stockvalidate', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespvalidation(DeleteAlert, res),
        error => this.GetErrorvalidation(error));
  }

  //Getting Response For validation To Add BulkStock
  GetRespvalidation(template: TemplateRef<any>, resp) {
    console.log('Getting Response For validation To Add BulkStock : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'FAILED') {
      this.showAlert(template);
      this.bulkstock.depotname = undefined;
      this.bulkstock.bulkstockDateValue = '';
      this.productlist = [];

    } else {
      console.log('success');

    }
  }
  //Getting Error For validation To Add BulkStock
  GetErrorvalidation(error) {
  //   if(localStorage.getItem("TOKEN")===null)
  //   {
  //   this.toastr.error("Session Time Out Please Login Again....");
  //   setTimeout(() => {
  //     this.toastr.clear();
  //   }, 1500);
  //   setTimeout(() => {
  //     this.router.navigate(['/login']);
  //     console.log('Navigate to login');
  //   }, 2000);

  // }
    console.log('Getting Error For validation To Add BulkStock : ' + JSON.stringify(error));
  }
  //Getting The Add BULK STOCK Values After Submit
  validateBulkstock(f: NgForm) {
    this.mysubmit=true;
    this.msg="Please wait processing  and don't refresh !!!";
this.ishidecalcel=true;
    console.log('Getting The Add BULK STOCK Values After Submit');
    console.log('depotid : ' + this.bulkstock.depotname);
    console.log('loadeddate : ' + this.datePipe.transform(this.bulkstock.bulkstockDateValue, "yyyy-MM-dd"));
    console.log('Final Data : ' + JSON.stringify(this.productlist));

  //  this.productlist.forEach() this.productlist
 // this.pustproductlist.forEach

    const postData = {
      depotid: this.bulkstock.depotname,
      purpose:"add",
      loadeddate: this.datePipe.transform(this.bulkstock.bulkstockDateValue, "yyyy-MM-dd"),
      data: this.productlist
    };
    //Sending The Added Values For Bulkstock
    console.log('Sending The Bulkstock Added Values : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('addbulkstock', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespAddBulkstock(res),
        error => this.GetErrorAddBulkstock(error));
  }

  //Getting Response For Add Bulk STock
  GetRespAddBulkstock(resp) {
    console.log('Getting Response For Add Bulk STock : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {

      this.toastr.success(resp.RESP_DESC);
      console.log('BulkStock Added Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/bulkstock']);
        console.log('Navigate To BulkStock');
      }, 3000);
    } else {
      this.mysubmit=false;

      console.log('Add Bulkstock Failed');
      this.toastr.error(resp.RESP_DESC);
    }
  }
  //Getting Error For Add Bulk STock
  GetErrorAddBulkstock(error) {
    this.toastr.error("Session Time Out Please Login Again....");
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

    console.log('Getting Error For Add BulkStock : ' + JSON.stringify(error));
 }



  /*  gltotal(value, index) {
     console.log("index  " + index);
     console.log("value  " + value);
 
     this.total1 = parseInt(this.opening) + parseInt(this.purchase);
     console.log("1st open pur " + this.total1);
     this.total2 = parseInt(value) - parseInt(this.total1);
     console.log("2 nd closing - 1st " + this.total2);
     this.total3 = parseInt(this.loaded) + parseInt(this.transfer);
     console.log("3 rd loaded trans " + this.total3);
     this.final = parseInt(this.total2) + parseInt(this.total3);
     console.log("final" + this.final);
     this.gl[index] = this.final;
     console.log('GL[' + index + '] : ' + this.gl[index]);
 
   } */
  trackByIdx(index: number, obj: any): any {
    //console.log("indexs "+index+' '+JSON.stringify(obj));
    return index;
  }
  glcalculation(value, index) {

    console.log(" glcalculation index  " + index);
    console.log("glcalculation value  " + JSON.stringify(value));

    this.opening = value.openingbalance;
    this.purchase = value.purchase;
    this.transfer = value.transfer;
    this.loaded = value.loaded;
    this.closing = value.closing;
    this.addvalue = '0'
//alert('pur : '+this.purchase);
    if (this.opening === undefined || this.opening === ' ' || this.opening === '' ) {
      console.log("enter if opening");
      this.opening = this.addvalue;
    }

    if (this.purchase === undefined || this.purchase === ' ' || this.purchase === '') {
      console.log("enter if purchase");
      this.purchase = this.addvalue;
    }

    if (this.transfer === undefined || this.transfer === ' ' || this.transfer === '') {
      console.log("enter if transfer");
      this.transfer = this.addvalue;
    }

    if (this.loaded === undefined || this.loaded === ' ' || this.loaded === '' ) {
      console.log("enter if loaded");
      this.loaded = this.addvalue;
    }

    if (this.closing === undefined || this.closing === ' ' || this.closing === '' ) {
      console.log("enter if closing");
      this.closing = this.addvalue;
    }

    this.total1 = parseInt(this.opening) + parseInt(this.purchase);
    console.log("1st open pur " + this.total1);

    this.total2 = parseInt(this.closing) - parseInt(this.total1);
    console.log("2 nd closing - 1st " + this.total2);

    this.total3 = parseInt(this.loaded) + parseInt(this.transfer);
    console.log("3 rd loaded trans " + this.total3);

    this.final = parseInt(this.total2) + parseInt(this.total3);
    console.log("final" + this.final);

    this.gl[index] = this.final;
    console.log('GL[' + index + '] : ' + this.gl[index]);

  }

}
