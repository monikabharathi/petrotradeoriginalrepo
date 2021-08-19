import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as Excel from "exceljs/dist/exceljs.min.js";
import * as ExcelProper from "exceljs";

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';  
const EXCEL_EXTENSION = '.xlsx'; 


@Injectable({
  providedIn: 'root'
})
export class DownloadservicesService {

  date;
  datakeys=[];
  temparray=[];
  finaldata=[];
  reportname;
  keyToExclude = ['To','Week',"Day","Weekdays","Sunday","MonthID", "Date","WeekNo","WeekDay","date","dummy","Month"];
  testDate;

  constructor() { }  
  public exportAsExcelFile(json: any, excelFileName: string): void { 
    console.log("json in download service "+JSON.stringify(json)); 
    var wb = XLSX.utils.book_new();
    for(let key in json){
        console.log(key);
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json[key]);
        console.log('worksheet',ws);
        XLSX.utils.book_append_sheet(wb, ws, key);
    };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    //const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);  
    
    //const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };  
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });  
    this.saveAsExcelFile(excelBuffer, excelFileName);  
  }  
  private saveAsExcelFile(buffer: any, fileName: string): void {  
    console.log("came save as excel method");
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE}); 
    console.log('Saving File...'); 
    FileSaver.saveAs(data, fileName + new  Date().getTime() + EXCEL_EXTENSION);  
  }  

  csvdownload(json:any){
  let data:any[];
  let header:any[];
  data=json;
  console.log("data values "+data);
  const replacer = (key, value) => value === null ? '' : value;
  header = Object.keys(data[0]);
  console.log("header value "+header);
  let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName],replacer)).join(','));
  csv.unshift(header.join(','));
  let csvArray = csv.join('\r\n');
  var blob = new Blob([csvArray], {type: 'text/csv' });
  console.log('Saving File Csv...'); 
  FileSaver.saveAs(blob, "depot" + ".csv");
  }

 //Latest 
 productHeader = [];
 primaryHeader = [];
 gloabalHeader = [];
 displayedColumn = [];

 setDisplayedColumns(res) {
  let tempArr = [];
  let colums = [];
  let displayedColumns = [];
  res.forEach((Obj)=>{
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

  if(this.reportname == "Supply Plan Sale"){
    colums.forEach((key)=>{
    if (this.keyToExclude.includes(key)) {
    displayedColumns.push(key);
    }
    });
    colums.forEach((key)=>{
    if(key.includes('Total') ){
    displayedColumns.push(key);
    }
    });
    
    colums.forEach((key)=>{
    if (
    
    !key.includes("Total") && !this.keyToExclude.includes(key)
    ) {
    displayedColumns.push(key);
    }
    });
    
    
    }else{
    colums.forEach((key)=>{
    if (this.keyToExclude.includes(key)) {
    displayedColumns.push(key);
    }
    });
    
    colums.forEach((key)=>{
    if (
    
    !key.includes("Total") && !this.keyToExclude.includes(key)
    ) {
    displayedColumns.push(key);
    }
    });
    
    colums.forEach((key)=>{
    if(key.includes('Total') ){
    displayedColumns.push(key);
    }
    });
    }

  if(this.reportname != "Supply Plan Sale"){
    displayedColumns = displayedColumns.sort((a:string,b:string) => {
    if(!this.keyToExclude.includes(a) && !this.keyToExclude.includes(b) && !a.includes('Total') && !b.includes('Total')){
    return (a.split("_")[0] < b.split("_")[0] ? -1 : 1) * 1;
    }
    })
    }
  return displayedColumns;
 }

setHeaders(res){
   //Latest 
 this.productHeader = [];
 this.primaryHeader = [];
 this.gloabalHeader = [];
 this.displayedColumn = [];

 this.displayedColumn = this.setDisplayedColumns(res);

  let productHeaderLengthPs={}, primaryHeaderLengthPs={}, globalHeaderLengths={};

  this.displayedColumn.forEach((i) => {
    if (!this.keyToExclude.includes(i)) {
      const Product = i.split("_")[0] + "_" + i.split("_")[1];
      productHeaderLengthPs[Product] =
        (productHeaderLengthPs[Product] || 0) + 1;
    }
  });

  //For setting the header
  for (let product in productHeaderLengthPs) {
    let temp:any = {};
    temp.label = product;
    temp.length = productHeaderLengthPs[product];
    this.productHeader.push(temp);
  }

  this.displayedColumn.forEach((i) => {
    if (!this.keyToExclude.includes(i)) {
      let primary = i.split("_")[0];
      primaryHeaderLengthPs[primary] =
        (primaryHeaderLengthPs[primary] || 0) + 1;
    }
  });

  for (let primary in primaryHeaderLengthPs) {
    let temp:any = {};
    temp.label = primary;
    temp.length = primaryHeaderLengthPs[primary];
    this.primaryHeader.push(temp);
  }

  this.displayedColumn.forEach((i) => {
    if (!this.keyToExclude.includes(i)) {
      let global = i.split("_")[0].split(" ")[0];
      globalHeaderLengths[global] =
        (globalHeaderLengths[global] || 0) + 1;
    }
  });
  for (let global in globalHeaderLengths) {
    let temp:any = {};
    temp.label = global;
    temp.length = globalHeaderLengths[global];
    this.gloabalHeader.push(temp);
  }

  console.log(this.primaryHeader);
  console.log(this.productHeader);
  console.log(this.gloabalHeader);
  console.log(this.displayedColumn);
}



  exceldesign(dataArray,depname,reportname, total?){
    this.reportname=reportname;
    let title ='PTL-Puma Laos '+reportname;
    let header;
    depname = depname ? depname.toString() : '';
    let depotheader=['','Location Name'];
    let depotcode=['','Location Code',];
    let prodheader=['','Product Name',];
    let sheetname;
    let workbook: ExcelProper.Workbook = new Excel.Workbook();

    console.log("dataArray "+JSON.stringify(dataArray));
    this.datakeys=(Object.keys(dataArray));
    this.setHeaders(dataArray);

    let worksheet = workbook.addWorksheet(reportname);
    worksheet.addRow([]);   //1
    worksheet.mergeCells(2, 1 , 2, 5);
    worksheet.getCell(2, 5).value = title;
    worksheet.getCell(2, 5).style.font ={ size: 16, bold: true };
    worksheet.addRow([]);  //3

    let headerExcel = [];

    if(reportname === 'Audit Report'){
      headerExcel = this.displayedColumn;
    }else {
      for(let key of this.displayedColumn){
        if(!this.keyToExclude.includes(key)){
          headerExcel.push(key.split('_')[2]);
        }else {
          headerExcel.push(key);
        }
      }
    }
   
    const productCells:any = {};
    const primaryStart:any = {};
    if(reportname === 'Supply Plan Sale' || reportname ===  'Forecast Performance' || reportname==='Purchase Summary'){
      productCells.start = 4;
      productCells.top = 8;
      primaryStart.start = 4;
      primaryStart.top = 7;
    }else if (reportname === 'Supply Performance'){
      productCells.start = 6;
      productCells.top = 7;
      primaryStart.start = 6;
      primaryStart.top = 6;
    }
    else if (reportname === 'Forecast D'){
      productCells.start = 5;
      productCells.top = 7;
      primaryStart.start = 5;
      primaryStart.top = 6;
    }else {
      productCells.start = 3;
      productCells.top = 7;
      primaryStart.start = 3;
      primaryStart.top = 6;
    }

    const frozenHeader: any = {}; 
    if(reportname === 'Audit Report'){
      frozenHeader.xSplit =  1;
       frozenHeader.ySplit = 4;
    }else{
      frozenHeader.xSplit =  productCells.start - 1;
      frozenHeader.ySplit = productCells.top + 1;
    }

    if(reportname != 'Audit Report'){
      for(let key of this.productHeader){
        const left = productCells.start ;
        const right = productCells.start  + key.length - 1;
        worksheet.mergeCells(productCells.top, left , productCells.top, right);
        worksheet.getCell(productCells.top, right).value = key.label.split('_')[1];
        worksheet.getCell(productCells.top, right).style.alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell(productCells.top, right).style.border = {
          top: {style:'thick'},
          left: {style:'thick'},
          bottom: {style:'thick'},
          right: {style:'thick'}
        };
        productCells.start  = right + 1;
      }

      for(let key of this.primaryHeader){
        const left =  primaryStart.start ;
        const right =  primaryStart.start + key.length - 1;
        worksheet.mergeCells(primaryStart.top, left , primaryStart.top, right);
        worksheet.getCell(primaryStart.top, right).value = key.label.split('_')[0];
        worksheet.getCell(primaryStart.top, right).style.alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell(primaryStart.top, right).style.border = {
          top: {style:'thick'},
          left: {style:'thick'},
          bottom: {style:'thick'},
          right: {style:'thick'}
        };
        primaryStart.start = right + 1;
      }
    }
   

    const globalStart:any = {};
    if(reportname === 'Supply Plan Sale'){
      globalStart.start = 4;
      globalStart.top = 6;
    }
    if(reportname === 'Supply Plan Sale'){
      for(let key of this.gloabalHeader){
        const left = globalStart.start ;
        const right = globalStart.start + key.length - 1;
        worksheet.mergeCells(globalStart.top, left , globalStart.top, right);
        worksheet.getCell(globalStart.top, right).value = key.label.split('_')[0];
        worksheet.getCell(globalStart.top, right).style.alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getCell(globalStart.top, right).style.border = {
          top: {style:'thick'},
          left: {style:'thick'},
          bottom: {style:'thick'},
          right: {style:'thick'}
        };
        globalStart.start = right + 1;
      }
    }

    const headerRow = worksheet.addRow(headerExcel);


    
    headerRow.eachCell((cell, num) => {
       cell.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: 'FFFFFF00' },
         bgColor: { argb: 'FF0000FF' }
       }
       cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      });
    worksheet.views = [
        {state: 'frozen', xSplit: frozenHeader.xSplit, ySplit: frozenHeader.ySplit}
      ];

    const tempDataArry = [];

    // for(let value of dataArray){
    //     let temp = {};
    //     for(let key in value){
    //       if(this.keyToExclude.includes(key)){
    //         temp[key] = value[key];
    //       }
    //     }
    //     for(let key in value){
    //       if(!this.keyToExclude.includes(key) && !key.includes('Total')){
    //         temp[key] = value[key];
    //       }
    //     }
    //     for(let key in value){
    //       if(!this.keyToExclude.includes(key) && key.includes('Total')){
    //         temp[key] = value[key];
    //       }
    //       }
    //     tempDataArry.push(temp);
    //   }
    if(reportname !="Audit Report"){
    for (let value of dataArray) {
      let temp = {};
      for (let pro of this.displayedColumn) {
        for (let key in value) {
          //let product = key.split("_")[0];
          if (this.keyToExclude.includes(key) && this.keyToExclude.includes(pro)) {
            if (key === pro) {
              temp[pro] = value[key];
            } else {
              temp[pro] = temp[pro] ?  temp[pro] : "";
            }
          }
        }
      }


      for (let pro of this.displayedColumn) {
        for (let key in value) {
          //let product = key.split("_")[0] + "_" + key.split("_")[1];
          if (
            !this.keyToExclude.includes(pro) &&
            !this.keyToExclude.includes(key) &&
            !key.includes("Total")
          ) {
            if (key === pro) {
              temp[pro] = value[key];
            } else {
              temp[pro] = temp[pro] ?  temp[pro] : "";
            }
          }
        }
      }

      for (let pro of this.displayedColumn) {
        for (let key in value) {
          // let product = key.split("_")[0] + "_" + key.split("_")[1];
          if (
            !this.keyToExclude.includes(pro) &&
            !this.keyToExclude.includes(key) &&
            key.includes("Total") &&
            pro.includes("Total")
          ) {
            if (key === pro) {
              temp[pro] = value[key];
            }else{
              temp[pro] = temp[pro] ? temp[pro] : "";
            }
          }
        }
      }

      tempDataArry.push(temp);
    }
  }else{
    for(let value of dataArray){
        let temp = {};
        for(let key in value){
          if(this.keyToExclude.includes(key)){
            temp[key] = value[key];
          }
        }
        for(let key in value){
          if(!this.keyToExclude.includes(key) && !key.includes('Total')){
            temp[key] = value[key];
          }
        }
        for(let key in value){
          if(!this.keyToExclude.includes(key) && key.includes('Total')){
            temp[key] = value[key];
          }
          }
        tempDataArry.push(temp);
      }
  }
    console.log(tempDataArry);

    for(let key of tempDataArry){
        let tempLet = Object.values(key).map(value => value ? value.toString() : '-');
        worksheet.addRow(tempLet);
      }

      if(reportname === 'Bulk Stock'){
        let tempTotal = []
        for(let key of total){
          if(key.split('_').length === 5) {
            tempTotal.push(key.split('_')[4])
          } else if(key.includes('Date')){
            tempTotal.push('Total')
          }else{
            tempTotal.push('');
          }
        }

        worksheet.addRow(tempTotal);
      }
    

      for (let i = 0; i < worksheet.columns.length; i += 1) { 
        let dataMax = 0;
        const column = worksheet.columns[i];
        for (let j = 1; j < column.values.length; j += 1) {
          const columnLength = (column.values[j] && column.values[j] !== title) ? column.values[j].toString().length : 0;
          if (columnLength > dataMax) {
            dataMax = columnLength;
          }
        }
        column.width = dataMax < 10 ? 10 : dataMax;
      }

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/x-excel' });
      // vnd.openxmlformats-officedocument.spreadsheetml.sheet
    fs.saveAs(blob, reportname+"_"+new Date()+".xlsx");
  });
   }

  }

