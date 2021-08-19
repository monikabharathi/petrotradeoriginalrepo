import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestapiService } from '../../services/restapi.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-addforecastweek',
  templateUrl: './addforecastweek.component.html',
  styleUrls: ['./addforecastweek.component.css'],
  providers: [
    DatePipe
  ]
})
export class AddforecastweekComponent implements OnInit {
  msg: any;
  modalRef: BsModalRef;
  config = {
    keyboard: true
  };

  depotlist = [];
  perviousversionlist = [];
  previoudversiondata=[];
  finalprevioudversiondata=[];
  selectedProduct=[];
  selectedProductList: any = [];
  finalprevioudversiondatas: [];

  currentversionlist = [];
  productlist = [];
  forecast: any = {};
  form: any;
  DayNumber: any;
  forcastweekdatelist: any;
  finastocklist: any = [];

  productDetails: any = [];
  prodValue: any[][] = [];
  value: any;
  ppid: any;
  weeknum: any;v
  DepotId: any;
  Forecastdate: any;
  valid: any;
  day: any;
  version: any;
  total: any;
  mysubmit: any;
  mybuttonsubmit: any;
  tabledata: any;
  myiputvalue: any;

  viewdataofpreviuos: any;
  forecastweekvalue: any;
  constructor(
    private router: Router,
    private rest: RestapiService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }


