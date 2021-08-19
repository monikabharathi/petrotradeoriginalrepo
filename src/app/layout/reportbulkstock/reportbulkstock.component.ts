import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {PassdataService} from '../../services/passdata.service';
import {RestapiService} from '../../services/restapi.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { BsLocaleService, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';

@Component({
selector: 'app-reportbulkstock',
templateUrl: './reportbulkstock.component.html',
styleUrls: ['./reportbulkstock.component.css'],
providers:[
DatePipe
]
})
export class ReportbulkstockComponent implements OnInit {
reportname:string;
backpath : String;
flag:string;
response;
mindate;
collection = { data: [] };
passingdata:any;
depotselected:string;
prductselect: String;
productlist = [];
reportform:FormGroup;
reportformtwo:FormGroup;
reportformThree:FormGroup;
dataarray=[];
fromdate:string;
todate:string;
check:string;
todateState:any=0;
reportSelect=1;
fromWeekStartDate: string;
fromWeekEndDate: string;
myDateValue: Date;
bsConfig: Partial<BsDatepickerConfig>;
fromWeek: string;
toWeekStartDate: string;
toWeekEndDate: string;
toWeek: string;
DepotId: any;
fromDateLimit:any;

constructor(private route: ActivatedRoute, private passdata:PassdataService,private rest:RestapiService,
private router:Router,private fb:FormBuilder, private datepipe:DatePipe, private toastr: ToastrService,private _snackBar: MatSnackBar,private localeService: BsLocaleService) {

this.createForm();
// this.bsConfig =
// {
// containerClass: 'theme-green app',
// selectWeekDateRange: true,
// selectFromOtherMonth: true,
// dateInputFormat: 'dd-MMM-yyyy'
// }
}
ngOnInit() {
console.log("Called oninit");
defineLocale('en-gb', enGbLocale);
this.localeService.use('en-gb');

//this.route.data.backpath.

this.route.data.subscribe(params => {
    console.log(params);
    this.reportname=params['value'];
    this.backpath=params['backpath'];
    console.log('reportname : '+this.reportname);
});


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

getError(error) {
console.log(error);
}



chngefromDate(){
    if(this.todate){
        this.fromDateLimit=this.todate;
    }else {
        this.fromDateLimit="";
    }
}

onSubmit(form){

console.log("came on submit "+JSON.stringify(form.value));
this.depotselected=form.value.depotname;
this.prductselect=form.value.productid;
if(this.reportname=='Forecast Performance'.trim() || this.reportname=="Purchase Summary".trim() || this.reportname=='Supply Plan Sale'.trim() || this.reportname=="Forecast D".trim()){

this.fromdate= this.datepipe.transform(form.value.fromdate, "yyyy-MM-dd");
this.todate= this.datepipe.transform(form.value.todate, "yyyy-MM-dd");
}
else{

this.fromdate= this.datepipe.transform(form.value.fromdate, "dd-MMM-yyyy");
this.todate= this.datepipe.transform(form.value.todate, "dd-MMM-yyyy");

}
this.dataarray.push(this.depotselected,this.reportname,this.fromdate,this.todate, this.prductselect,this.backpath);

this.passdata.setJSONData(this.dataarray);
this.router.navigate(['/layout/reportviewbulkstock']);

}

onBack(){
    this.reportSelect=1;
   this.createForm();

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






//Getting The Product List For Add BulkStock Based on DepotidSelection
getproductlistfordepot(depotid: string): void {
//this.form.valid='true';
// this.bulkstock.bulkstockDateValue='';
/* if(depotid !=='all')
{ */
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















emptyValue (fromdate){
//this.todateState=1;
 if(fromdate > this.reportform.controls['todate'].value){
 this.reportform.controls['todate'].setValue('');
 }
}



createFormtwo(){
console.log("came create form two");
this.reportformtwo=this.fb.group({
fromdate:['',Validators.required],
todate:['',Validators.required]
});
}

createFormThree(){
console.log("came create form Three");
this.reportformThree=this.fb.group({
depotname:['',Validators.required],
weekstart:[null,Validators.required],
weekend:[null,Validators.required]
});


}
onDateChange(newDate) {
console.log(newDate);
this.fromdate=this.datepipe.transform(newDate.split('-')[0], "dd-MMM-yyyy");
console.log("fromdate" +this.fromdate);
}


}