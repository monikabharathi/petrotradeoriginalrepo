import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-addsafety',
  templateUrl: './addsafety.component.html',
  styleUrls: ['./addsafety.component.css'],
  providers: [
    DatePipe
  ]
})
export class AddsafetyComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  depotlist = [];
  productlist = [];
  safety: any = {};
  form: any;
  mysubmit : any;
  msg : any;
  constructor(
    private router: Router,
    private rest: RestapiService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
  ) { 
    
    this.minDate = new Date();
  //  this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
   // this.maxDate.setDate(this.maxDate.getDate()+1);
  }
    
  

  ngOnInit() {
    this.mysubmit=false;
    this.getdepotlist();
  }
  //Getting The Depot List For Add Safetdays 
  getdepotlist() {
    let postData = {
      listcall: ''
    };
    //Sending Request For Getting The Depot List For Add SafetyDays 
    console.log('Sending Request For Getting The Depot List For Add SafetyDays  : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('authorizeddepotlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespDepotListSafety(res),
        error => this.GetErrorDepotListSafety(error));
  }
  //Getting Response For DepotList To Add SafetyDays
  GetRespDepotListSafety(resp) {
    this.depotlist = resp;
    console.log('Getting Response For DepotList To Add SafetyDays : ' + JSON.stringify(resp));
  }
     //Getting Error For DepotList To Add SafetyDays
  GetErrorDepotListSafety(error) {
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
    console.log('Getting Error For DepotList To Add SafetyDays : ' + JSON.stringify(error));
  }

  //Getting The Product List For Add Safetdays Based on DepotidSelection
  getproductlistfordepot(depotid: string): void {
    console.log("Depotid Selection For ProductList in Add SafetyDays" + depotid);
    let postData = {
      depotid: depotid,
      listcall: 'PRODLINKDEPOT'
    };
     //Sending Request For Getting The product List For Add SafetyDays 
    console.log('Sending Request For Getting The Product List For Add SafetyDays : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homeproductlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespProductListSafety(res),
        error => this.GetErrorProductListSafety(error));
  }

  //Getting Response For ProductList To Add SafetyDays
  GetRespProductListSafety(resp) {
    this.productlist = resp;
    if(this.productlist.length === 0){

      this.toastr.error("No Products Are Configured With Selected Depot !!! ");
        setTimeout(() => {
          this.toastr.clear();
        }, 2000);
    }
    


    console.log('Getting Response For ProductList To Add SafetyDays : ' + JSON.stringify(resp));
  }
   //Getting Error For ProductList To Add SafetyDays
  GetErrorProductListSafety(error) {
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
    console.log('Getting Error For ProductList To Add SafetyDays : ' + JSON.stringify(error));
  }

  //Getting The Add SafetDays Values After Submit
  validatesafety(f: NgForm) {
    console.log('Getting The Add Safetdays Values After Submit');
    console.log('depotid : ' + this.safety.depotname);
    console.log('productid : ' + this.safety.productname);
    console.log('safteydate : ' + this.datePipe.transform(this.safety.safetyDateValue, "MM-dd-yyyy"));
    console.log('safetydays : ' + this.safety.safetydays);
this.mysubmit=true;
this.msg="Please wait processing  and don't refresh !!!";


    const postData = {
      depotid: this.safety.depotname,
      productid: this.safety.productname,
      safteydate: this.datePipe.transform(this.safety.safetyDateValue, "MM-dd-yyyy"),
      newsafetydate: this.datePipe.transform(this.safety.safetyDateValue, "yyyy-MM-dd"),
      safetydays: this.safety.safetydays
    };
    //Sending The Added Values For Safety Days
    console.log('Sending The Add SafetyDays Values:' + JSON.stringify(postData));
    this.rest.sendPostRequest('addsafetydays', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespAddSafety(res),
        error => this.GetErrorAddSafety(error));
  }

  //Getting Response For Add Safety Days
  GetRespAddSafety(resp) {
    console.log('Getting Response For Add Safety : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('Safety Days Added Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/safety']);
        console.log('Navigate to SafetyDays');
      }, 3000);
    } else {
      console.log('Failed For Add SafetyDays');
      this.mysubmit=false;
      this.toastr.error(resp.RESP_DESC);


      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/safety']);
        console.log('Navigate to SafetyDays');
      }, 3000);
    }
  }
    //Getting Error For Add Safety Days
  GetErrorAddSafety(error) {
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
    console.log('Getting Error For Add Safety : ' + JSON.stringify(error));

  }
}
