import { Component, OnInit } from '@angular/core';
import {RestapiService} from '../../services/restapi.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editsupplyplan',
  templateUrl: './editsupplyplan.component.html',
  styleUrls: ['./editsupplyplan.component.css'],
  providers: [
    DatePipe
  ]
})
export class EditsupplyplanComponent implements OnInit {
  issubmit: any;
  msg : any;
  rowNum: any;
  sno: any;
  ee: any;
  sno1: any;
  ee1: any;
  dateValue;
  depotValue
  nxttwoDate;
  response;
  leadTime={};
  firstHeader=[];
  thirdHeaderSupply=[];
  collectiveProduct=[];
  lastProductName;
  productName;
  responseObject;
  displayedColumns=[];
  dataSource=[];
  keyin;
  leadUpdateDate;
  dummyDataSource=[];
  depotNames;
  currentDate;
  selectedDate;
  ullage;
  leadData;
  ullageData;
  showTable:boolean=true;
  tableLoading:boolean = true;
  products=[];primaryHeader=[]; productHeader=[];
  checkDate=0;
  checkLoading=0;
  leadtimes : any;
  depotName : any;
  systemDate=new Date();
  constructor(private rest:RestapiService, private datePipe: DatePipe,
    private router: Router,
    private toastr: ToastrService) 
    
    { }

  ngOnInit() {

    let postData={
     }
    this.rest.sendPostRequest('supplierlinkeddepotlist',JSON.stringify(postData)).subscribe(res=>{
    this.depotNames=res;
    console.log("response for supply plan depot list "+JSON.stringify(res));
   
    });
    
}

  
  showOpeningBalance() {
  
    if(this.dateValue && this.depotValue){
      this.productHeaderLengthPs = {};
    this.primaryHeaderPs=[];
    this.productHeaderPs = [];
    this.primaryHeaderLengthPs ={};
    this.checkDate=0;
    this.showTable=false;
    this.checkLoading=1;
    this.rowNum = this.depotValue;
    this.ee = '0';
    this.ee1 = '0';
    this.tableLoading = true;
    this.selectedDate=this.datePipe.transform(this.dateValue, "yyyy-MM-dd");
    console.log("currently selectedDate date "+this.selectedDate);
    this.getSupplyplan(this.depotValue);
    }
    else if(!this.dateValue)
    this.checkDate=1;
   
    
    
  
    
  }
  showchangegBalance(msg) {
    this.sno = msg;
    this.ee = '0666';
  }
  showchangegBalance1(msg) {
    this.sno1 = msg;
    this.ee1 = '0666';
  }
  hideOpeningBalance() {
    this.rowNum = '';
  }


   getLeadtime(data){
    let postData={
      depotid:data
      
    }
    this.rest.sendPostRequest('supplyplanleadtime',JSON.stringify(postData)).subscribe(res=>{
      this.leadData=res;
     // console.log("response for lead time"+JSON.stringify(this.leadData));
      if(this.leadData){
        this.getUllage(data)
      }
      });
      
   }
   getUllage(data){
    let postData={
      depotid:data
      
    }
    this.rest.sendPostRequest('supplyplanullage',JSON.stringify(postData)).subscribe(res=>{
      this.ullageData=res;
      //console.log("response for ullage"+JSON.stringify(this.ullageData));
      if(this.ullageData){
        this.firstTimesupply(this.responseObject);
      }
      
      });
     
   }

   getSupplyplan(data){


    // here we need to set depotname
//for() w8

for (let m of this.depotNames) {
  if (m.DEPOT_ID === data) {
this.depotName=m.DEPOT_NAME;

  }}


     let postData={
      depotid:data,  //  this is dept id ??
      loadeddate:this.selectedDate
      }
       this.rest.sendPostRequest('editsupplyplankeycall',JSON.stringify(postData)).subscribe(res=>{
      this.responseObject=res;
      if(this.responseObject){
       this.getLeadtime(data);
       
      }
      //.log("response for supply plan details  "+JSON.stringify(res)); 
  });
   }

