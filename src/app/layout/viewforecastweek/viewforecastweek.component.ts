import { Component, OnInit } from '@angular/core';
import { PassdataService } from '../../services/passdata.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-viewforecastweek',
  templateUrl: './viewforecastweek.component.html',
  styleUrls: ['./viewforecastweek.component.css']
})
export class ViewforecastweekComponent implements OnInit {
  forecastweekvalue: any;
  productlist: any;
  values: any;
  forecast: any = {};
  selectedProduct: any = [];
  selectedProductList: any = [];
  constructor(
    private passData: PassdataService,
    private Data: DataService,
  ) { }

  ngOnInit() {
    let data = this.passData.getJSONData();
    this.forecastweekvalue = this.passData.getJSONData();
    console.log('view Stocklist Data in viewforecastweek page== : ' + JSON.stringify(data));
    
   for (let i of data) {
      this.selectedProduct.push(i.PRODUCT_LIST);
      }
   
    this.selectedProductList =this.selectedProduct;
    console.log('prodlist : ' + JSON.stringify(this.selectedProduct));
    console.log('selectedProductList: ' + JSON.stringify(this.selectedProductList));
 
     let data1 = this.Data.getJSONData();
    this.values = this.Data.getJSONData();
    console.log('datas in viewforecastweek page== : ' + JSON.stringify(data1));

this.forecast.forecastdate=data1.FORECAST_DATE;
this.forecast.depotname=data1.DEPOTNAME;
 }
 Number (value) { return Number(value)}


}




