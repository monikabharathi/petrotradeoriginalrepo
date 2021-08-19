import { Component, OnInit } from '@angular/core';
import { PassdataService } from '../../services/passdata.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestapiService } from '../../services/restapi.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-editbulkstock',
  templateUrl: './editbulkstock.component.html',
  styleUrls: ['./editbulkstock.component.css'],
  providers: [
    DatePipe
  ]
})
export class EditbulkstockComponent implements OnInit {
  stocklist: any;
  stocklistdropdown: any;
 // teststocklist: any;
  //openingbalance: any;
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
 // finastocklist: any;
  finastocklist: any = [];
  prodcut: any;
  prodcutdrop: any;
  myiputvalue: any;
  form:any;
  bulkstock: any = {};
  ishide: any;
  ishidecalcel : any;
  msg : any;
  constructor(
    private passData: PassdataService,
    private router: Router,
    private rest: RestapiService,
    private datePipe: DatePipe,
    private toastr: ToastrService

  ) { }
  //Edit Stocklist Data in editbulkstock page
  ngOnInit() {
    this.ishide="true";
    this.myiputvalue ='';

    this.prodcut=true;
    this.prodcutdrop=false;

    let data = this.passData.getJSONData();
   // this.stocklist = this.passData.getJSONData();

    this.stocklist=data.RESP_STATUS_DATA;
    this.stocklistdropdown=data.DataStockdropdown;

   // this.teststocklist=this.passData.getJSONData();
    console.log('Edit Stocklist Data in editbulkstock page : ' + JSON.stringify(data));
    let depotname;
    let loadeddate;
    let weekday;
    let depotid;
    let stockdate;



    //for(let p of this.stocklist) {
     
     /*  p.openingbalance=p.openingbalance;
      p.purchase=p.purchase;
      p.loaded=p.loaded;
      p.transfer=p.transfer;
      p.gl=p.gl;
      p.closing=p.closing;
      p.checkboxstatus=false; */
     // p.readonly=true;
    

    //}   
    let v=0;

    for (let i of data.RESP_STATUS_DATA) {
      //alert('Data : '+JSON.parse(data));
      //alert('val : '+i.gl);

      depotname = i.DEPOT_NAME;
      depotid = i.depotid;
      loadeddate = i.LOADED_DATE;
      weekday = i.weekday;
      stockdate = i.stockdate;
      this.gl[v] =i.gl;
      v++;
    //  this.gl[v] =i.openingbalance+i.purchase+i.loaded+i.transfer+i.closing;
 
      
      i.checkboxstatus=false;
//v++;

    //  "openingbalance":0,"purchase":0,"loaded":0,"transfer":0,"gl":100,"closing":100,"


     // i.readonly=true;
      //i.flag=true;


    }
    console.log('depotname---: ' + depotname);
    console.log('loadeddate---: ' + loadeddate);
    console.log('weekday---: ' + weekday);
    console.log('depotid---: ' + depotid);
    console.log('stockdate---: ' + stockdate);

    this.bulkstock.depotname = depotname;
    this.bulkstock.loadeddate = loadeddate;
    this.bulkstock.weekday = weekday;
    this.bulkstock.depotid = depotid;
    this.bulkstock.stockdate = stockdate;

  }



  checkBox(p, value,index,productid,DeleteAlert)
  {

   // this.mysubmit="true";
console.log(' this.productlist '+JSON.stringify(this.stocklist));
this.ishide=true;
    p.readonly="false";
//let ii=0;
    for(let p of this.stocklist) {
      

      //alert(p.checkboxstatus+'con '+ii+'  sample '+this.teststocklist[ii]+'p : '+p);
      if(p.checkboxstatus===true)
      {

        this.ishide=false;

      }
      /* else{
      //  p.openingbalance=this.teststocklist[ii].openingbalance;
       
let myite=0;
for(let pp of this.teststocklist)
{
if(myite===ii)
{
  alert('my pur '+pp.purchase);
  p.purchase=pp.purchase;
  p.loaded=pp.loaded;
  p.transfer=pp.transfer;
  p.gl=pp.gl;
  p.closing=pp.closing;
}
  myite++;
}

      } */
     // ii++;
  
    }

  }

  enableProduct(valueid: any): void
  {    this.prodcut=false;
   // this.myiputvalue=true;

   //alert("proid id : "+valueid);
   this.prodcutdrop=true;

    this.myiputvalue=valueid;
  }

  //Getting The Edit BULK STOCK Values After Submit
  validateBulkstock(f: NgForm) {
    this.ishide=true;
    this.msg="Please wait processing  and don't refresh !!!";
this.ishidecalcel=true;
    console.log('Getting The Edit BULK STOCK Values After Submit');
    console.log('depotid : ' + this.bulkstock.depotid);
    console.log('loadeddate : ' + this.datePipe.transform(this.bulkstock.stockdate, "yyyy-MM-dd"));
    // console.log('loadeddate : ' + this.bulkstock.loadeddate);
    console.log('Final Data : ' + JSON.stringify(this.stocklist));


for(let p of this.stocklist)
{
 // alert('Satus : '+(p));
  if(p.checkboxstatus===true)
  {
   
    this.finastocklist.push(p);
  }
}
console.log('Final Data after filert : ' + JSON.stringify(this.finastocklist));


    const postData = {
      depotid: this.bulkstock.depotid,
      purpose:"edit",
      loadeddate: this.datePipe.transform(this.bulkstock.stockdate, "yyyy-MM-dd"),
     // data: this.stocklist,
     data: this.finastocklist
    };

   
    //Sending The Edited Values For Bulkstock
    console.log('Sending The Bulkstock Edited Values : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('editbulkstock', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespEditBulkstock(res),
        error => this.GetErrorEditBulkstock(error));
  }

  //Getting Response For Edit Bulk STock
  GetRespEditBulkstock(resp) {
    console.log('Getting Response For Edit Bulk STock : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('BulkStock Edit Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/bulkstock']);
        console.log('Navigate To BulkStock');
      }, 3000);
    } else {
      console.log('Edit Bulkstock Failed');
      this.ishide=false;
      this.toastr.error(resp.RESP_DESC);
    }
  }
  //Getting Error For Edit Bulk STock
  GetErrorEditBulkstock(error) {
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
    console.log('Getting Error For Edit BulkStock : ' + JSON.stringify(error));

  }



  

  trackByIdx(index: number, obj: any): any {
    //console.log("indexs "+index+' '+JSON.stringify(obj));
    return index;
  }


glcalculation(value, index) {

  console.log(" glcalculation index  " + index);
  console.log("glcalculation value  " + JSON.stringify(value));

  this.openingbalance = value.openingbalance;
  this.purchase = value.purchase;
  this.transfer = value.transfer;
  this.loaded = value.loaded;
  this.closing = value.closing;
  this.addvalue = '0'
//alert('pur : '+this.purchase);
  if (this.openingbalance === undefined || this.openingbalance === ' ' || this.openingbalance === '' ) {
    console.log("enter if opening");
    this.openingbalance = this.addvalue;
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

  this.total1 = parseInt(this.openingbalance) + parseInt(this.purchase);
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