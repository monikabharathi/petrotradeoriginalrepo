import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestapiService } from '../../services/restapi.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-bulkstockupload',
  templateUrl: './bulkstockupload.component.html',
  styleUrls: ['./bulkstockupload.component.css'],
  providers: [
    DatePipe
  ]
})
export class BulkstockuploadComponent implements OnInit {
  selectedFiles: FileList;  
 // fileToUpload: File = null;
  currentFileUpload: File; 
  modalRef: BsModalRef;
  config = {
    keyboard: true
  };
  mysubmit: any;
  ishidecalcel : any;
  msg : any;
  form: any;
  minDate: Date;
  maxDate: Date;
  depotlist = [];
  validateBulkstock: any;



  productcheck = [];
  depotstatus : any;
  calling : any;
  productstatus : any;
  productstatuscount : any;


  bulkstock: any = {};
  productlist = [];
  isDisbale : any;

  value: any;
  exceltoJson = {};

  profileImage : any;
  prodcut: any;

  constructor(
    
    private router: Router,
    private rest: RestapiService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private modalService: BsModalService,
  )
   {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() );
   }
   showAlert(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
  ngOnInit() {
    this.prodcut=true;
this.isDisbale=false;
    this.getdepotlist();
  }
//Getting The Depot List For Add BulkStock
getdepotlist() {
  let postData = {
    listcall: ''
  };
  //Sending Request For Getting The Depot List For Add BulkStock
  console.log('Sending Request For Getting The Depot List For Add BulkStock: ' + JSON.stringify(postData));
  this.rest.sendPostRequest('authorizeddepotlist', JSON.stringify(postData))
    .subscribe(
      res => this.GetRespDepot(res),
      error => this.GetErrorDepot(error));
}
// Response For Getting The Depot List For Add BulkStock
GetRespDepot(resp) {
  this.depotlist = resp;
  console.log('Response For Getting The Depot List For Add BulkStock: ' + JSON.stringify(resp));
}
// Error For Getting The Depot List For Add BulkStock
GetErrorDepot(error) {
  console.log('Error For Getting The Depot List For Add BulkStock: ' + JSON.stringify(error));
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
}

  //Getting the productlist for ullage based on depot selection
  getproductlistfordepot(depotid: string): void {
    this.productlist = null;
    this.bulkstock.productname = null;
    console.log("depot id for selction-->" + depotid);
    let postData = {
      depotid: depotid,
      listcall: 'PRODLINKDEPOT'
    };
    //Sending Request Getting the productlist for ullage based on depot selection
    console.log('Sending Request Getting the productlist for ullage based on depot selection: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homeproductlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespProduct(res),
        error => this.GetErrorProduct(error));
  }
  //Response for Getting the productlist for ullage based on depot selection
  GetRespProduct(resp) {
    this.productlist = resp;
    this.value = 99;

    //alert(this.productlist.length)
    if( this.productlist.length===0)
    {
      
    this.toastr.error("No Products Are Configured With Selected Depot !!! ");
    setTimeout(() => {
      this.toastr.clear();
    }, 2000);

    }
    console.log('Response for Getting the productlist for ullage based on depot selection ' + JSON.stringify(resp));
  }
  //Error for Getting the productlist for ullage based on depot selection
  GetErrorProduct(error) {
    console.log('Error for Getting the productlist for ullage based on depot selection ' + JSON.stringify(error));
  }
  uploadExcelfie()

 {
//alert('After upload ');
console.log('Date '+ this.datePipe.transform(this.bulkstock.bulkstockDateValue, "yyyy-MM-dd"));
console.log('Depot '+ this.bulkstock.depotname);
console.log('List data : '+JSON.stringify(this.exceltoJson));
console.log('Products  : '+JSON.stringify(this.productlist.length));
this.depotstatus=true;
this.productstatus=true;
this.calling=true;

//alert('Date file '+this.datePipe.transform(new Date(), "dd-MM-yyyy"));

if(this.exceltoJson['filename']==='BulkStock_'+this.datePipe.transform(this.bulkstock.bulkstockDateValue, "dd-MM-yyyy")+'.xlsx')
{



 this.productcheck=[];
 for(let p of this.exceltoJson['sheet1'])
 {
   if(this.productcheck.includes(p.productid)   )//prod.PRODUCT_ID !=  p.productid   ||
   {
   this.productstatus=false;
   this.calling=false;

   }
   
   this.productcheck.push(p.productid);
   
 
 }


if( this.productstatus===true)
{
  

if(this.exceltoJson['sheet1'].length  > this.productlist.length)
{
  this.calling=false;

  this.toastr.error('Selected Depot of products and excel products not matched !!!');

  setTimeout(() => {
    this.toastr.clear();
  }, 5000);
  setTimeout(() => {
    this.router.navigate(['/layout/bulkstock']);
    console.log('Navigate To BulkStock');
  }, 3000);

}
else{

    for (let p of this.exceltoJson['sheet1']) {
      if(p.depotid !=this.bulkstock.depotname )
      {
      
      this.depotstatus=false;
      this.calling=false;

      }
      }
      
      if(this.depotstatus===false)
      {
        this.toastr.error('Selected Depot and excel Depot not matched !!!');
        this.calling=false;

        setTimeout(() => {
          this.toastr.clear();
        }, 5000);
        setTimeout(() => {
          this.router.navigate(['/layout/bulkstock']);
          console.log('Navigate To BulkStock');
        }, 3000);
      }
      else
      {
        var reg = new RegExp('^[0-9]+$');




        for(let p of this.exceltoJson['sheet1'])
        {
          if(!reg.test(p.opening) || !reg.test(p.purchase))
          {
            
            
            alert('Check The Row OF This  Product '+p.productid+' Values');
            this.calling=false;
            this.router.navigate(['/layout/bulkstock']);
            return false;
            /* 
            

            this.toastr.error('Check The Row OF This  Product '+p.productid+' Values ');
            this.calling=false;
    
            setTimeout(() => {
              this.toastr.clear();
            }, 5000);
            setTimeout(() => {
              this.router.navigate(['/layout/bulkstock']);
              console.log('Navigate To BulkStock');
            }, 3000); */
          }
        
      /*   else
        {
          alert('No All numers');

        } */
        }
        
      }
   
  
  }
  
  

} else
{
   this.toastr.error('Uploaded Excel File Have Dubilicates Prodcuts Plz Check And Re-Upload!!!');
   this.calling=false;

   setTimeout(() => {
     this.toastr.clear();
   }, 5000);
   setTimeout(() => {
    this.router.navigate(['/layout/bulkstock']);
     console.log('Navigate To BulkStock');
   }, 3000);
}
console.log('Starting -----'+this.calling);
if(this.calling==true)
{
  
 this.ishidecalcel=true;
  
this.mysubmit=true;
this.msg="Uploaded Excel File Processing Please Wait.....";
const postData = {
  depotid: this.bulkstock.depotname,
  stockdate: this.datePipe.transform(this.bulkstock.bulkstockDateValue, "yyyy-MM-dd"),
  data : this.exceltoJson['sheet1'],
  gl : this.exceltoJson['filename']
};

console.log('Sending The Bulkstock Added Values : ' +JSON.stringify(postData));
this.rest.sendPostRequest('UploadBulkStock', JSON.stringify(postData)) 
  .subscribe(
    res => this.GetRespAddBulkstock1(res),
    error => this.GetErrorAddBulkstock1(error));
}
}
else{


  this.toastr.error('File Name Should '+'BulkStock_'+this.datePipe.transform(this.bulkstock.bulkstockDateValue, "dd-MM-yyyy")+'.xlsx');

  setTimeout(() => {
    this.toastr.clear();
  }, 5000);
  setTimeout(() => {
    this.router.navigate(['/layout/bulkstock']);
    console.log('Navigate To BulkStock');
  }, 3000);

  
}
 }
//Getting Response For Add Bulk STock
GetRespAddBulkstock1(resp) {
console.log('Getting Response For Add Bulk STock : ' + JSON.stringify(resp));
if (resp.RESP_STATUS === 'SUCCESS') {

  this.toastr.success(resp.RESP_DESC);
  console.log('BulkStock Added Successfully');
  setTimeout(() => {
    this.toastr.clear();
  }, 2500);
  setTimeout(() => {
    this.router.navigate(['/layout/bulkstock']);
    console.log('Navigate To BulkStock');
  }, 3000);
} else {
  this.mysubmit=false;

  console.log('Add Bulkstock Failed');
  this.toastr.error(resp.RESP_DESC);

  console.log('BulkStock Added Successfully');
  setTimeout(() => {
    this.toastr.clear();
  }, 2500);
  setTimeout(() => {
    this.router.navigate(['/layout/bulkstock']);
    console.log('Navigate To BulkStock');
  }, 5000);
}
}
//Getting Error For Add Bulk STock
GetErrorAddBulkstock1(error) {
this.toastr.error("Invalid....");
setTimeout(() => {
  this.toastr.clear();
}, 2500);
setTimeout(() => {

  this.router.navigate(['/layout/bulkstock']);
  console.log('Navigate To BulkStock');
}, 3000);
if(localStorage.getItem("TOKEN")===null)
{
this.toastr.error("Session Time Out Please Login Again....");
setTimeout(() => {
  this.toastr.clear();
}, 2500);
setTimeout(() => {
  this.router.navigate(['/layout/bulkstock']);
  console.log('Navigate To BulkStock');
}, 3000);

}


 }



 /*  validateBulkstocktest(f: NgForm) {
console.log('Date '+ this.datePipe.transform(this.bulkstock.bulkstockDateValue, "yyyy-MM-dd"));
console.log('Depot '+ this.bulkstock.depotname);
console.log('List data : '+this.exceltoJson);
console.log('Products  : '+this.depotlist);
const postData = {
  depotid: this.bulkstock.depotname,
  stockdate: this.datePipe.transform(this.bulkstock.bulkstockDateValue, "yyyy-MM-dd")
};



console.log('Sending The Bulkstock Added Values : ' +postData);
this.rest.sendPostRequest('uploadstock', postData) 
  .subscribe(
    res => this.GetRespAddBulkstock(res),
    error => this.GetErrorAddBulkstock(error));
}
 */
//Getting Response For Add Bulk STock
GetRespAddBulkstock(resp) {
console.log('Getting Response For Add Bulk STock : ' + JSON.stringify(resp));
if (resp.RESP_STATUS === 'SUCCESS') {

  this.toastr.success(resp.RESP_DESC);
  console.log('BulkStock Added Successfully');
  setTimeout(() => {
    this.toastr.clear();
  }, 2500);
  setTimeout(() => {
    this.router.navigate(['/layout/bulkstock']);
    console.log('Navigate To BulkStock');
  }, 3000);
} else {
  this.mysubmit=false;

  console.log('Add Bulkstock Failed');
  this.toastr.error(resp.RESP_DESC);
}
}
//Getting Error For Add Bulk STock
GetErrorAddBulkstock(error) {
this.toastr.error("Invalid....");
setTimeout(() => {
  this.toastr.clear();
}, 2500);
setTimeout(() => {

  this.router.navigate(['/layout/bulkstock']);
  console.log('Navigate To BulkStock');
}, 3000);
if(localStorage.getItem("TOKEN")===null)
{
this.toastr.error("Session Time Out Please Login Again....");
setTimeout(() => {
  this.toastr.clear();
}, 2500);
setTimeout(() => {
  this.router.navigate(['/layout/bulkstock']);
  console.log('Navigate To BulkStock');
}, 3000);

}

console.log('Getting Error For Add BulkStock : ' + JSON.stringify(error));
}


  handleFileInput(event: any) {


    console.log('Date '+ this.datePipe.transform(this.bulkstock.bulkstockDateValue, "yyyy-MM-dd"));
    console.log('Depot '+ this.bulkstock.depotname);
    console.log('Product '+ this.bulkstock.productname);
if(this.datePipe.transform(this.bulkstock.bulkstockDateValue, "yyyy-MM-dd")===null || this.bulkstock.depotname===undefined  || this.bulkstock.productname===undefined)

{
this.bulkstock.profileImage='';
alert('Should Select all fields !!!');
return false;

}
    this.prodcut=false;
  

  this.exceltoJson = {};
  let headerJson = {};
  /* wire up file reader */
  const target: DataTransfer = <DataTransfer>(event.target);
  // if (target.files.length !== 1) {
  //   throw new Error('Cannot use multiple files');
  // }
  const reader: FileReader = new FileReader();
  reader.readAsBinaryString(target.files[0]);
  console.log("filename", target.files[0].name);

/*   alert(target.files[0].size/1024/1024 );

if() */

if(target.files[0].name !='BulkStock_'+this.datePipe.transform(this.bulkstock.bulkstockDateValue, "dd-MM-yyyy")+'.xlsx')
{


  alert('File Name Should '+'BulkStock_'+this.datePipe.transform(this.bulkstock.bulkstockDateValue, "dd-MM-yyyy")+'.xlsx');

  this.router.navigate(['/layout/bulkstock']);

  return false;

 /*  setTimeout(() => {
    this.toastr.clear();
  }, 3000);
  setTimeout(() => {
    
    this.router.navigate(['/layout/bulkstock']);
    console.log('Navigate To BulkStock');
  }, 3000); */


}

  this.exceltoJson['filename'] = target.files[0].name;
  reader.onload = (e: any) => {
    /* create workbook */
    const binarystr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
    for (var i = 0; i < wb.SheetNames.length; ++i) {
     // alert();
      const wsname: string = wb.SheetNames[i];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      this.exceltoJson[`sheet${i + 1}`] = data;
      const headers = this.get_header_row(ws);
      headerJson[`header${i + 1}`] = headers;
      //  console.log("json",headers)
    }

  // alert((headerJson[`header1`].length));


if( headerJson[`header1`].length != 7)
{
  alert('Uploaded Excel Colmuns  Not Matched !!!');
  this.router.navigate(['/layout/bulkstock']);
    return false;
}
//alert(headerJson[`header1`][0]);

if(headerJson[`header1`][0]!='depotid'  || headerJson[`header1`][1]!='productid' || headerJson[`header1`][2]!='opening' || headerJson[`header1`][3]!='purchase' || headerJson[`header1`][4]!='loaded' ||  headerJson[`header1`][5]!='transfer' ||  headerJson[`header1`][6]!='closing')
{

  alert('Uploaded Excel Colmuns Order/Name Not Matched !!!');
  this.router.navigate(['/layout/bulkstock']);
    return false;
}



if(this.exceltoJson['sheet1'].length === 0)
{
 
alert('Uploaded File Is Empty....');
this.router.navigate(['/layout/bulkstock']);
  return false;
}

else
{
  this.isDisbale=true;
}


    this.exceltoJson['headers'] = headerJson;
    console.log(this.exceltoJson['sheet1'] );

    //this.exceltoJson=
    
   // this.exceltoJson['sheet1'];
  };
}

get_header_row(sheet) {
  var headers = [];
  var range = XLSX.utils.decode_range(sheet['!ref']);
  var C, R = range.s.r; /* start in the first row */
  /* walk every column in the range */
  for (C = range.s.c; C <= range.e.c; ++C) {
    var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
    // console.log("cell",cell)
    var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
    if (cell && cell.t) {
      hdr = XLSX.utils.format_cell(cell);
      headers.push(hdr);
    }
  }
  return headers;
}
}
