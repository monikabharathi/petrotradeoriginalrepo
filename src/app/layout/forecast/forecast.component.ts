import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { Color, BaseChartDirective } from 'ng2-charts';
import {RestapiService} from '../../services/restapi.service';
import * as jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
  providers:[
    DatePipe
    ]
})
export class ForecastComponent implements OnInit {
  type: string;
  width: string;
  height: string;
  rowNum: any;
  title: any;
  depotnameforecast: any;
  productdata: any;
  loadAPI: Promise<any>;
  productsSel: any;
  depotsSel: any;
  filterargs = 'hello';
  items = [{title: 'hello world'}, {title: 'hello kitty'}, {title: 'foo bar'}];
  startDate: any;
  endDate: any;
  salesData: number[];
  varianceData: number[];
  varianceDatapositive : number[];
  varianceDatanegative: number[];
  forecastData: number[];
  productname:string[]
  forSaleChart: any = {};
  forcheck: any ={};
  response;
  displayedColumns=[];
  productlist = [];
  collection = { data: [] };
  tabledataforecast = {data: []};
  dataSource: any = [];
  dataSource1: any;
  showTable: number=0;
  DepotId: any;
  firstDay: any;
  lastDay:any;
  checkLoading:number=0;
  checkLoadingOne:number=0;
  reportform:FormGroup;
  reportform1:FormGroup;
  productHeaderAllOption: any = [];
  primaryHeaderAllOption: any = [];
  dontshow: boolean = false;
  newdata:any = [];
  bsValue: Date = new Date(2017, 7);
  minMode: BsDatepickerViewMode = 'month'; 
  bsConfig: Partial<BsDatepickerConfig>;