   firstTimesupply(data){
     
    this.displayedColumns=[];
    this.primaryHeader=[];
    this.productHeader=[];
    //products=['dummyDate'];primaryHeader=[]; productHeader=['dummyDate'];
    this.products.push('dummyDate');
    this.productHeader.push('dummyDate');
    
     this.getDisplayedColumn(data);
     let separatobj =this.setObjectseparate(data);
     let finalList  = this.setMergeObj(separatobj);
     let tempArr = [];
     let colums = [];
     finalList.forEach((Obj)=>{
         for(let key in Obj){
           // if(!key.includes('Total') && !key.includes('date')){
           //     key = key.split('_')[1];
           // }
           if(tempArr.indexOf(key) < 0){
               if(key.includes('Date')){
                 if(!tempArr.includes('Date')){
                   colums.push('Date');
                   tempArr.push(key);
                 }
               }else{
                 colums.push(key);
                 tempArr.push(key);
               }  
           }
         }
     }); 

     colums.forEach((key)=>{
      if(key.includes('Date') || key.includes('WEEKDAY')){
          this.displayedColumns.push(key);
      }
    });
   
    colums.forEach((key)=>{ 
      if(!key.includes('Date') && !key.includes('flag') && key.includes('LeadUpdate') && !key.includes('color') && !key.includes('Sales') && !key.includes('WEEKDAY')){
          this.displayedColumns.push(key);
      }
    });

    colums.forEach((key)=>{
      if(key.includes('SupplyPlan') && !key.includes('flag') && !key.includes('color') && !key.includes('Sales') ){
          this.displayedColumns.push(key);
      }
    });

    colums.forEach((key)=>{ 
      if(!key.includes('Date') && !key.includes('flag') && key.includes('Saftey Days') && !key.includes('color') && !key.includes('Sales') && !key.includes('WEEKDAY')){
          this.displayedColumns.push(key);
      }
    });

    
    

    this.dataSource = finalList;
     console.log("data source data "+JSON.stringify(this.dataSource));
     console.log("displayed columns data "+this.displayedColumns);
    this.primaryHeader.unshift('date');

    var productArray = this.displayedColumns.map(col=> {
      if(col!="Date" || col!="WEEKDAY") return col.split('_')[0]+"_"+col.split('_')[1]
    });
    console.log("product Array"+productArray);
    var LeadArray = this.displayedColumns.map(col=> {
      if(col!="Date" || col!="WEEKDAY") return col.split('_')[0]
    });
    console.log("lead array"+LeadArray);
    var count_product = {};
    productArray.forEach(function(i) { count_product[i] = (count_product[i]||0) + 1;});
    this.length = {...this.length, ...count_product};
    var count_lead = []
    LeadArray.forEach(function(i) { count_lead[i] = (count_lead[i]||0) + 1;});
    this.length = {...this.length, ...count_lead};
    console.log(this.length);
    this.setPurchaseSummaryHeaders();
    this.checkLoading=0;
    setTimeout(() => {
     this.showTable=true;
    }, 0);

    setTimeout(() => {
      let width = `${this.displayedColumns.length *100}px`;
      let el:HTMLElement = document.getElementsByTagName('table')[0];
      el.style.width = width ? width : '800px';
    }, 0);
    this.tableLoading = false;
    // let product=['date'];
    // let lead='';
    // for(let key of this.displayedColumns){
    //   if(key !=='Date'){
    //     console.log("slice value "+key.slice(0,13));
    //     if(! product.includes(key.slice(0,13)))
    //     product.push(key.slice(0,13));
    //     }
      
    // }
    // console.log("product val "+product);
   }


   

   checkProduct(product1 ){
    // console.log("product 1 value "+product1);
    // console.log("product 2 value "+this.productName);
 
    return product1.split('_')[0] = this.productName;
     
   }
   //products=['dummyDate'];primaryHeader=[]; productHeader=['dummyDate'];
    length = {};
  

   getDisplayedColumn = (res)=>{

    for(let key in res){
       this.primaryHeader.push(key);
           for(let key1 in res[key] ){
             for(let key2 in res[key][key1]){
               for(let key3 in res[key][key1][key2]){
                 for(let key4 in res[key][key1][key2][key3] ){
                    if(this.products.indexOf(key4)<0){
                      this.products.push(key4);
                   }
                   if(this.productHeader.indexOf(key+'_'+key4)<0){
                    this.productHeader.push(key+'_'+key4);
                 }
            }
         }
       }
     }
    }
    // console.log("primary header value "+this.primaryHeader);
    // console.log("products value "+this.products);
    // console.log("products value "+this.productHeader);
   }

