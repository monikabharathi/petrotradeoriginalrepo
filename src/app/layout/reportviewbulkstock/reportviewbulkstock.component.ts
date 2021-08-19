import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {PassdataService} from '../../services/passdata.service';
import {RestapiService} from '../../services/restapi.service';
import {MatSort} from '@angular/material/sort';
import { DownloadservicesService } from '../../services/downloadservices.service';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
// declare const require: any;
// const jsPDF = require('jspdf');
// require('jspdf-autotable');


@Component({
  selector: 'app-reportviewbulkstock',
  templateUrl: './reportviewbulkstock.component.html',
  styleUrls: ['./reportviewbulkstock.component.scss']
 
})
export class ReportviewbulkstockComponent implements OnInit {
 reportname:string;
 depotname:string;
 fromdate:string;
 todate:string;
 productarray=[];
 reportanddepot:any[];
 collection=[];
 response;
 resp;
 value:any;
 displayedColumns=[]; 
 dataSource;
 renderedData: any;
 choosereport;
 productid;
 colSpan=1;
 dummyColspan=1;
 checkLoading=0;
 backpath;
 total;
 excel:boolean=true;
 //Variable For Purchase summary
 primaryHeaderPs: any = [];
 productHeaderPs: any = [];
 globalHeaderPs: any = [];
 primaryHeaderLengthPs: any = {};
 productHeaderLengthPs: any = {};
 productHeaderAllOption: any = [];
 primaryHeaderAllOption: any = [];
 globalHeaderLengths: any = {};
 //End of variable for purchase summary
 EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';  
  constructor(private passdata:PassdataService, private rest:RestapiService, 
    private downloadservice:DownloadservicesService,private httpClient: HttpClient,private router:Router) { 

      this.dataSource = new MatTableDataSource(this.collection);
     this.dataSource.connect().subscribe(d => this.renderedData = d);
    }
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('mytable', {static: true}) myTable: ElementRef;
  ngOnInit() {

    debugger;

     
     
    this.reportanddepot=this.passdata.getJSONData();
    this.depotname=this.reportanddepot[0];
    this.reportname=this.reportanddepot[1];
    this.fromdate=this.reportanddepot[2];
    this.todate=this.reportanddepot[3];
    this.productid=this.reportanddepot[4];
    this.backpath='/layout/'+this.reportanddepot[5];
    this.checkLoading=1;
    let postData={
    depotname:this.depotname,
    reportname:this.reportname,
    fromdate:this.fromdate,
    todate:this.todate,
    productid:this.productid,
    check:2
    }
   

    this.rest.sendPostRequest('getreportsdata',JSON.stringify(postData)).subscribe(res=>{
    this.response=res;

    console.log("reponse" +this.response);
  
      if (this.reportname == "Purchase Summary".trim() || this.reportname=="Forecast D".trim() || this.reportname == "Supply Plan Sale".trim()) {
        this.choosereport = "3";
      }
      else if(this.reportname=="Bulk Stock".trim() || this.reportname=="SPR".trim() || this.reportname == "Forecast Performance".trim() || this.reportname=="Supply Performance".trim() ){
        this.choosereport = "4";
        if(this.reportname=="Bulk Stock".trim())
        this.getTotalSum()
      } 
      else {
        this.choosereport = "2";
      }
     
      
    this.getDisplayedColumn(this.response.RESP_STATUS);

      let separatobj = this.setObjectseparate(this.response.RESP_STATUS);
    
      let finalList  = this.setMergeObj(separatobj);
   
      let tempArr = [];
      let colums = [];
      finalList.forEach((Obj)=>{
          for(let key in Obj){
            // if(!key.includes('Total') && !key.includes('date')){
            //     key = key.split('_')[1];
            // }
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

      if(this.reportname == "Supply Plan Sale"){
        colums.forEach((key)=>{
        if (this.keyToExclude.includes(key)) {
        this.displayedColumns.push(key);
        }
        });
        colums.forEach((key)=>{
        
        if(key.includes('Total Supply Plan') ){
          this.displayedColumns.push(key);
          }
        
        });
        colums.forEach((key)=>{
          if(key.includes('Total Supply Actual') ){
          this.displayedColumns.push(key);
          }
          
          
          });
        colums.forEach((key)=>{
        if (
        
        !key.includes("Total") && !this.keyToExclude.includes(key) && !key.includes("Sale")
        ) {
        this.displayedColumns.push(key);
        }
        
        if(key.includes('Total Sale')){
          this.displayedColumns.push(key);
          }
          
          
            
             
        });
        colums.forEach((key)=>{
          if (
        
            !key.includes("Total") && key.includes("Sale Forecast")
            ) {
            this.displayedColumns.push(key);
            }
            if (
      
              !key.includes("Total") && key.includes("Sale Actual")
              ) {
              this.displayedColumns.push(key);
              }
          
          
          });
        
        
        
        }else{
        colums.forEach((key)=>{
        if (this.keyToExclude.includes(key)) {
        this.displayedColumns.push(key);
        }
        });
        colums.forEach((key)=>{
          if(key.includes('Total Product') ){
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
        if(key.includes('Total_Depot') ){
        this.displayedColumns.push(key);
        }
        });
       
        }

     
      if(this.reportname != "Supply Plan Sale"){
        this.displayedColumns = this.displayedColumns.sort((a:string,b:string) => {
        if(!this.keyToExclude.includes(a) && !this.keyToExclude.includes(b) && !a.includes('Total') && !b.includes('Total')){
        return (a.split("_")[0] < b.split("_")[0] ? -1 : 1) * 1;
        }
        })
        }
     
      //finalList = finalList.sort(this.sortbyDate);
    
      this.dataSource = finalList;
    //   if(this.choosereport === '3' ){
    //     let col= (this.reportname =="Supply Plan Sale") ?  'Week' : 'Date';
    //   let sort ={active : col};
    //   this.sortData(sort);
    // }
    let col= (this.reportname =="Supply Plan Sale" || this.reportname=="Forecast Performance") ? 'Week' : 'Date';
let sort ={active : col, direction : 'asc'};
this.sortData(sort);

     
      if(this.dataSource.length ==0){
        this.excel=false;
      }
      //let sort={active : 'WeekNo'}
    // this.sortData(sort);
   
if (this.reportname == "Purchase Summary".trim() || this.reportname == "Supply Plan Sale".trim() || this.reportname=="Forecast D".trim() ) {
  this.setPurchaseSummaryHeaders();
}


if(this.choosereport === '4'){
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

  console.log('---->',this.productHeaderAllOption);
}


this.primryHeader.unshift('date');
if(this.choosereport != '4' && this.choosereport != '5'){
  this.primryHeader.push('Total');
}
    
    this.products.unshift('dummy');
    this.primryHeader = [];
    for(let key of this.productHeaderAllOption){
      var newheader = key.split('_')[0];
this.primryHeadernew.push(newheader);
    }
    var myArr = this.primryHeadernew;
    var mySet = new Set(myArr);
    myArr = [...mySet];
    console.log(myArr);
    this.primryHeader = myArr;
    
    this.primryHeader.splice(this.primryHeader[0],1);
    this.primryHeader.unshift('date');
    console.log("this.primaryheader mudila" +this.primryHeader);
    console.log(this.productHeaderAllOption+"productHeaderAllOption vales idha vachi edhuna panalam");
    console.log("primary header values" +this.primryHeader);
    console.log(this.products+"Find products");
    setTimeout(() => {
      let width = `${this.displayedColumns.length *130}px`;
      let el:HTMLElement = document.getElementsByTagName('table')[0];
      el.style.width = width ? width : '1024px';
    }, 0);
    this.checkLoading=0;

    error => this.getError(error);
   });
   
  }


getTotalSum(){
  let postData={
    depotname:this.depotname,
    reportname:this.reportname,
    fromdate:this.fromdate,
    todate:this.todate,
    productid:this.productid,
    check:2
    }
    this.getTotalValues();
  this.rest.sendPostRequest('getReportsSum',JSON.stringify(postData)).subscribe(res=>{
    this.resp=res;
     this.total=this.resp.RESP_STATUS;
    this.getTotalValues();
    error => this.getError(error);
  });
}

getBackgroundColor(row,column){
  let color;
  if(this.reportname =='Supply Performance'){
  let depot = column.split('_')[0];
  let product = column.split('_')[1];
  let average: number;
  let value: number;

  if(column.includes('Actual')){

  
if(Number(row[depot+'_'+product+'_Actual']>0)){


let actual_format1 = (row[depot+'_'+product+'_Actual']); 
let plan_format1 =(row[depot+'_'+product+'_Plan']);




  average = (Number(actual_format1) - Number(plan_format1)) / Number(actual_format1);
 
}else{
 
  average =0;
 
  
}



value = (average*100);


 if(value > 5 || value < -5 || value==5 ||value ==-5){
   color = 'lightpink';
  
   
 }else{
  color = 'white';
 

 }



}
  }
  return color;
  }
  sortbyDate (a,b) {
    if(new Date(a.Date) > new Date(b.Date)){

      return 1;
    }else if(new Date(a.Date) < new Date(b.Date)) {

      return  -1;
    }else {
      return 0;
    }
  }


  keyToExclude = ['To','Week',"Day","Weekdays","Sunday","MonthID", "Date","WeekNo","WeekDay","date","dummy","Month"];
//For purchase summary-----------------------------------//
setPurchaseSummaryHeaders() {
  this.displayedColumns.forEach((i) => {
    if (!this.keyToExclude.includes(i)) {
      const Product = i.split("_")[0] + "_" + i.split("_")[1];
      this.productHeaderLengthPs[Product] =
        (this.productHeaderLengthPs[Product] || 0) + 1;
    }
  });

  //For setting the header
  for (let product in this.productHeaderLengthPs) {
    this.productHeaderPs.push(product);
    console.log(this.productHeaderPs+"Product Header");
  }
  this.productHeaderPs.unshift("date");

  this.displayedColumns.forEach((i) => {
    
    if (!this.keyToExclude.includes(i) ) {
      let primary = i.split("_")[0];
      this.primaryHeaderLengthPs[primary] =
        (this.primaryHeaderLengthPs[primary] || 0) + 1;
    }
  });

  for (let primary in this.primaryHeaderLengthPs) {
    this.primaryHeaderPs.push(primary);
   
  }
  this.primaryHeaderPs.unshift("primarydate");

  if (this.reportname == "Supply Plan Sale".trim()) {
    this.displayedColumns.forEach((i) => {
      if (!this.keyToExclude.includes(i)) {
        let global = i.split("_")[0].split(" ")[0];
        this.globalHeaderLengths[global] =
          (this.globalHeaderLengths[global] || 0) + 1;
      }
    });
    // for (let global in this.globalHeaderLengths) {
    //   this.globalHeaderPs.push(global);
    // }
    
    // this.globalHeaderPs.unshift("total");
    this.globalHeaderPs.push("globaldate");
    this.globalHeaderPs.push("Total");
    this.globalHeaderPs.push("Supply");
    this.globalHeaderPs.push("total");
    this.globalHeaderPs.push("Sale");
    
    
    

    
  }

  if(this.reportname =="Supply Plan Sale".trim()){
    this.colSpan=3;
    
  }
  else if(this.reportname=="Forecast D"){
    this.colSpan=4;
  }else{
    this.colSpan=3;
  }

}
//End of purchase summary------------------------------------------------//
totalArray=[];
getTotalValues (){
  for(let key of this.displayedColumns){
    if(this.total[key]){
      this.totalArray.push('Total_'+key+'_'+this.total[key]);
    }else{
      this.totalArray.push('Total_'+key);
    }
      
}

}

  products=[]; primryHeader=[];primryHeadernew=[]; productForForCast= {}; productForForCastCount = {};
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
                //for(let key4 in res[key][key1][key2][key3] ){
               

                      for(let colKey of this.products){
                        let productKey = Object.keys(key3).toString();
                        let valueObj = key3 ? key3[colKey] : '';
                        if(!tempArry.includes(colKey)){
                         
                         if (this.reportname == "Purchase Summary".trim() ||
                          this.reportname == "Supply Plan Sale".trim() || this.reportname=="Forecast D".trim() ) {
                            for (let key4 in valueObj) {
                              for (let key5 in valueObj[key4]) {
                               if (key5 != "supplierName" &&  key5 != "ProductName" &&   key5 != "Date"  ) {
                                 if(this.keyToExclude.includes(key5)){
                                  tempObj[key5] =
                                    key3[colKey]["0"][key5];
                              
                                   
                                 }
                                 
                                 else{
                                  tempObj[key2 + "_" + colKey + "_" + key5] =
                                    key3[colKey]["0"][key5];
                            
                                    
                                 }
                                  
                                }
                               
                              }
                            }
                          }
                          else if (this.reportname == "Bulk Stock".trim()) {
                            this.colSpan=6;
                            this.dummyColspan=2;
                            if (colKey === productKey && !tempArry.includes(colKey)) {
                              tempObj["WeekDay"] = valueObj  ? valueObj["0"]["WeekDay"]  : "";
                              tempObj[key + "_" + colKey + "_Opening"] = valueObj  ? valueObj["0"]["Opening"]  : "";
                              tempObj[key + "_" + colKey + "_Purchase"] = valueObj ? valueObj["0"]["Purchase"] : "";
                              tempObj[key + "_" + colKey + "_Loaded"] = valueObj  ? valueObj["0"]["Loaded"]: "";
                              tempObj[key + "_" + colKey + "_Transfer"] = valueObj? valueObj["0"]["Transfer"]: "";
                              tempObj[key + "_" + colKey + "_GL"] = valueObj? valueObj["0"]["GL"]: "";
                              tempObj[key + "_" + colKey + "_Closing"] = valueObj? valueObj["0"]["Closing"]: "";
                              tempArry.push(productKey);
                            }
                          }
                          else if (this.reportname == "SPR".trim()) {
                            this.colSpan=4;
                            this.dummyColspan=2;
                            if (colKey === productKey && !tempArry.includes(colKey)) {
                              tempObj["WeekDay"] = valueObj  ? valueObj["0"]["WeekDay"]  : "";
                              tempObj[key + "_" + colKey + "_Opening"] = valueObj  ? valueObj["0"]["Opening"]  : "";
                              tempObj[key + "_" + colKey + "_Purchase"] = valueObj ? valueObj["0"]["Purchase"] : "";
                              tempObj[key + "_" + colKey + "_Loaded"] = valueObj  ? valueObj["0"]["Loaded"]: "";
                              tempObj[key + "_" + colKey + "_Closing"] = valueObj? valueObj["0"]["Closing"]: "";
                              tempArry.push(productKey);
                            }
                          }
                          else if (this.reportname == "Forecast Performance".trim()) {
                            this.colSpan=4;
                            this.dummyColspan=3;
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
                          else if (this.reportname == "Supply Performance".trim()) {
                            this.colSpan=2;
                            this.dummyColspan=5;
                            if (colKey === productKey && !tempArry.includes(colKey)) {
                              tempObj["Day"] = valueObj  ? valueObj["0"]["Day"]  : "";
                              tempObj["Weekdays"] = valueObj  ? valueObj["0"]["Weekdays"]  : "";
                              tempObj["Sunday"] = valueObj ? valueObj["0"]["Sunday"] : "";
                              tempObj["MonthID"] = valueObj  ? valueObj["0"]["MonthID"]: "";
                              tempObj[key + "_" + colKey + "_Plan"] = valueObj? valueObj["0"]["PlanValue"]: "";
                              tempObj[key + "_" + colKey + "_Actual"] = valueObj? valueObj["0"]["Actual"]: "";
                              tempArry.push(productKey);
                            }
                          }
                          //End of Purchace Summary condition
                        }
                        if (
                          this.reportname == "Purchase Summary".trim() ||
                          this.reportname == "Supply Plan Sale".trim() || this.reportname=="Forecast D".trim() 
                        ) {
                          if (this.reportname == "Supply Plan Sale") {
                            tempObj["Week"] = key.split("_")[0];
                            tempObj["Date"] = key.split("_")[1];
                            tempObj["To"] = key.split("_")[2];
                          } else {
                            tempObj["Date"] = key;
                            // tempObj["WeekDay"] = valueObj  ? valueObj["0"]["WeekDay"]  : "";
                            //  tempObj["WeekNo"] = valueObj  ? valueObj["0"]["WeekNo"]  : "";

                          }
                        }
                        // else if(this.reportname == "Supply Performance".trim()){
                        //   tempObj["FromDate"] =key4['FromDate'];
                        //   tempObj["ToDate"]=key4['FromDate'];
                        // }
                       
                         else if(this.reportname != "Forecast Performance".trim()) {
                          tempObj["Date"] = key2;
                         
                        }
                    }
                  // }
             
            // }   
            }
          
              realList.push(tempObj);
              
          }
      }
      finalJsonObj[key] =  realList;
     
  }
    return finalJsonObj;
  }
  
 
 
