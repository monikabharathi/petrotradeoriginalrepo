import { Component, OnInit } from '@angular/core';
import { PassdataService } from '../../services/passdata.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestapiService } from '../../services/restapi.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editdailyforecast',
  templateUrl: './editdailyforecast.component.html',
  styleUrls: ['./editdailyforecast.component.css'],
  providers: [
    DatePipe
  ]
})
export class EditdailyforecastComponent implements OnInit {
  forecastlist: any;
  form: any;
  msg: any;

  mysubmit: any;
  dailyforecast: any = {};
  constructor(
    private passData: PassdataService,
    private router: Router,
    private rest: RestapiService,
    private datePipe: DatePipe,
    private toastr: ToastrService

  ) { }
  //Edit Forecastdaily Data in editforecastd page
  ngOnInit() {
    this.mysubmit=false;
    let data = this.passData.getJSONData();
    this.forecastlist = this.passData.getJSONData();
    console.log("forecastdata" +this.forecastlist);
    console.log('Edit Forecastdaily Data in editforecastd page : ' + JSON.stringify(data));
    let depotname;
    let productname;
    let depotid;
    let productid;
    for (let i of data) {
      depotname = i.DEPOTNAME;
      productname = i.PRODUCTNAME;
      depotid = i.DEPOT_ID;
      productid = i.PRODUCT_ID;
    }
    console.log('depotname---: ' + depotname);
    console.log('productname---: ' + productname);
    console.log('depotid---: ' + depotid);
    console.log('productid---: ' + productid);

    this.dailyforecast.depotname = depotname;
    this.dailyforecast.productname = productname;
    this.dailyforecast.depotid = depotid;
    this.dailyforecast.productid = productid;
  }
  //Getting The Edit Daily forecast Values After Submit
  validateDailyForecast(f: NgForm) {
    this.mysubmit=true;
    this.msg="Please wait processing  and don't refresh !!!";

    console.log('Getting The Edit Daily forecast Values After Submit');
    console.log('depotid : ' + this.dailyforecast.depotid);
    console.log('productis : ' + this.dailyforecast.productid);
    console.log('Final Data : ' + JSON.stringify(this.forecastlist));
    const postData = {
      depotid: this.dailyforecast.depotid,
      productid: this.dailyforecast.productid,
      data: this.forecastlist
    };
    //Sending The Edited Values For Daily forecast
    console.log('Sending The Daily forecast Edited Values : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('editdailyforecastdetails', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespEditDailyForecast(res),
        error => this.GetErrorEditDailyForecast(error));
  }

  //Getting Response For Edit Daily forecast
  GetRespEditDailyForecast(resp) {
    console.log('Getting Response For Edit Daily Forecast : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('DailyForecast Edit Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/dailyforecast']);
        console.log('Navigate To dailyforecast');
      }, 3000);
    } else {
      console.log('Edit dailyforecast Failed');
      this.router.navigate(['/layout/dailyforecast']);

      this.toastr.error(resp.RESP_DESC);
    }
  }
  //Getting Error For Edit Daily forecast
  GetErrorEditDailyForecast(error) {
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
    console.log('Getting Error For Edit Daily forecast : ' + JSON.stringify(error));

  }
}