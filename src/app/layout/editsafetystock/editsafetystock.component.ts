import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { PassdataService } from '../../services/passdata.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-editsafetystock',
  templateUrl: './editsafetystock.component.html',
  styleUrls: ['./editsafetystock.component.css'],
  providers: [
    DatePipe
  ]
})
export class EditsafetystockComponent implements OnInit {
  safetylist = [];
  safety: any = {};
  safteyval : any;
  productlist = [];
  depotlist = [];
  historylist = []
  form: any;
  config: any;
  filter: any;
  mysubmit : any;
  msg : any;
  collection = { data: [] };
  constructor(
    private router: Router,
    private rest: RestapiService,
    private toastr: ToastrService,
    private passData: PassdataService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.mysubmit=false;
    this.getdepotlist();
    this.spinner.show();
    let data = this.passData.getJSONData();
    this.safetylist = this.passData.getJSONData();
    console.log('Edit Safety Data in editsafetystock page : ' + JSON.stringify(data));

    this.safety.depotname = data.DEPOT_ID;
    this.safety.productname = data.PRODUCT_ID;
    this.safety.safetyDateValue=data.START_DATE;
    this.safety.safetyDateValue1 = this.datePipe.transform(data.SAFETYDATE, "MM-dd-yyyy");
    this.safety.safetydays = data.SAFETY_DAYS;
    this.safety.safetyid = data.SAFETY_ID;
    this.safteyval= data.SAFETY_DAYS;

    //getting Productlist for Edit Safety Based On DepotidSelection
    let postData = {
      depotid: data.DEPOT_ID,
      listcall: 'PRODLINKDEPOT'
    };
    //getting HistorySafetyDays for Edit Safety
    let postData1 = {
      listcall: 'HISTORYVIEW',
      productid: this.safety.productname,
      depotid: this.safety.depotname
    };
    //Sending Request For Send Depotid For ProductList In Edit Safety
    console.log('Sending Request For Send Depotid For ProductList In Edit Safety : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homeproductlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespProductList(res),
        error => this.GetErrorProductList(error));

    //Sending Request For Getting The HistorySafetyDays 
    console.log('Sending Request For Getting The HistorySafetyDays : ' + JSON.stringify(postData1));
    this.rest.sendPostRequest('homesafetylist', JSON.stringify(postData1))
      .subscribe(
        res => this.getdepotResp1(res),
        error => this.getError11(error));
  }
  //getting response For Getting The HistorySafetyDays 
  getdepotResp1(resp) {
   
    this.historylist = resp;
    console.log('historylist: ' + JSON.stringify(resp));
   // this.initPagination();
    
  }
  //getting Error For Getting The HistorySafetyDays 
  getError11(error) {
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

  //Getting Response For ProductList Based On DepotId Selection
  GetRespProductList(resp) {
    this.productlist = resp;
    console.log('Getting Response For ProductList Based On DepotId Selection: ' + JSON.stringify(resp));
  }
  //Getting Error For ProductList Based On DepotId Selection
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
    console.log('Getting Error For ProductList Based On DepotId Selection: ' + JSON.stringify(error));
  }

  //Getting DepotList For EditSafety
  getdepotlist() {
    let postData = {
      listcall: ''
    };
    //Sending Request For Getting DepotList For EditSafety
    console.log(' Sending Request For Getting DepotList For EditSafety: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('authorizeddepotlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespDepot(res),
        error => this.GetErrorDepot(error));
  }
  //Getting Response For Getting DepotList For EditSafety
  GetRespDepot(resp) {
    this.depotlist = resp;
    console.log('Getting REsponse For Getting DepotList For EditSafety: ' + JSON.stringify(resp));
  }
  //Getting Error For Getting DepotList For EditSafety
  GetErrorDepot(error) {
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
    console.log('Getting Error For Getting DepotList For EditSafety: ' + JSON.stringify(error));
  }

  //Getting The Edit SafetDays Values After Submit
  validatesafety(f: NgForm) {

//lert(this.safteyval+" "+this.safety.safetydays);


if(this.safteyval===this.safety.safetydays)
{

  this.toastr.success("Safety Days Edited Successfully ");

  setTimeout(() => {
    this.toastr.clear();
  }, 2500);
  setTimeout(() => {
    this.router.navigate(['/layout/safety']);
    console.log('Navigate to SafetyDays');
  }, 3000);

  return false;
}

console.log('Getting The Edit Safetdays Values After Submit');
    console.log('depotid : ' + this.safety.depotname);
    console.log('productid : ' + this.safety.productname);
    //console.log('safteydate : ' + this.datePipe.transform(this.safety.safetyDateValue1, "MM-dd-yyyy"));
    console.log('safetydays : ' + this.safety.safetydays);
    console.log('safetyid : ' + this.safety.safetyid);

    let dd = this.safety.safetyDateValue.substring(0, 2);
    let mm = this.safety.safetyDateValue.substring(3,5);
    let yyyy = this.safety.safetyDateValue.substring(6,10);

    const postData = {
      depotid: this.safety.depotname,
      productid: this.safety.productname,
      safteydate: this.safety.safetyDateValue,//this.datePipe.transform(this.safety.safetyDateValue1, "MM-dd-yyyy"),
      safetydays: this.safety.safetydays,
      newsafetydate: yyyy + '-'+ mm + '-'+ dd,
      safetyid: this.safety.safetyid
    };
    this.mysubmit=true;
    this.msg="Please wait processing  and don't refresh !!!";
    //Sending The Edit Values For Safety Days
    console.log('Sending The Edit SafetyDays Values:' + JSON.stringify(postData));
    this.rest.sendPostRequest('editsafetydays', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespEditSafety(res),
        error => this.GetErrorEditSafety(error));
  }

  //Getting Response For Edit Safety Days
  GetRespEditSafety(resp) {
    console.log('Getting Response For Edit Safety : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('Safety Days Edited Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/safety']);
        console.log('Navigate to SafetyDays');
      }, 3000);
    } else {
      console.log('Failed For Edit SafetyDays');
      this.toastr.error(resp.RESP_DESC);
    }
  }
  //Getting Error For Edit Safety Days
  GetErrorEditSafety(error) {
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
    console.log('Getting Error For Edit Safety : ' + JSON.stringify(error));

  }
/* //pagination start
initPagination() {
  this.collection.data = this.historylist;
  console.log('Pagination Data Showing In Safety Days : ' + JSON.stringify(this.collection.data));
  if (this.collection.data != null) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.historylist.length
    };
  }
}
pageChanged(event) {
  this.config.currentPage = event;
}
//pagination ended */
}