  public lineChartPlugins: any;
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Forecast' },
    { data: [], label: 'Actual' },
    { data: [], label: 'Variance %', yAxisID: 'yAxis2',type: "Bar"},
    { data: [], label: 'Variance %', yAxisID: 'yAxis2',type: "Bar"}
  ];
  public lineChartLabel = [
    { data: [], label: 'Date' }
  ];


  isPositive: boolean = true;
  linechartDataArray: any = {};
  productViewTable = [];
  saleOverViewTable=[];
  public lineChartLabels: Label[] = [];

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: 'rgba(153,0,0,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // red
      backgroundColor: 'rgba(255,255,255,0.3)',
      borderColor: 'rgba(0,102,204,1)',
      pointBackgroundColor: 'rgba(0,102,204,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,102,204,0.8)'
    },
    {
      backgroundColor: 'green',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    {
      backgroundColor: 'pink',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartOptions = {
    scales: {
      xAxes: [{
        gridLines : {
          display : true
        },
      type: 'time',
      time: {
        unit: 'week',
        unitStepSize: 1,
        isoWeekday: true,
        round: 'week',
        tooltipFormat: 'MMM DD, YYYY',
        displayFormats: {
          hour: 'MMM DD, YYYY'
        }
      }
      }],
     
      yAxes: [{
        scaleLabel: {
               display: true,
               labelString: 'Volume in KL',
              fontSize: 15,
             },
             ticks: {  beginAtZero: true,
              // steps : 1,
              // stepValue : 1,
              // max : 1500
            }
              ,
        id: 'yAxis1',
        position: 'left'
      },
      {
        id: 'yAxis2',
        position: 'right',

        ticks: {
          beginAtZero: true,
          callback: label => `${label}%`,
          // steps : 10,
          // stepValue : 10,
          // max : 100,
        }
        

        
    }
    ]
   
    },
    legend: {
      position: 'top',
      labels: {
        fontSize: 12,
        usePointStyle: true
      }
    }
  };

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  // barc chart
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { 
      xAxes: [{
        gridLines : {
          display : false
        }
      }],
    yAxes: [{
      gridLines : {
        display : false
      }
    }] },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [];

  // dognut chart
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOption: ChartOptions = {
    responsive : true,
    maintainAspectRatio: true,
  };
 
 
  constructor(private router:Router,private rest:RestapiService,private toastr: ToastrService,private fb:FormBuilder,private datepipe:DatePipe) {
    this.createForm();
    this.createFormOne();
  }



  ngOnInit() {
    debugger;
    this.bsConfig = Object.assign({}, {
      minMode : this.minMode
    });

    



 
this.showTable=1;

let postData1 = {
  listcall: ''
  };//check:1
  this.rest.sendPostRequest('authorizeddepotlist',JSON.stringify(postData1)).subscribe(res=>{
  console.log("depot list came "+JSON.stringify(res));
  this.response=res;
  this.collection.data=this.response;
  console.log("all depot names "+this.collection.data); 
  if(this.collection.data.length>0){
    this.depotnameforecast = this.collection.data[0].DEPOT_ID;
  }
let postData1={
  depotname:this.depotnameforecast,
  reportname:"Forecast Performance",
  fromdate: this.datepipe.transform(new Date(), "yyyy-MM-dd"),
  todate:this.datepipe.transform(new Date(), "yyyy-MM-dd"),
  productid:'all',
  check:2
  }
  console.log(postData1+"To check postdata process");
this.rest.sendPostRequest('getTableForcecast',JSON.stringify(postData1)).subscribe(res=>{
  this.response=res;
  if(this.response){
    let postData={
      depotid:'all',
      fromdate: this.datepipe.transform(new Date(), "yyyy-MM-dd"),
      todate: this.datepipe.transform(new Date(), "yyyy-MM-dd"),
      productid:'all',
      type:'actualforcast'
      }
    this.rest.sendPostRequest('getforcecastdashboard1',JSON.stringify(postData)).subscribe(res=>{
      this.forSaleChart=res;
      console.log(this.forSaleChart);
      //this.tabledataforecast.data = JSON.parse(this.forSaleChart);
    console.log("forecast dashboard resp"+JSON.stringify(this.forSaleChart)); 
    this.setDataForActualChart(this.forSaleChart);
    this.tableforecast(this.forSaleChart);
    this.checkLoading=1;
    });
  }

  
 
    
  this.getDisplayedColumn(this.response.RESP_STATUS);
    let separatobj = this.setObjectseparate(this.response.RESP_STATUS);
    let finalList  = this.setMergeObj(separatobj);
    let tempArr = [];
    let colums = [];
    finalList.forEach((Obj)=>{
        for(let key in Obj){
       
          if (tempArr.indexOf(key) < 0) {
            if (this.keyToExclude.includes(key)) {
              if (!tempArr.includes(key) && (!tempArr.includes('Date') || this.keyToExclude.includes(key))) {
                colums.push(key);
                tempArr.push(key);
              }
            } else {
              colums.push(key);
              tempArr.push(key);
            }
          }
        }
    }); 

    colums.forEach((key)=>{
      if (this.keyToExclude.includes(key)) {
          this.displayedColumns.push(key);
      }
    });
    
    colums.forEach((key)=>{
      if (
        
        !key.includes("Total") && !this.keyToExclude.includes(key)
      ) {
          this.displayedColumns.push(key);
      }
    });

    colums.forEach((key)=>{
      if(key.includes('Total') ){
          this.displayedColumns.push(key);
      }
    });

   
  
    
    this.dataSource = finalList;
  
      console.log("dataSorce data "+JSON.stringify(this.dataSource));
      
    console.log("displayed columns data "+this.displayedColumns);
  
 
this.productHeaderAllOption = [];
let count:any = {};
let primaryCount={};
this.displayedColumns.forEach((i) => {
  if (!i.includes("Date") && !this.keyToExclude.includes(i)) {
    const Product = i.split("_")[0] + "_" + i.split("_")[1];
    count[Product] =
      (count[Product] || 0) + 1;
      const primary = i.split("_")[0];
      primaryCount[primary] = (primaryCount[primary] || 0) + 1;
  }

});

//For setting the header
for (let product in count) {
  this.productHeaderAllOption.push(product);
}

//For setting the header
  
this.primaryHeaderAllOption = primaryCount;
this.productHeaderAllOption.unshift("dummy");




this.primryHeader.unshift('date');

  
  this.products.unshift('dummy')
  setTimeout(() => {
    let width = `${this.displayedColumns.length *130}px`;
    let el:HTMLElement = document.getElementsByTagName('table')[0];
    el.style.width = width ? width : '1024px';
  }, 0);
  //this.checkLoading=0;

  error => this.getError(error);
 });
  });


 let postData3={
  depotid:'all',
  productid:'all',
  fromdate: this.datepipe.transform(new Date(), "yyyy-MM-dd"),
  todate: this.datepipe.transform(new Date(), "yyyy-MM-dd"),  
  type:'actual'
  }
  this.rest.sendPostRequest('getforcecastdashboard2',JSON.stringify(postData3)).subscribe(res=>{
    this.response=res;
    console.log(this.response);
   
    if(this.response){
      this.setProductViewChart(this.response);
      let postData={
        depotid:'all',
        productid:'all',
        fromdate: this.datepipe.transform(new Date(), "yyyy-MM-dd"),
        todate: this.datepipe.transform(new Date(), "yyyy-MM-dd"),  
        type:'salegraph'
      }
        this.rest.sendPostRequest('getforcecastdashboard3',JSON.stringify(postData)).subscribe(res=>{
          this.response=res;
          console.log(this.response+"this.response");
         
          this.setProductViewDonut(this.response);
        });
        }

  });
  this.checkLoadingOne=1;
   
  
 

   
    let postData = {
      listcall: ''
      };//check:1
      this.rest.sendPostRequest('authorizeddepotlist',JSON.stringify(postData)).subscribe(res=>{
      console.log("depot list came "+JSON.stringify(res));
      this.response=res;
      this.collection.data=this.response;
      console.log("all depot names "+this.collection.data); 
      
      });
      error => this.getError(error);



  
  
  
  }

  tableforecast(data){
    for(let colKey of this.products){
      console.log("colkey values in the data"+data[colKey]);
      console.log("this.products"+this.products);
      if(data[colKey]){
        this.newdata = data[colKey];
        console.log("newdata values"+ this.newdata);
      }
     
    }
    
  }
  createForm(){
    console.log("came create form");
    this.reportform=this.fb.group({
    depotname:['',Validators.required],
    productid:['',Validators.required],
    fromdate:['',Validators.required],
    todate:['',Validators.required]
    });
    
    }

    createFormOne(){
      console.log("came create form one");
      this.reportform1=this.fb.group({
      fromdte:['',Validators.required],
      todte:['',Validators.required]
      });
      
      }

 identify(index, key){
  return key; 
     }
      
emptyValue (fromdate){
  //this.todateState=1;
   if(fromdate > this.reportform.controls['todate'].value){
   this.reportform.controls['todate'].setValue('');
   }
  }
 
  emptyValue1 (fromdte){
    //this.todateState=1;
     if(fromdte > this.reportform1.controls['todte'].value){
     this.reportform1.controls['todte'].setValue('');
     }
    }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  setDataForActualChart(data) {
    
    for(let key in data) {
        this.lineChartData = [
          { data: [], label: "Forecast" },
          { data: [], label: "Actual", yAxisID: 'yAxis1' },
          { data: [], label: "Variance %", yAxisID: 'yAxis2', "type": "bar"},
          { data: [], label: "Variance %", yAxisID: 'yAxis2', "type": "bar"}
        ];
        this.linechartDataArray[key] = {};
        this.linechartDataArray[key].label = data[key].map((el) => el.date);
        console.log("1 line"+ this.lineChartLabels);
        this.forecastData =  data[key].map((el) => el.forcast);
        console.log("2 forxcaste"+ this.forecastData);
        this.salesData =  data[key].map((el) => el.Actual);
        console.log("3 sales"+ this.salesData);
        console.log("how undefined"+this.varianceData);
       
        this.varianceDatapositive = data[key].map((el) => el.VARIANCE_BY_PERCENTAGE_POSITIVE);
        this.varianceDatanegative = data[key].map((el) => el.VARIANCE_BY_PERCENTAGE_NEGATIVE);
        console.log("variance data values"+this.varianceData);
        
      
        this.lineChartData[0].data = this.forecastData;
        this.lineChartData[1].data = this.salesData;
        this.lineChartData[2].data = this.varianceDatapositive;
        this.lineChartData[3].data = this.varianceDatanegative;
        
        this
        this.linechartDataArray[key].data = this.lineChartData;
        console.log("ayiooo monika ena idhu"+this.linechartDataArray[key].data);
        console.log("linechartData Array " +JSON.stringify(this.linechartDataArray));
       
        console.log("line chart lable "+this.lineChartLabels);
        console.log('this.varianceData: ' + JSON.stringify(this.varianceData));
      
    }
    

  }
  getColor(data) {
    console.log('All Data: ' + JSON.stringify(data));
    /**this.lineChartColors[2] = 
      {
        backgroundColor: (i>0?'green':'red'),
        borderColor: (i>0?'green':'red'),
        pointBackgroundColor: (i>0?'green':'red'),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: (i>0?'green':'red')
      };
      */
  }
  setProductViewChart(data) {
    console.log("monika data"+data);
    this.barChartData=[];
    this.barChartLabels=[];
    for (let key in data) {
      this.barChartLabels = Object.values(data[key]).map((el: any) => el.date);
    }

    for (let key in data) {
      let temp: any = {
        fill: false,
        label: key,
      };
      temp.data = [];
      for (let value of this.barChartLabels) {
        for (let inner of data[key]) {
          if (inner.date === value) {
            temp.data.push(inner.Actual);
          }
        }
      }
      this.barChartData.push(temp);
    }
    console.log(this.barChartData);
  
    this.productViewTable=[];
    for(let key in data){
      let temp:any =  {};
      temp.label = key;
      const highValue = this.findBig(data[key]);
      temp.date =  highValue[0].date; 
      temp.actual =  highValue[0].Actual; 
      this.productViewTable.push(temp);
    }

  }


  findBig(data = []){
    return data.sort((a,b) => Number(a.Actual) > Number(b.Actual) ? -1 : 1)
  }

  setProductViewDonut(object) {
    this.doughnutChartLabels=[];
    this.doughnutChartData=[];
    var temp = [];
    for (let key in object) {
   
     temp.push(Number(object[key]));
    this.doughnutChartLabels.push(key);
    }
    this.doughnutChartData.push(temp);
    this.saleOverViewTable=[];
    for(let key in object){
      let tempObj :any={}
      tempObj.label=key;
      tempObj.data=object[key];
      this.saleOverViewTable.push(tempObj);
    }
  
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  initChart1(date, forecastData, salesData, key){
    this.lineChartData = [
      { data: [], label: "Forecast" },
      { data: [], label: "Actual" },
      { data: [], label: "Variance" }
    ];
    this.lineChartLabel =[
      { data: [], label: "Date" }
    ]

    this.lineChartData[0].data = forecastData;
    this.lineChartData[1].data = salesData;
    this.lineChartData[2].data = salesData;
    this.linechartDataArray[key] = this.lineChartData;    
    this.lineChartLabel[0].data = date;
    //this.lineChartLabels[key] = this.lineChartLabel[0]
  }
 //Getting The Product List For Add BulkStock Based on DepotidSelection
getproductlistfordepot(depotid: string): void {
 
  this.DepotId = depotid;
  console.log("Depotid Selection For ProductList in Add BulkStock" + depotid);
  let postData = {
  depotid: depotid,
  };
  //Sending Request For Getting The product List For Add BulkStock
  console.log('Sending Request For Getting The Product List For Add BulkStock : ' + JSON.stringify(postData));
  this.rest.sendPostRequest('getProductsforrepots', JSON.stringify(postData))
  .subscribe(
  res => this.GetRespProductListbBulkStock(res),
  error => this.GetErrorProductListBulkStock(error));
  //}
  }
  
  //Getting Response For ProductList To Add BulkStock
  GetRespProductListbBulkStock(resp) {
  
  // this.pustproductlist=resp;
  this.productlist = resp;
  console.log('Resp :: '+this.productlist.length);
  
  if(this.productlist.length !== 0)
  {
  }
  else{
  // this.productid=null;
  this.toastr.error("No Products Are Configured With Selected Depot !!! ");
  setTimeout(() => {
  this.toastr.clear();
  }, 2000);
  
  setTimeout(() => {
  // this.router.navigate(['/allreports']);
  console.log('Navigate to login');
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

  onProductChanged() {
    console.log('Product Changed');
    let sd = [304, 371, 342, 347];
    let fd = [357, 350, 342, 347];
    if (this.productsSel === 'GSL91R') {
      sd = [304, 371, 342, 347];
      fd = [357, 350, 342, 347];
    } else if (this.productsSel ===  'DSL') {
      sd = [314, 351, 342, 327];
      fd = [327, 350, 322, 337];
    } else {
      sd = [334, 321, 342, 367];
      fd = [357, 310, 352, 347];
    }
   
  }
  
  downloadPng(product,event, index) {
    const anchor = event.target;
    // anchor.href = document.getElementById('canvas')[0].toDataURL();
    anchor.href = document.getElementsByTagName('canvas')[index].toDataURL();
    anchor.download = 'Actual Sales vs Forecast_['+product+']_'+new Date()+'.png';
  }
  downloadPdf(product,event, index) {
    const anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[index].toDataURL();
    const pdf = new jsPDF();
    pdf.addImage(anchor.href, 'jpg', 5, 20);
    pdf.save('Actual Sales vs Forecast_['+product+']_'+new Date()+'.pdf');
  }
  downloadJpg(product,event, index) {
    const anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[index].toDataURL();
    anchor.download = 'Actual Sales vs Forecast_['+product+']_'+new Date()+'.jpg';
  }
  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  public chartDognutClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartDognutHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  //  linechart
  public lineChartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public lineChartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  showgraph(data) {
    console.log('ddd'+data );
    this.rowNum = data;
    if( this.rowNum=='ALL'){
      this.productdata = 'ALL';
      console.log('productdata'+ this.productdata );
    }
    else{

      this.productdata = '';
      console.log('productdata'+ this.productdata );
    }
  }
  keyToExclude = ['To','Week',"Day","Weekdays","Sunday","MonthID", "Date","WeekNo","WeekDay","date","dummy","Month"];
  onSubmit(form){
    this.displayedColumns=[];
    this.primryHeader=[];
    this.productHeaderAllOption=[];
    this.linechartDataArray={};
    
  let postData={
    depotname:form.value.depotname,
    reportname:"Forecast Performance",
    fromdate: this.datepipe.transform(form.value.fromdate, "yyyy-MM-dd"),
    todate:this.datepipe.transform(new Date(), "yyyy-MM-dd"),
    productid:form.value.productid,
    check:2
    }
  this.rest.sendPostRequest('getTableForcecastonrange',JSON.stringify(postData)).subscribe(res=>{
    this.response=res;
    //&& Object.keys(this.response.RESP_STATUS).length > 0
    if(this.response){
      //RESP_STATUS
      let postData={
        depotid:form.value.depotname,
        fromdate: this.datepipe.transform(form.value.fromdate, "yyyy-MM-dd"),
        todate: this.datepipe.transform(form.value.todate, "yyyy-MM-dd"),
        productid:form.value.productid,
        type:'actualforcast'
        }
      this.rest.sendPostRequest('getforecastdashboardonrange',JSON.stringify(postData)).subscribe(res=>{
        this.forSaleChart=res;
        
    
      console.log("forecast dashboard resp"+JSON.stringify(this.forSaleChart)); 
      this.setDataForActualChart(this.forSaleChart);
      
      });
      this.checkLoading= 1 ;
        this.showTable=1;
    }else{
        this.checkLoading=2;
        this.showTable=0;
      
    }
 
   
      
    this.getDisplayedColumn(this.response.RESP_STATUS);
      let separatobj = this.setObjectseparate(this.response.RESP_STATUS)
      let finalList  = this.setMergeObj(separatobj);
      let tempArr = [];
      let colums = [];
      finalList.forEach((Obj)=>{
          for(let key in Obj){
           
            if (tempArr.indexOf(key) < 0) {
              if (this.keyToExclude.includes(key)) {
                if (!tempArr.includes(key) && (!tempArr.includes('Date') || this.keyToExclude.includes(key))) {
                  colums.push(key);
                  tempArr.push(key);
                }
              } else {
                colums.push(key);
                tempArr.push(key);
              }
            }
          }
      }); 

      colums.forEach((key)=>{
        if (this.keyToExclude.includes(key)) {
            this.displayedColumns.push(key);
        }
      });
      
      colums.forEach((key)=>{
        if (
          
          !key.includes("Total") && !this.keyToExclude.includes(key)
        ) {
            this.displayedColumns.push(key);
        }
      });

      colums.forEach((key)=>{
        if(key.includes('Total') ){
            this.displayedColumns.push(key);
        }
      });

     
      
      
      this.dataSource = finalList;
        console.log("dataSorce data "+JSON.stringify(this.dataSource));
      console.log("displayed columns data "+this.displayedColumns);

   
  this.productHeaderAllOption = [];
  let count:any = {};
  let primaryCount={};
  this.displayedColumns.forEach((i) => {
    if (!i.includes("Date") && !this.keyToExclude.includes(i)) {
      const Product = i.split("_")[0] + "_" + i.split("_")[1];
      count[Product] =
        (count[Product] || 0) + 1;
        const primary = i.split("_")[0];
        primaryCount[primary] = (primaryCount[primary] || 0) + 1;
    }
  
  });

  //For setting the header
  for (let product in count) {
    this.productHeaderAllOption.push(product);
  }
  
  //For setting the header
    
  this.primaryHeaderAllOption = primaryCount;
  this.productHeaderAllOption.unshift("dummy");




this.primryHeader.unshift('date');

    
    this.products.unshift('dummy')
    setTimeout(() => {
      let width = `${this.displayedColumns.length *130}px`;
      let el:HTMLElement = document.getElementsByTagName('table')[0];
      el.style.width = width ? width : '1024px';
    }, 0);
    

    error => this.getError(error);
   });
   
  }
  onSubmitOne(form){
    
   
    let postData={
      depotid:'all',
      productid:'all',
      fromdate: this.datepipe.transform(form.value.fromdte, "yyyy-MM-dd"),
      todate: this.datepipe.transform(form.value.todte, "yyyy-MM-dd"),  
      type:'actual'
      }
      this.rest.sendPostRequest('getforcecastdashboard2',JSON.stringify(postData)).subscribe(res=>{
        this.response=res;
        if(this.response){
          this.setProductViewChart(this.response);
          let postData={
            depotid:'all',
            productid:'all',
            fromdate: this.datepipe.transform(form.value.fromdte, "yyyy-MM-dd"),
            todate: this.datepipe.transform(form.value.todte, "yyyy-MM-dd"),  
            type:'salegraph'
          }
            this.rest.sendPostRequest('getforcecastdashboard3',JSON.stringify(postData)).subscribe(res=>{
              this.response=res;
            
              this.setProductViewDonut(this.response);
            });
            }
 
      });
      this.checkLoadingOne=1;
  }
   products=[]; primryHeader=[]; productForForCast= {}; productForForCastCount = {};
   getDisplayedColumn = (res)=>{
   
    for(let key in res){
     this.productForForCast[key] = [];
     this.primryHeader.push(key);
       for(let key1 in res[key]){
           for (let key2 in res[key][key1]){
               for (let key3 in  res[key][key1][key2]){
                   for(let key4 in res[key][key1][key2][key3]){
                       if(this.products.indexOf(key4) < 0){
                         this.productForForCast[key].push(key4);
                         this.productForForCastCount[key] = (this.productForForCastCount[key] || 0) +1
                         this.products.push(key4);	
                       }
                   }
               }
           }
       }
     }
    this.productForForCastCount['Total'] = this.products.length;
   }
 
 
   setMergeObj = (finalJsonObj)=>{
 
     let originalJson = [];
     let tempArry = [];
     for(let objKey in finalJsonObj){
        for(let product of finalJsonObj[objKey]){
         let index = tempArry.indexOf(product['Date']);
             if(index < 0){
                 originalJson.push(product);
                 tempArry.push(product['Date']);
             }else{
                 originalJson[index] =  {...originalJson[index],...product};
             }
        }
     }
     return originalJson;
   }
 
   setObjectseparate = (res) =>{
    let finalJsonObj = [];
    for(let key in res){
      let realList = [];
      for(let key1 in res[key]){
          for (let key2 in  res[key][key1]){
              
              let tempObj = {};
              let tempArry = [];
              for (let key3 of res[key][key1][key2]){
            
               

                      for(let colKey of this.products){
                        let productKey = Object.keys(key3).toString();
                        let valueObj = key3 ? key3[colKey] : '';
                        if(!tempArry.includes(colKey)){
                         
                         
                            if (colKey === productKey && !tempArry.includes(colKey)) {
                              tempObj["Week"] = valueObj  ? valueObj["0"]["WeekNo"]  : "";
                              tempObj["Date"] = valueObj ? valueObj["0"]["FromDate"] : "";
                              tempObj["To"] = valueObj ? valueObj["0"]["ToDate"] : "";
                              tempObj[key + "_" + colKey + "_Forecast"] = valueObj  ? valueObj["0"]["Forecast"]: "";
                              tempObj[key + "_" + colKey + "_Actual"] = valueObj? valueObj["0"]["Actual"]: "";
                              tempObj[key + "_" + colKey + "_UnitVarience"] = valueObj? valueObj["0"]["UnitVarience"]: "";
                              tempObj[key + "_" + colKey + "_PercentVarience"] = valueObj? valueObj["0"]["PercentVarience"]: "";
                              tempArry.push(productKey);
                            }
                          
                        }
                   
                         
                        
                    }  
            }
              realList.push(tempObj);
          }
      }
      finalJsonObj[key] =  realList;
  }
    return finalJsonObj;
  }

  

getError(error) {
  console.log(error);
}




}
