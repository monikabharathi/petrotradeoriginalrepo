import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  product: any = {};
  form:any;
  mysubmit : any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  unitlist = [];
  depotlist = [];
  depotName: any;
  depotId: any;
  depotLocation: any;
  constructor(
    private router: Router,
     private rest: RestapiService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.mysubmit=false;
    this.getdepotlist();
    this.getunitlist();
  }

  //Getting The Unit List For Add Product
  getunitlist() {
    let postData = {
    };
     //Sending Request For Getting The Unit List For Add Product 
     console.log('Sending Request For Getting The Unit List For Add Product  : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('unitlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespUnitListProduct(res),
        error => this.GetErrorUnitListProduct(error));
  }
 //Getting Response For UnitList To Add Product
  GetRespUnitListProduct(resp) {
    this.unitlist = resp;
    console.log('Getting Response For UnitList To Add Product: ' + JSON.stringify(resp));
  }
   //Getting Error For UnitList To Add Product
  GetErrorUnitListProduct(error) {
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
    console.log('Getting Error For UnitList To Add Product: ' + JSON.stringify(error));
  }

 //Getting The Depot List For Add Product
  getdepotlist() {
    let postData = {
      listcall: ''
    };
    //Sending Request For Getting The Depot List For Add Product 
    console.log('Sending Request For Getting The Depot List For Add Product  : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('authorizeddepotlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespDepotListDepot(res),
        error => this.GetErrorDepotListDepot(error));
  }
 //Getting Response For DepotList To Add Product
  GetRespDepotListDepot(resp) {
   this.depotlist = resp;
    console.log('Getting Response For DepotList To Add Product: ' + JSON.stringify(resp));
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'DEPOT_ID',
      textField: 'DEPOT_NAME',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
    console.log('  this.dropdownSettings: ' + JSON.stringify(  this.dropdownSettings));
  }
  GetErrorDepotListDepot(error) {
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
    console.log('Getting Error For DepotList To Add Product: ' + JSON.stringify(error));
  }
  onItemSelect(item: any) {
    console.log("Selected item : " + JSON.stringify(item));

  }
  onSelectAll(items: any) {
    console.log('Selected All : ' + JSON.stringify(items));
  }
 //Getting The Add Product Values After Submit
  validateProduct(f: NgForm) {
    console.log('Getting The Add Product Values After Submit');
    console.log('productname : ' + this.product.productname);
    console.log('productid : ' + this.product.productid);
    console.log('depotList : ' + JSON.stringify(this.selectedItems));
    console.log('units : ' + this.product.units);
    console.log('productdescription : ' + this.product.productdescription);




    if(this.product.productname === this.product.productid )
    {
      alert('Product Name and Product Id Should Not Same !!! : ' );
      return false;
    }


    this.mysubmit=true;





    const postData = {
      productname: this.product.productname,
      productid: this.product.productid,
      units: this.product.units,
      productdescription:this.product.productdescription,
      depotlist: this.selectedItems
    };
     //Sending The Added Values For Product
    console.log('Sending The Added Values For Product :' + JSON.stringify(postData));
    this.rest.sendPostRequest('addproduct', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespAddproduct(res),
        error => this.GetErrorAddproduct(error));
  }

  //Getting Response for Add Product
  GetRespAddproduct(resp) {
    console.log('Getting Response for Add Product : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('Product Added Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/product']);
        console.log('Navigate to product');
      }, 3000);
    } else {
      console.log('Failed For Add Product');
      this.mysubmit=false;

      this.toastr.error(resp.RESP_DESC);
    }
  }
  //Getting Error For Add Product
  GetErrorAddproduct(error) {
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
    console.log('Getting Error for Add Product : ' + JSON.stringify(error));

  }





}