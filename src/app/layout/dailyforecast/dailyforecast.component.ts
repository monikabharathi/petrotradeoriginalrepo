import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { PassdataService } from '../../services/passdata.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dailyforecast',
  templateUrl: './dailyforecast.component.html',
  styleUrls: ['./dailyforecast.component.css'],
  providers: [
    DatePipe
  ]
})
export class DailyforecastComponent implements OnInit {
  depotlist = [];
  productlist = [];
  forecastd: any = {};
  form: any;
  isValidDate:any;
  constructor(
    private router: Router,
    private rest: RestapiService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private passData: PassdataService
  ) { }

  ngOnInit() {
    this.getdepotlist();
  }
 //Getting The Depot List For edit dailyforecast
 getdepotlist() {
  let postData = {
    listcall: ''
  };
  //Sending Request For Getting The Depot List For edit dailyforecast
  console.log('Sending Request For Getting The Depot List For edit dailyforecast  : ' + JSON.stringify(postData));
  this.rest.sendPostRequest('authorizeddepotlist', JSON.stringify(postData))
    .subscribe(
      res => this.GetRespDepotListDailyForecast(res),
      error => this.GetErrorDepotListDailyForecast(error));
}
//Getting Response For DepotList Toedit dailyforecast
GetRespDepotListDailyForecast(resp) {
  this.depotlist = resp;
  console.log('Getting Response For DepotList Toedit dailyforecast : ' + JSON.stringify(resp));
}
   //Getting Error For DepotList To edit dailyforecast
   GetErrorDepotListDailyForecast(error) {
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
  console.log('Getting Error For DepotList To edit dailyforecast : ' + JSON.stringify(error));
}

//Getting The Product List Foredit dailyforecast Based on DepotidSelection
getproductlistfordepot(depotid: string): void {
  console.log("Depotid Selection For ProductList inedit dailyforecast" + depotid);
  let postData = {
    depotid: depotid,
    listcall: 'PRODLINKDEPOT'
  };
   //Sending Request For Getting The product List For edit dailyforecast 
  console.log('Sending Request For Getting The Product List For edit dailyforecast : ' + JSON.stringify(postData));
  this.rest.sendPostRequest('homeproductlist', JSON.stringify(postData))
    .subscribe(
      res => this.GetRespProductListDailyForecast(res),
      error => this.GetErrorProductListDailyForecast(error));
}

//Getting Response For ProductList To edit dailyforecast
GetRespProductListDailyForecast(resp) {





  this.productlist = resp;
if(this.productlist.length === 0){

  this.toastr.error("No Products Are Configured With Selected Depot !!! ");
    setTimeout(() => {
      this.toastr.clear();
    }, 2000);
}


  console.log('Getting Response For ProductList To edit dailyforecast : ' + JSON.stringify(resp));
}
 //Getting Error For ProductList To edit dailyforecast
 GetErrorProductListDailyForecast(error) {
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
  console.log('Getting Error For ProductList To edit dailyforecast: ' + JSON.stringify(error));
}


//Getting Theedit dailyforecast Values After Submit
validateforecast(f: NgForm) {
  console.log('Getting The edit dailyforecast Values After Submit');
  console.log('depotid : ' + this.forecastd.depotname);
  console.log('productid : ' + this.forecastd.productname);
  console.log('fromdate : ' + this.datePipe.transform(this.forecastd.fromdate, "MM-dd-yyyy"));
  console.log('todate : ' + this.datePipe.transform(this.forecastd.todate, "MM-dd-yyyy"));


  this.isValidDate = this.validateDates(this.forecastd.fromdate, this.forecastd.todate);
  console.log('isValidDate '+ this.isValidDate);
  if(this.isValidDate){

    const postData = {
      depotid: this.forecastd.depotname,
      productid: this.forecastd.productname,
      fromdate: this.datePipe.transform(this.forecastd.fromdate, "MM-dd-yyyy"),
      todate: this.datePipe.transform(this.forecastd.todate, "MM-dd-yyyy"),
      formatedfromdate: this.datePipe.transform(this.forecastd.fromdate, "yyyy-MM-dd"),
      formatedtodate: this.datePipe.transform(this.forecastd.todate, "yyyy-MM-dd")
    };
    //Sending The Added Values For Safety Days
    console.log('Sending The forecast d Values:' + JSON.stringify(postData));
    this.rest.sendPostRequest('dailyforecastdetails', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespforecastd(res),
        error => this.GetErrorforecastd(error));
  }
else{
  this.toastr.error('To Date should be grater then From Date');
  console.log('To date should be grater then start From date');
  setTimeout(() => {
    this.toastr.clear();
  }, 2500);

}
}

validateDates(sDate: string, eDate: string){
  this.isValidDate = true;
  if((sDate != null && eDate !=null) && (eDate) < (sDate)){
    this.isValidDate = false;
  }
  return this.isValidDate;
}

//Get Response 
GetRespforecastd(resp) {
  this.passData.setJSONData(resp);
  console.log('Get Response for send particular edit dailyforecast: ' + JSON.stringify(resp));

  var length=resp.length;
   if(length===0){
   this.toastr.error('No records Found');
    console.log('No records Found');
    setTimeout(() => {
      this.toastr.clear();
    }, 2500);
  
  }
  else{
    this.router.navigate(['/layout/editdailyforecast']);
  }
 
}
//Get Error 
GetErrorforecastd(error) {
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
  console.log('Get Error for send particular edit dailyforecast: ' + JSON.stringify(error));
}
}
