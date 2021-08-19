import { Component, OnInit } from '@angular/core';
import { MatRadioChange, MatPaginator, PageEvent, MatTable } from '@angular/material';
import { FormGroup,  FormBuilder,  Validators, Form } from '@angular/forms';
import {RestapiService} from '../../services/restapi.service';
import { DownloadservicesService } from '../../services/downloadservices.service';
// import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
//pdfMake.vfs = pdfFonts.pdfMake.vfs;

// declare const require: any;
// const jsPDF = require('jspdf');
// require('jspdf-autotable');

export interface Activity {
  value: string;
  viewValue: string;
  
}


@Component({
  selector: 'app-reportaudit',
  templateUrl: './reportaudit.component.html',
  styleUrls: ['./reportaudit.component.scss']
})
export class ReportauditComponent implements OnInit {
  flag:boolean=true;
  user:string="User Name";
  value=1;
  check:string="sub";
  showTable:string="false";
  reportform:FormGroup;
  reportform1:FormGroup;
  userCredential:string;
  act_type:string;
  collection=[];
  act=['Configuration','SPR','Reports','User Management'];
  displayedColumns=[]; 
  excel;
  response;
  dataSource = [];
  eventdata: any;
  lowValue: number = 0;
  highValue: number = 10;
  valueArray = [];
  keys=[];
  currentIndex;
  tableLoading: boolean = false;
  checkLoading=0;
  multiSelect:any = {
    // Configuration:['Depot','Product','Supplier','Ullage','Saftey Days'],
    // SPR:['Bulk Stock','Weekly Forecast','Supply Plan','Forecast D'],
    // Reports:['Forecast D','Bulk Stock','SPR','Supply Performance','Supply Plan','Forecast Performance','Purchase Summary','Audit Report'],
    // Usermanagement:['User','Profile']
    Configuration:{
      'Depot' : 1001,
      'Product' : 1002,
      'Supplier' : 1003,
      'Ullage' : 1004,
      'SafteyDays' : 1005
      },
      SPR:{
      'Bulk Stock' : 2001,
      'Forecast' : 3002,
      'Supply Plan' : 4001
      
      },
      UserManagement:{
        'Profile' : 1100,
        'User' : 2200,
        'Login' : 1000
        
        }
  }
  config: { itemsPerPage: number; currentPage: number; totalItems: any; };

  // exportAsConfig: ExportAsConfig = {
  //   type: 'pdf', 
  //   elementId: 'reporttable',
   
  //    }
  
  constructor(private fb:FormBuilder,private rest:RestapiService,private downloadservice:DownloadservicesService
   ) {this.createForm();
  this.createFormTwo(); }
// private exportAsService: ExportAsService
  ngOnInit() {
  console.log("report audit came ......");
  
  }
 
    
  handleChange(evt, form: FormGroup) {
    form ? form.reset():'';
    let target = evt.target;
    let value=target.id;

    if (target.checked) {
      if(value=='user'){
        this.user="User Name";
        this.flag=true;       
      }
     else {
      this.flag=false;
     
    }
  }
}

userChange(evt:MatRadioChange){
  this.value = evt.value;
   if(this.value==1){
    this.user="User Name";
    }
   else {
    this.user="User ID";
  }
  this.reportform.reset();
}

activityChange(evt:MatRadioChange){
  this.value=evt.value;
  if(this.value==1){
   this.check="main";
  }else if(this.value==2){
    this.check="sub";
  }
  this.reportform.reset();
}
onSubmit(form){
  console.log("came on submit "+JSON.stringify(form.value));
  this.lowValue = 0;
  this.highValue=10;
  this.response = {}; 
  this.collection = [];
  this.dataSource =[];
  this.userCredential=form.value.user;
  this.act_type=form.value.activity;
  this.showTable="true";
  this.tableLoading = true;
  this.checkLoading=1;
  let postData={
    user:this.userCredential ? this.userCredential.toString().trim() : null,
    act:this.act_type,
    menu:this.check? this.check.toString().trim():null,
    check:3
  }
  this.rest.sendPostRequest('reporaudit',JSON.stringify(postData)).subscribe(res=>{
  this.excel=res;
  this.response=res;
  console.log("resp status "+JSON.stringify(this.response));
  this.checkLoading=0;
  this.tableLoading = false;
  this.keys=Object.keys(this.response);// [p1, p2];
      this.valueArray=[];
      this.displayedColumns=[];
     for(let i=0;i<this.keys.length;i++){
      this.valueArray=(Object.values(this.response[this.keys[0]])); // this.res.resdata[p1]
      this.currentIndex = 1; 
      this.displayedColumns= ['ACTIONDATE','ACTIONTIME','USERNAME','AUDITMSG','REMARKS'];
      }
    
  this.response.forEach((element,index) => {
  let serial:any = {};
  serial.SNo = index+1;
  
  this.collection.push({...serial,...element});
  
  });
  console.log("collection array data "+JSON.stringify(this.collection));
  this.displayedColumns = Object.keys(this.collection[0]);
  this.dataSource = this.collection;
  

  });
 
 

 
}
createForm(){
  this.reportform=this.fb.group({
  user:[null,Validators.required]
 
});
}

createFormTwo(){
  this.reportform1=this.fb.group({
  activity:[null,Validators.required]
 
});
}
onBack(){
  this.showTable="false";
  this.flag = true;
  this.reportform.reset();
}

sortData(sort){ 
  const data = this.dataSource.slice(); 
  if (!sort.active || sort.direction === '') { 
    this.dataSource = data; 
    return; 
  } 
  this.dataSource = data.sort((a, b) => { 
    const isAsc = sort.direction === 'asc'; 
    return this.compare(a[sort.active], b[sort.active], isAsc); });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1); 
  }

  download(event){
    console.log("eventdata "+event.target.id);
    this.eventdata=event.target.id;
  
  switch(this.eventdata){
    case "pdf":console.log("pdf came ====");
    //this.pdfdownload();
    break;
    //pdfMake.createPdf(this.getDocumentDefinition()).download();
    case "excel":console.log("excel came===");
    this.exportAsXLSX();
    break;
    case "csv":console.log("csv came===");
    this.downloadservice.csvdownload(this.excel.RESP_STATUS);
    break;
  }
      
  }
  generatePdf(){
    const documentDefinition =document.getElementById("reporttable");
   // pdfMake.createPdf(documentDefinition).download();
   }
   
    

  exportAsXLSX():void {  
    console.log("came to exportasxcel===");
    this.downloadservice.exceldesign(this.dataSource, '', 'Audit Report');  
    } 

 

    getPaginatorData(event: PageEvent): PageEvent {
      
      this.lowValue = event.pageIndex * event.pageSize;
      this.highValue = this.lowValue + event.pageSize;
      return event;
    }
}
