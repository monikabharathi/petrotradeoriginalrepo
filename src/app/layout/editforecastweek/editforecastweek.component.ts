import { Component, OnInit } from '@angular/core';
import { PassdataService } from '../../services/passdata.service';
import { RestapiService } from '../../services/restapi.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-editforecastweek',
  templateUrl: './editforecastweek.component.html',
  styleUrls: ['./editforecastweek.component.css']
})
export class EditforecastweekComponent implements OnInit {
  forecastweekvalue: any;
  productlist: any;
  values: any;
  form: any;
  msg: any;
  mysubmit: any;
  forecast: any = {};
  selectedProduct: any = [];
  selectedProductList: any = [];
  constructor(
    private passData: PassdataService,
    private toastr: ToastrService,
    private rest: RestapiService,
    private router: Router,
    private Data: DataService
  ) { }
  ngOnInit() {
    let data = this.passData.getJSONData();
    this.forecastweekvalue = this.passData.getJSONData();
    console.log('view Stocklist Data in viewforecastweek page== : ' + JSON.stringify(data));
    for (let i of data) {
      this.selectedProduct.push(i.PRODUCT_LIST);
    }
    this.selectedProductList = this.selectedProduct;
    console.log('selectedProductList: ' + JSON.stringify(this.selectedProductList));


    let data1 = this.Data.getJSONData();
    this.values = this.Data.getJSONData();
    console.log('datas in viewforecastweek page== : ' + JSON.stringify(data1));

this.forecast.forecastdate=data1.FORECAST_DATE;
this.forecast.depotname=data1.DEPOTNAME;
  }

  //Getting The Edit weekly forecast Values After Submit
  validateforecast(f: NgForm) {

    console.log('Getting The Edit weekly forecast Values After Submit');
    console.log('Final Data : ' + JSON.stringify(this.forecastweekvalue));


    for (let cm of this.forecastweekvalue) {


      for (let sm of cm.PRODUCT_LIST) {
  
        if(sm.FORECAST_QUANTITY === '')
        {
          alert('Please Enter Values Of Products ');
  return false;
  
        }
  
  
  
      }
  
      
     }
  

     //return false;

     this.mysubmit=true;
     this.msg="Please wait processing  and don't refresh !!!";



    const postData = {
      data: this.forecastweekvalue
    };
    //Sending The Edited Values For weekly forecast
    console.log('Sending The weekly forecast Edited Values : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('editweeklyforecast', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespEditweeklyforecast(res),
        error => this.GetErrorEditweeklyforecast(error));
  }

  //Getting Response For Edit  weekly forecast
  GetRespEditweeklyforecast(resp) {
    this.msg="";
    this.mysubmit=false;
    console.log('Getting Response For Edit B weekly forecast : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('weekly forecast Edit Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/forecastweek']);
        console.log('Navigate To  weekly forecast');
      }, 3000);
    } else {
      console.log('Edit weekly forecast Failed');
      this.toastr.error(resp.RESP_DESC);
    }
  }
  //Getting Error For  weekly forecast
  GetErrorEditweeklyforecast(error) {
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
    console.log('Getting Error For Edit weekly forecast : ' + JSON.stringify(error));
  }
}