   setObjectseparate = (res) =>{
    let finalJsonObj = [];
    for(let key in res){
      let realList = [];
        for(let key1 in res[key]){
          for (let key2 in  res[key][key1]){
            let tempObj = {};
              //let tempArry = [];
                  for (let key3 of res[key][key1][key2]){
                    
                    for(let colKey of this.products){
                        let valueObj = key3 ? key3[colKey] : '';
                          for(let key4 in valueObj){
                            for(let key5 in valueObj[key4]){
                             
                              if(key5 != 'WEEKDAY'){
                              tempObj[key+'_'+colKey+'_'+key5] = valueObj ? (valueObj[key4] ? valueObj[key4][key5]: '') : ''; 
                              }else{
                                tempObj['WEEKDAY']=valueObj ? (valueObj[key4] ? valueObj[key4][key5]: '') : ''; 
                              }
                             
                            }
                          }
                          
                          tempObj['Date'] = key2;//WEEKDAY
                          tempObj[key+'_Date'] = key2;
                     }
                  }
              realList.push(tempObj);
        }
      }
      finalJsonObj[key] =  realList;
  }
 // console.log("final object "+JSON.stringify(finalJsonObj));
    return finalJsonObj;
  }

  keyToExclude = ['To','Week',"Day","Weekdays","Sunday","MonthID", "Date","WeekNo","WeekDay","date","dummy","Month","WEEKDAY"];
  productHeaderLengthPs = {};
  productHeaderPs = [];
  primaryHeaderLengthPs ={};
  primaryHeaderPs=[];
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
    }
    this.productHeaderPs.unshift("dummyDate");
  
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
    this.primaryHeaderPs.unshift("date");
  
   console.log("prd ps"+this.productHeaderPs);
   console.log("prim ps"+this.primaryHeaderPs);
  
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


  parseDate(value){
    let date = value ? value.split('-')[2]+"-"+value.split('-')[1]+"-"+value.split('-')[0] : '';
      return date;
    }

  dateToString(value){
    let data = new Date(value);
    let date = data.getDate();
    let month = data.getMonth()+1;
    let mnth='0'+month;
    let year = data.getFullYear();
    return year+"-"+mnth+"-"+date;
  }

  