  // sortData(sort){ 
  //   const data = this.dataSource.slice(); 
  //   if (!sort.active || sort.direction === '') { 
  //     this.dataSource = data; 
  //     return; 
  //   } 
  //   this.dataSource = data.sort((a, b) => { 
  //     const isAsc = sort.direction === 'asc'; 
  //     return this.compare(a[sort.active], b[sort.active], isAsc); });
  //   }
  
  //  compare(a: number | string, b: number | string, isAsc: boolean) {
  //     return (a < b ? -1 : 1) * (isAsc ? 1 : -1); 
  //   }

  sortData(sort){ 
    const data = this.dataSource.slice(); 
    if (!sort.active || sort.direction === '') { 
      this.dataSource = data; 
      return; 
    } 
 
    this.dataSource = data.sort((a, b) => { 
      const isAsc = sort.direction === 'asc'; 
      return sort.active==='Date' ?  
      this.compare(this.formatDate(a[sort.active]), this.formatDate(b[sort.active]), isAsc) :
      sort.active === 'WeekDay' ? 
      this.compare(this.days[a[sort.active]], this.days[b[sort.active]], isAsc) :
      this.compare(a[sort.active], b[sort.active], isAsc); });
    }
  
   compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1); 
    }
    days = {
      SUNDAY: 0,
      MONDAY: 1,
      TUESDAY: 2,
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
      SATURDAY: 6
      }
      
      formatDate(date){
      let data = date.split('-');
      return new Date(data[2]+"/"+data[1]+"/"+data[0]);
      }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }
 
  getError(error) {
    console.log(error);
  }

  keepOrder = (a, b) => {
    return a;
}

download(){

this.downloadservice.exceldesign(this.dataSource,this.depotname,this.reportname,  this.totalArray);
  
}



//  isSticky (column: string): boolean {
//   return (column =="Date" || column =="dummy" || column=="date")? true : false;
//  }


}