  showAlert(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
  ngOnInit() {
    this.mysubmit=true;
    this.viewdataofpreviuos=true;
    this.mybuttonsubmit=false;
    //this.getdepotlist();
    //this.getperviousversionlist();
    // this.getcurrentversionlist();
  }
  enableProduct(valueid: any): void
  {    this.mysubmit=false;

   // alert("proid id : "+valueid);

    this.myiputvalue=valueid;
  }

  Dayvalidation(Forecastdate: Date): void {
    console.log('Selected Bulkstockdate in add bulkstock--->' + this.datePipe.transform(Forecastdate, 'yyyy-MM-dd'));
    this.Forecastdate = this.datePipe.transform(Forecastdate, 'yyyy-MM-dd')
    this.DepotId = this.DepotId;



    console.log('inside else');
    var options = { weekday: 'long' };
    var Xmas95 = new Date(Forecastdate);
    var weekday = Xmas95.getDay();
    this.valid = (new Intl.DateTimeFormat('en-US', options).format(Xmas95));
    console.log(" this.Forecastdate----->" + this.Forecastdate);
    console.log("weekday----->" + weekday);
    console.log(" this.valid----->" + this.valid);
    this.day = this.valid;

  }

  // Getting The Depot List For Add Forecastweek
  getdepotlist(forecastdate: Date): void {
    console.log('Sending Request' + forecastdate);
    this.depotlist = null;
    this.forecast.depotname = '';
    const postData = {
      listcall: ''
    };
    // Sending Request For Getting The Depot List For Add Forecastweek
    console.log('Sending Request For Getting The Depot List For Add Forecastweek: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('authorizeddepotlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespDepot(res),
        error => this.GetErrorDepot(error));
  }
  // Response For Getting The Depot List For Add Forecastweek
  GetRespDepot(resp) {

    this.depotlist = resp;
    console.log('Response For Getting The Depot List For Add Forecastweek: ' + JSON.stringify(resp));
  }
  // Error For Getting The Depot List For Add Forecastweek
  GetErrorDepot(error) {
    console.log('Error For Getting The Depot List For Add Forecastweek: ' + JSON.stringify(error));
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
  //after selecting 
  getprviusversionsdata(versionid,depotid : any): void {
    this.viewdataofpreviuos=true;
    const postData = {
      depotid: depotid,
      forecastversion: versionid
    };
    console.log('Sending Request For Getting The perviousversionlist For Add Forecastweek: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('forecastpreviousversion', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespperviousversionlist(res),
        error => this.GetErrorperviousversionlist(error));

  }
 // Getting The perviousversionlist  For Add Forecastweek
  getperviousversionlist(depotid: any): void {
    //alert(' select versions data forecastpreviousversion');
    const postData = {
      depotid: depotid
    };
    // Sending Request For Getting The perviousversionlist For Add Forecastweek
    console.log('Sending Request For Getting The perviousversionlist For Add Forecastweek: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('forecastpreviousversion', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespperviousversionlist(res),
        error => this.GetErrorperviousversionlist(error));
  }
  // Response For Getting The perviousversionlist For Add Forecastweek
  GetRespperviousversionlist(resp) {
    this.selectedProductList =[];
    this.selectedProduct=[];
    console.log('Response For Getting The perviousversionlist For Add Forecastweek: ' + JSON.stringify(resp.versions));

   // alert('Response For ' + JSON.stringify(resp.versions));
   // alert('resp :: '+JSON.stringify(resp.previousdataversions));
    console.log('Response For Getting resp.previousdataversions' + JSON.stringify(resp.previousdataversions));

    this.perviousversionlist = resp.versions;
    this.previoudversiondata= resp.previousdataversions;
   
    
//alert( this.perviousversionlist.length);
//alert(this.forcastweekdatelist.length)
    if(this.previoudversiondata !==null && this.previoudversiondata.length !== 0 && this.forcastweekdatelist.length !==0)  
{



    for (let i of resp.previousdataversions) {
      this.selectedProduct.push(i.PRODUCT_LIST);
      }
      this.selectedProductList =this.selectedProduct;
      this.viewdataofpreviuos=false;
      //this.mysubmit=false;
    }
    else{
      this.viewdataofpreviuos=true;
    }
 console.log('selectedProductList: ' + JSON.stringify(this.selectedProductList));
  }









  // Error For Getting The perviousversionlist For Add Forecastweek
  GetErrorperviousversionlist(error) {
    console.log('Error For Getting The perviousversionlist For Add Forecastweek: ' + JSON.stringify(error));
 
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

  // Getting The currentversionlist For Add Forecastweek
  getcurrentversionlist(p,depotid: any,product: any, DeleteAlert): void {
    //alert('depot checkboxstatus '+p.checkboxstatus);

 if(p.checkboxstatus===true)
{
  this.myiputvalue=product;
p.productsel=false;
    const postData = {
      forecastdate: this.Forecastdate,
      depotid: depotid,
      productid :  product
    };
    // Sending Request For Getting The currentversionlist For Add Forecastweek
    console.log('Sending Request For Getting The currentversionlist For Add Forecastweek: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('forecastcurrentversion', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespcurrentversionlist(p,product,DeleteAlert, res),
        error => this.GetErrorcurrentversionlist(error));

      }
      else
      {
      //  p.checkboxstatus=false;
     this.myiputvalue='';
      p.productsel=true;
      this.mysubmit=true;

      for (let i of this.productlist)
       {

          if(i.checkboxstatus===true)
            {
                     this.mysubmit=false;
                     this.myiputvalue=i.productid;


            }

      }

      
       // p.flag=false;
      }

  }
  // Response For Getting The currentversionlist For Add Forecastweek
  GetRespcurrentversionlist(p,product,template: TemplateRef<any>, resp) {
  //  alert(JSON.stringify(resp));
    if (resp.RESP_STATUS === 'FAILED') {

      this.myiputvalue='';
      p.checkboxstatus=false;
      this.mysubmit=true;
      for (let i of this.productlist)
       {


        if(i.checkboxstatus===true)
          {
                   this.mysubmit=false;
                   this.myiputvalue=i.productid;

          }

    }

      //alert("failed");
     // this.viewdataofpreviuos=true;
     p.flag=true;
     p.checkboxstatus=false;
      this.showAlert(template);
      p.productsel=true;
    //  this.Forecastdate = '';
     // this.forcastweekdatelist = [];
     // this.forecast.forecastdate = '';
     // this.forecast.depotname = undefined;
      //this.productlist = [];
     // this.selectedProductList = [];
    }

    else {
      this.mysubmit=false;

     // p.checkboxstatus=true;
     // this.mysubmit=false;
      // alert("proid id : "+valueid);
   
      // this.myiputvalue=product;

      this.currentversionlist = resp.RESP_DESC;
      //  this.forecast.version = resp.RESP_DESC;
      console.log('Response For Getting The currentversionlist For Add Forecastweek: ' + JSON.stringify(resp));
      let forecastversion;
      let forecastingday;
      for (let i of this.currentversionlist) {
        forecastversion = i.VERSION;
        forecastingday = i.DAYNUMBER;
      }
      this.forecast.daynumber = forecastingday;
      this.forecast.version = forecastversion;
      console.log('   this.forecast.daynumber ' + this.forecast.daynumber);
      console.log('   this.forecast.version  ' + this.forecast.version);
    }





    
  }


  // Error For Getting The currentversionlist For Add Forecastweek
  GetErrorcurrentversionlist(error) {
   
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
    console.log('Error For Getting The currentversionlist For Add Forecastweek: ' + JSON.stringify(error));
  }






  // Getting The Product List For Add Forecastweek Based on DepotidSelection
  getproductlistfordepot(depotid: any): void {
    this.DepotId = depotid;

    console.log('Depotid Selection For ProductList in Add Forecastweek' + depotid);
    const postData = {
      depotid,
    };
    // Sending Request For Getting The product List For Add Forecastweek
    console.log('Sending Request For Getting The Product List For Add Forecastweek : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('authorizedproductlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespProductList(res),
        error => this.GetErrorProductList(error));
  }
  // Getting Response For ProductList To Add Forecastweek
  GetRespProductList(resp: any) {

    
    this.productlist = resp;

    console.log('date pro list is  '+(this.productlist));
    console.log('forcastweekdatelist : '+JSON.stringify(this.forcastweekdatelist))
this.mysubmit=true;
this.tabledata=true;
    if(this.productlist.length !==0)
    {
      //this.myiputvalue='363';
    //  this.mysubmit=false;
      this.tabledata=false;

    const newfcwdlist: any = [];
    for (const f of this.forcastweekdatelist) {
      const newprodlist: any = [];
      // const totalprodlist: any = [];
      const res = this.productlist;
      console.log(">>>>>>>>>>>>"+JSON.stringify(this.productlist))
      for (const p of this.productlist) {
       // alert(' id:  '+p.productid)
       p.checkboxstatus=false;
       p.flag=false;
       p.productsel=true;
        newprodlist.push({ pid: p.productid, pvalue: '',pstatus: false});

      }
      console.log('Resp : ' + JSON.stringify(res));
      newfcwdlist.push({forcastdar:this.datePipe.transform(this.forecast.forecastdate, "yyyy-MM-dd"), startdate: f.startdate, weeknum: f.weeknum, enddate: f.enddate, prodList: newprodlist });
    }
    console.log('newfcdlist : ' + JSON.stringify(newfcwdlist));
    this.forcastweekdatelist = newfcwdlist;
this.mysubmit=true;
    console.log('forcastweekdatelist : dat '+JSON.stringify(this.forcastweekdatelist[0]));
  }
  else{
    this.toastr.error("No Products Are Configured With Selected Depot !!! ");
    setTimeout(() => {
      this.toastr.clear();
    }, 2000);

  }
  }
  // Getting Error For ProductList To Add Forecastweek
  GetErrorProductList(error) {
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
    console.log('Getting Error For ProductList To Add Forecastweek : ' + JSON.stringify(error));
  }



  // Getting The forecastdate For Add Forecastweek
  forcastweeklist(forecastdate: Date): void {
    console.log('Selected ForecastDate in Add Forecastweek' + this.datePipe.transform(forecastdate, 'yyyy-MM-dd'));
    const postData = {
      loadeddate: this.datePipe.transform(forecastdate, 'yyyy-MM-dd')
    };

    // Sending Request For Getting The forcastweeklist For Add Forecastweek
    console.log('Sending Request For Getting The forcastweeklist For Add Forecastweek  : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('forcastweeklist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespforcastweeklist(res),
        error => this.GetErrorforcastweeklist(error));
  }

  // Getting Response For  forcastweeklist For Add Forecastweek
  GetRespforcastweeklist(resp) {
    // this.forcastweekdatelist = resp;
    console.log('Getting Response For forcastweeklist For Add Forecastweek  : ' + JSON.stringify(resp));

    if (this.day === 'Monday') {
      this.forcastweekdatelist = resp;
      console.log('Resp : ' + JSON.stringify(this.forcastweekdatelist));
    }
    else {
      this.Forecastdate = '';
      this.forcastweekdatelist = '';
      this.forecast.forecastdate = '';
      this.forecast.depotname =undefined;

      alert("Selected Date is Not Monday!!!");
    }


  }
  // Getting Error For  forcastweeklist For Add Forecastweek
  GetErrorforcastweeklist(error) {
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
    console.log('Getting Error For  forcastweeklist For Add Forecastweek  : ' + JSON.stringify(error));
  }



  validateForeCastWeek(f: NgForm) {
 
    console.log('Getting The Add forecastweek dats Values After Submit');
    console.log('depotid : ' + this.forecast.depotname);
    console.log('forecastdate : ' + this.datePipe.transform(this.forecast.forecastdate, "yyyy-MM-dd"));
    console.log('daynumber : ' + this.forecast.daynumber);
    //alert('Final Data : ' + JSON.stringify(this.forcastweekdatelist));
    console.log('Final Data : ' + JSON.stringify(this.forcastweekdatelist));
console.log("productlist : "+JSON.stringify(this.productlist));
for(let statuslist of this.productlist)
{

  if(statuslist.checkboxstatus===true)
  {
 
   for (let cm of this.forcastweekdatelist) {
//alert('start');
    for (let sm of cm.prodList) {

if(sm.pid===statuslist.productid)
{
  //alert('ID '+statuslist.productid);
 /// alert('status bfr '+sm.pstatus);

  sm.pstatus=true;
 // alert('status aftr '+sm.pstatus);

      if(sm.pvalue === '')
      {
        alert('Please Enter Selected  Products Values')
        return false;

      }
    }

    }

    
   }

   
  }
  else
  {
    for (let cm of this.forcastweekdatelist) {
      //alert('start');
          for (let sm of cm.prodList) {
      
      if(sm.pid===statuslist.productid)
      {

        sm.pvalue='0';


      }}}
  }


}

console.log("My ref list :: "+JSON.stringify(this.forcastweekdatelist));
//return false;


this.mysubmit=true;
this.mybuttonsubmit=true;

this.msg="Please wait processing  and don't refresh !!!";
//return false;
    const postData = {

      depotid: this.forecast.depotname,
      forecastdate: this.datePipe.transform(this.forecast.forecastdate, "yyyy-MM-dd"),
      daynumber: this.forecast.daynumber,
      currentversion: this.forecast.version,
      data: this.forcastweekdatelist
    };
    //Sending The Added Values For forecastweek
    console.log('Sending The forecastweek Added Values : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('addforecast', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespAddforecastweek(res),
        error => this.GetErrorAddforecastweek(error));
  }
  //Getting Response For Add forecastweek
  GetRespAddforecastweek(resp) {
    this.msg="";
    this.mysubmit=false;
    console.log('Getting Response For Addforecastweek : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('ForecastWeek Added Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/forecastweek']);
        console.log('Navigate To forecastweek');
      }, 3000);
    } else {
      console.log('Add forecastweek Failed');
      setTimeout(() => {
        this.router.navigate(['/layout/forecastweek']);
        console.log('Navigate To forecastweek');
      }, 3000);
      this.toastr.error(resp.RESP_DESC);
    }
  }
  //Getting Error For Add forecastweek
  GetErrorAddforecastweek(error) {
    this.mysubmit=false;
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
    console.log('Getting Error For Add forecastweek : ' + JSON.stringify(error));
  }

 showtotal(value, weeknum, prodid, version, indexI, indexJ) {
    console.log("i = " + indexI);
    console.log("j = " + indexJ);
    this.value = value;
    this.ppid = prodid;
    this.weeknum = weeknum;
    this.version = version;
    console.log("value-" + this.value);
    console.log("weeknum-" + this.weeknum);
    console.log("ppid-" + this.ppid)
    console.log("version-" + this.version)
    console.log("depotid-" + this.DepotId)

    let postData = {
      productid: prodid,
      forecastversion: version,
      weeknumbyid: weeknum,
      producttotal: value
    };
    //Sending Request For total
    console.log('Sending Request For total: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('totalforecastbyproduct', JSON.stringify(postData))
      .subscribe(
        res => this.GetResptotal(res, this.ppid, indexI, indexJ),
        error => this.GetErrortotal(error));
  }
  // Response For Getting The Depot List For Add LinkSupplier
  GetResptotal(resp, prodid, indexI, indexJ) {
    this.total = resp;
    console.log('Response total ' + JSON.stringify(resp));
    let i = 0;
    let j = 0;
    for (let fd of this.forcastweekdatelist) {
      j = 0;
      for (let p of fd.prodList) {
        if (p.pid == prodid && indexI == i && indexJ == j) {
          p.pvalue1 = resp.RESP_DESC;
        }
        j++;
      }
      i++;
    }

  }

  // Error For Getting The Depot List For Add LinkSupplier
  GetErrortotal(error) {
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
    console.log('Error total: ' + JSON.stringify(error));
  }

  Number (value) { return Number(value)}


}