inputChange(row,column,data){

  console.log("key in data "+data);
  console.log("column value "+column);
  console.log("row value "+JSON.stringify(row));
  let lead=this.leadData.LeadTime[column];
  this.leadtimes=lead;
  console.log("lead time key data "+this.leadData.LeadTime[column]);
  let newDate = new Date(row['Date']);
  
  /*  before
  newDate.setDate(newDate.getDate() - lead);
  
  this.leadUpdateDate=this.datePipe.transform(newDate, "yyyy-MM-dd");
  console.log("newDate for lead update==="+this.leadUpdateDate);

 */
var leadupdate = new Date(newDate);
//var nextDate1 = new Date((formatdate.getTime()  + 1000*60*60*24)).toISOString();
this.leadUpdateDate=this.datePipe.transform(this.leadTimeFun(leadupdate), "yyyy-MM-dd");

//var nextDate=this.datePipe.transform(this.nextDayFun(leadupdate), "yyyy-MM-dd");
console.log("next leadUpdateDate "+this.leadUpdateDate);

  
  this.dummyDataSource=this.dataSource;
  console.log("data source length "+this.dummyDataSource.length);
  
  for(let key of this.dataSource){
  console.log("data source key1 value "+JSON.stringify(key));
  if(key['Date']===this.leadUpdateDate){
  let columnName=column.substring(11,column.length);
  console.log("columnName "+columnName);
  let newColumnName='LeadUpdate_'+columnName;
  key[newColumnName]=data;
  console.log("updating column value "+key[newColumnName]);
  }
  }
  let currentDate=row['Date'];
  row[column]=data;
  for(let key of this.dataSource){
  if(key['Date']===currentDate){
  
  console.log("current key in date "+currentDate);
  let currentProduct = column.split('_')[1];
  let currentOpening:number =Number(key['SupplyPlan'+'_'+currentProduct+'_'+'Opening']);
  let changedSales :number= key['SupplyPlan'+'_'+currentProduct+'_'+'Sales'];
  
  
  let addedData:number = 0;
  for(let data in key){
  if(data.includes(currentProduct) && data.includes('SupplyPlan') && !data.includes('Opening') && !data.includes('WEEKDAY') && !data.includes('SAFTEYDAYS') && !data.includes('Sales') && !data.includes('color')){
  
  console.log("key[data]"+key[data]);
  addedData += key[data] ? Number(key[data]) : 0;
 
  }

  console.log("currentOpening "+currentOpening);
  console.log("changedSales "+changedSales);
  console.log("addedData "+addedData);

  }
  // let updatedOpening:number = Math.round(Number((currentOpening+addedData)-changedSales));
  let Opening:number =Number((currentOpening+addedData)-changedSales);
  let updatedOpening=Opening.toFixed(2);
  console.log("updatedOpening "+updatedOpening);

  console.log("current date "+currentDate);


  //================================adding one day=====

/* var currenttimestamp = new Date().getTime();
var currentdate=new Date().getDate();
var onedayaftertimestamp=currenttimestamp+(86400000);//1 day=86400000 ms;
var ondayafterdate=new Date(onedayaftertimestamp).getDate();

console.log("Current date:"+currentdate+"\n");
console.log("Ondayafterdate:"+ondayafterdate);
 */

//=======================================
/* 
  let dte = new Date(currentDate);
  console.log("selected dte "+dte);
  console.log("Get slect date ::"+dte.getDate());
  console.log("Get slect date add one ::"+dte.getDate()+1);
  dte.setDate(dte.getDate()+1*1);
  //var tomorrow = dte.add(1).day();
  console.log("added one dte "+dte.getDate()+1);
  let nextDate=this.datePipe.transform(dte, "yyyy-MM-dd");
  console.log("next Date "+nextDate); */



  //let dte = new Date(currentDate);
  //Date.parse(currentDate)
    //console.log("selected dte "+  Date.parse(currentDate));

  //console.log("selected dte "+dte);
  //console.log("Get slect date ::"+dte.getDate());
  //console.log("Get slect date add one ::"+dte.getDate()+1);
/*   dte.setDate(Date.parse(currentDate)+ 1);
  //var tomorrow = dte.add(1).day();
  console.log("added one dte "+dte.getDate()+1);
  let nextDate=this.datePipe.transform(dte, "yyyy-MM-dd");
  console.log("next Date "+nextDate);


 */

/*     var date = new Date(currentDate);
  var newdate = new Date(date);
  //console.log("sle Date fun "+newdate.getTimezoneOffset);

  var nextDate1 = new Date(newdate.getTime()+1000*60*60*24);

  console.log("next Date fun"+nextDate1);
  var formatdate = new Date(nextDate1);

  var nextDate=this.datePipe.transform(formatdate, "yyyy-MM-dd")
  console. */
  var formatdate = new Date(currentDate);
  //var nextDate1 = new Date((formatdate.getTime()  + 1000*60*60*24)).toISOString();

  var nextDate=this.datePipe.transform(this.nextDayFun(formatdate), "yyyy-MM-dd");
  console.log("next Date fun format "+nextDate);



 /* 

var date = new Date(currentDate);
var d = Date.UTC(date.getFullYear(), date.getDate(), date.getMonth());
var date1 = new Date(d);
console.log("sel date s "+this.datePipe.transform(date1, "yyyy-MM-dd"));

var nextDate1 = new Date(date1.getTime()+1000*60*60*24);
var nextDate=this.datePipe.transform(nextDate1, "yyyy-MM-dd");
console.log("nextDate "+nextDate);

 */

  
  //newdate.setDate(newdate.getDate() + 1);
  // let nextDate=this.datePipe.transform(newdate, "yyyy-MM-dd");
 // console.log("next Date "+nextDate);







  
  console.log("===============================")

  
  for(let key1 of this.dataSource){
    console.log('key1 : '+key1);
  if(key1['Date']===nextDate){
  
  key1['SupplyPlan'+'_'+currentProduct+'_'+'Opening']=updatedOpening;
  //key['SupplyPlan'+'_'+currentProduct+'_'+'Opening'].style.backgroundColor='blue';
  // let changedOpening:number =Number(key1['SupplyPlan'+'_'+currentProduct+'_'+'Opening']);
  // let changedSales :number= key1['SupplyPlan'+'_'+currentProduct+'_'+'Sales'];
  // let nextOpening:number = Number(changedOpening-changedSales);
  // console.log("updated opening is "+nextOpening);
  // updatedOpening=nextOpening;
  
  }
  }
  currentDate=nextDate;
  }



  }
  //console.log("dummyDataSource "+JSON.stringify(this.dummyDataSource));
  
  }

  leadTimeFun(date) {
    console.log( this.leadtimes+" leadtimes  lead  Date : "+date)
     const sign = v => (v < 0 ? -1 : +1);
     const result = new Date(date.getTime());
     result.setDate(result.getDate() - this.leadtimes);
     const offset = result.getTimezoneOffset();
     return new Date(result.getTime() + sign(offset) * offset * 60 * 1000);
  }

 nextDayFun(date) {
   console.log("Sle Date : "+date)
    const sign = v => (v < 0 ? -1 : +1);
    const result = new Date(date.getTime());
    result.setDate(result.getDate() + 1);
    const offset = result.getTimezoneOffset();
    return new Date(result.getTime() + sign(offset) * offset * 60 * 1000);
}
// two dates 

