import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';

@Component({
  selector: 'app-addsupplier',
  templateUrl: './addsupplier.component.html',
  styleUrls: ['./addsupplier.component.css']
})
export class AddsupplierComponent implements OnInit {
  supplier: any = {};
  form: any;
  mysubmit : any;
  addedsupplierlist : any[];
  config: any;
  filter: any;
  edited: any;
  collection = { data: [] };
  supplierlist: any[];
  isActive: any;
  tanklist = [];


  constructor(
    private router: Router,
    private rest: RestapiService,
    private toastr: ToastrService
  ) { }
  ngOnInit() {
    this.mysubmit=false;
  this.getsupplierlist();
  this.tankstatuslist();

  this.edited='';
  }


  //status 

  tankstatuslist() {
    let postData = {
    };
    //sending request for Getting TankStatuslist For AddLinkSupplier
    console.log(' sending request for Getting TankStatuslist For AddLinkSupplier : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('tankstatus', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespTankStatus(res),
        error => this.GetErrorTankStatus(error));
  }
   //getting response for Getting TankStatuslist For AddLinkSupplier
   GetRespTankStatus(resp) {
    this.tanklist = resp;
    console.log('getting response for Getting TankStatuslist For AddLinkSupplier: ' + JSON.stringify(resp));
  }
  //getting Error for Getting TankStatuslist For AddLinkSupplier
  GetErrorTankStatus(error) {
    console.log('getting Error for Getting TankStatuslist For AddLinkSupplier: ' + JSON.stringify(error));
  }

  //Getting The All Supplier List Showing
  getsupplierlist() {
    let postData = {
      listcall:'SUPPLIERLISTADD'
    };
    //Sending Request For Getting The All Supplier List Showing
    console.log('Sending Request For Getting The All Supplier List Showing : ' + JSON.stringify(postData));
     this.rest.sendPostRequest('homesupplierlist ',JSON.stringify(postData))
      .subscribe(
        res => this.GetRespSupplier(res),
        error => this.GetErrorSupplier(error));
  }
  //Response For Getting The All Supplier List Showing
  GetRespSupplier(resp) {

    //  this.isActive = !this.isActive;
    

    this.addedsupplierlist = resp;
    this.edited='no';
    this.supplier.edit='';
    this.supplier.supplierrandom='';

    console.log('Response For Getting The All Supplier List Showing: ' + JSON.stringify(resp));
     console.log('this.edited: ' +this.edited);
    this.initPagination();
  }
   //Error For Getting The All Supplier List Showing
  GetErrorSupplier(error) {
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
    console.log('Error For Getting The All Supplier List Showing: ' + JSON.stringify(error));
 
  }
 //pagination start
 initPagination() {
  this.collection.data = this.addedsupplierlist;
  console.log('Pagination Data Showing Supplier Data : ' + JSON.stringify(this.collection.data));
  if (this.collection.data != null) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.addedsupplierlist.length
    };
  }
}
pageChanged(event) {
  this.config.currentPage = event;
}
//pagination ended

//Getting The Add Supplier Values After Submit
  validateSupplier(f: NgForm) {
    this.mysubmit=true;
    console.log('Getting The Add Supplier Values After Submit');
    console.log('suppliername : ' + this.supplier.suppliername);
    console.log('supplierid : ' + this.supplier.supplierid);
    console.log('editid : ' + this.supplier.edit);
    const postData = {
      suppliername: this.supplier.suppliername,
      supplierid: this.supplier.supplierid,
      flag: this.supplier.tankstatus,
      supplierrandom: this.supplier.supplierrandom,
      listcall:this.supplier.edit
   };
    //Sending The Added Values For Supplier
    console.log('Sending The Added Values For Supplier:' + JSON.stringify(postData));
    this.rest.sendPostRequest('addsupplier', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespAddSupplier(res),
        error => this.GetErrorAddSupplier(error));
  }

 //Getting Response For Add Supplier
  GetRespAddSupplier(resp) {
    console.log('Getting Response For Add Supplier: ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('supplier Added Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/supplier']);
        console.log('Navigate To Supplier');
      }, 3000);
    } else {
      this.mysubmit=false;

      this.toastr.error(resp.RESP_DESC);
    }
  }
  //Getting Error For Add Supplier
  GetErrorAddSupplier(error
    ) {
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
    console.log('Getting Error For Add Supplier: ' + JSON.stringify(error));

  }
   SupplierEdit(data) {
    console.log('SupplierEdit data : ' +JSON.stringify(data));
    this.supplier.suppliername=data.SUPPLIER_NAME;
    this.supplier.supplierid=data.SUPPLIER_ID;
    this.supplier.tankstatus=data.FLAG;
    this.supplier.supplierrandom=data.SUPPLIER_RANDOM;

    this.supplier.edit='E';
    this.edited='yes';
  }
}