checkDategatless(date1) {
  console.log("Sle Date 1 : "+date1)
   const sign = v => (v < 0 ? -1 : +0);
   const result = new Date(date1.getTime());
   result.setDate(result.getDate() + 0);
   const offset = result.getTimezoneOffset();

   /* console.log("Sle Date 2 : "+date2)
   const sign2 = v => (v < 0 ? -1 : +0);
   const result2 = new Date(date2.getTime());
   result2.setDate(result2.getDate() + 0);
   const offset2 = result2.getTimezoneOffset(); */
   return new Date(result.getTime() + sign(offset) * offset * 60 * 1000) ;
   //return new Date(result.getTime() + sign(offset) * offset * 60 * 1000)  <=  new Date(result2.getTime() + sign2(offset2) * offset2 * 60 * 1000) ? true : false;
}


checkDategatless1(date2) {
  /* console.log("Sle Date 1 : "+date1)
   const sign = v => (v < 0 ? -1 : +0);
   const result = new Date(date1.getTime());
   result.setDate(result.getDate() + 0);
   const offset = result.getTimezoneOffset(); */

   console.log("Sle Date 2 : "+date2)
   const sign2 = v => (v < 0 ? -1 : +0);
   const result2 = new Date(date2.getTime());
   result2.setDate(result2.getDate() + 0);
   const offset2 = result2.getTimezoneOffset();

   return new Date(result2.getTime() + sign2(offset2) * offset2 * 60 * 1000);
}




  isSticky (column: string): boolean {
    return column === 'Date' ? true : false;
    }

 getBackgroundColor(columnName, data,seldate,row){
  let color;
  //column.split('_')[2]=='Opening' || !(column.split('_')[0]=='SupplyPlan')
     if(columnName.includes('Opening') && columnName.includes('SupplyPlan')) {
     for(let key in this.ullageData){
     if(columnName.split('_')[1]==key.split('_')[1]){
     //color= data > this.ullageData['SupplyPlan'+'_'+columnName.split('_')[1]+'_'+'MAX'] ? 'powderblue' : (data < this.ullageData['SupplyPlan'+'_'+columnName.split('_')[1]+'_'+'MIN'] ? 'red' :'white') ;
    // color= data >= this.ullageData['SupplyPlan'+'_'+columnName.split('_')[1]+'_'+'MAX'] ? 'powderblue' : (data <= this.ullageData['SupplyPlan'+'_'+columnName.split('_')[1]+'_'+'MIN'] ? 'red' :'white') ;
     //color= ((this.ullageData['SupplyPlan'+'_'+columnName.split('_')[1]+'_'+'MAX'] != " ") && (this.ullageData['SupplyPlan'+'_'+columnName.split('_')[1]+'_'+'MIN'] != " ")) ? (data > this.ullageData['SupplyPlan'+'_'+columnName.split('_')[1]+'_'+'MAX'] ? 'powderblue' : (data < this.ullageData['SupplyPlan'+'_'+columnName.split('_')[1]+'_'+'MIN'] ? 'red' :  ((data <= (row['Saftey Days_'+this.depotName+'_'+columnName.split('_')[1]]) && data > (this.ullageData['SupplyPlan'+'_'+columnName.split('_')[1]+'_'+'MIN'])) ? 'burlywood' : 'white'))) : (seldate===this.selectedDate ? 'darksalmon' : 'white') ;    
    
if((this.ullageData['SupplyPlan'+'_'+columnName.split('_')[1]+'_'+'MAX'] != " ") &&
(this.ullageData['SupplyPlan'+'_'+columnName.split('_')[1]+'_'+'MIN'] != " ")){
if(data > Number(this.ullageData['SupplyPlan'+'_'+columnName.split('_')[1]+'_'+'MAX'])){
color='powderblue';
}
else if(data < Number(this.ullageData['SupplyPlan'+'_'+columnName.split('_')[1]+'_'+'MIN'])){
color='red';
}
else if(data <= Number(row['Saftey Days_'+this.depotName+'_'+columnName.split('_')[1]]) && 
data > Number(this.ullageData['SupplyPlan'+'_'+columnName.split('_')[1]+'_'+'MIN'])){
color='burlywood';
}
else{
color='white';
}
    }
    else if(seldate===this.selectedDate ){
      color='darksalmon';
      }
  }
     }
     }else{
     color=seldate===this.selectedDate ? 'darksalmon' : 'white';
     }

  return color;
  }

  checkHasValue(row, column, flag) {
    //console.log("check has value "+ row[`${column}_flag`]);
    return row[`${column}_flag`];
    }
    onBack(){
      this.router.navigate(['/layout/supplyplan']);
    }

  onSubmit(){
this.issubmit=true;
    this.msg="Processing Please Wait and Don't Refresh...";
let parentArray = this.getPrimaryArray(this.dataSource);
let insertDateObject = this.insertDateObj(this.dataSource, parentArray);
let insertDataObject = this.insertData(this.dataSource, insertDateObject);


    //console.log("request object in the submit function "+JSON.stringify(insertDataObject));
    let postData={
      depotid:this.depotValue,
      jsondata : JSON.stringify(insertDataObject)
      //"response":insertDataObject
    }


    this.rest.sendPostRequest('editsupplyplan', JSON.stringify(postData))
    .subscribe(
      res => this.Getsuccess(res),
      error => this.Geterror(error));
}
onCancel(){
  this.router.navigate(['/layout/supplyplan']);
}

 //Getting Getsuccess For Add Depot
 Getsuccess(resp) {
  this.toastr.success(resp.RESP_DESC);
  console.log('Supply Edited Successfully');
  setTimeout(() => {
    this.toastr.clear();
  }, 2500);
  setTimeout(() => {
    this.router.navigate(['/layout/supplyplan']);
    console.log('Navigate to supplyplan');
  }, 2500);
}


Geterror(error) {
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
  console.log('Getting Error For Add Depot : ' + JSON.stringify(error));

}

/*    this.rest.sendPostRequest('addsupplyplan',JSON.stringify(postData)).subscribe(res=>
   console.log("response for supply plan submit  "+JSON.stringify(res)),
   error => this.getError(error));
  
  } */


  insertData = (b, parentArray) => {
    for (let value of b) {
    for (let parentkey in parentArray) {
    parentArray[parentkey].forEach((el) => {
    for (let elKey in el) {
    if (elKey === value["Date"]) {
    let tempProductArray = [];
    for (let key in value) {
    if (
    key.split("_")[0] != "Date" &&
    key.split("_")[1] != "Date" &&
    parentkey === key.split("_")[0] &&
    tempProductArray.indexOf(key.split("_")[1]) == -1
    ) {
    let tempObj = {};
    tempObj[key.split("_")[1]] = [];
    let tempVendorObj = {};
    for(let valueKey in value){
    if(valueKey.includes(key.split("_")[1]) && !valueKey.includes('flag') && parentkey === valueKey.split("_")[0] ){
      tempVendorObj[valueKey.split("_")[2]] = value[valueKey] ? value[valueKey].toString() : '';
    }
    }
    tempObj[key.split("_")[1]].push(tempVendorObj);
    el[elKey].push(tempObj);
    tempProductArray.push(key.split("_")[1]);
    }
    }
    }
    }
    });
    }
    }
    return parentArray;
    };
    
    
    
    insertDateObj = (b, parentArray) => {
    for (let value of b) {
    for (let key in value) {
    for (let parentvalue in parentArray) {
    let dateArray = [];
    if (key == "Date" && dateArray.indexOf(value[key] == -1)) {
    let tempDateObj = {};
    tempDateObj[value[key]] = [];
    parentArray[parentvalue].push(tempDateObj);
    dateArray.push(key.split("_")[0]);
    }
    }
    }
    }
    return parentArray;
    };
    
    
    
    getPrimaryArray = (b) => {
    let Object = {};
    let tempArray = [];
    for (let value of b) {
    for (let key in value) {
    if (key != "Date" && tempArray.indexOf(key.split("_")[0]) == -1) {
    Object[key.split("_")[0]] = [];
    tempArray.push(key.split("_")[0]);
    }
    }
    }
    return Object;
    };

  getError(error) {
    console.log(error);
  }


}
