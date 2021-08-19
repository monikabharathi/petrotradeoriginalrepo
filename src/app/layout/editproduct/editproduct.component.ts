import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { PassdataService } from '../../services/passdata.service';
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  productlist: any;
  res: any;
  mysubmit : any;
  form: any;
  product: any = {};
  unitlist = [];
  depotlist = [];
  dropdownList = [];
  selectedItems: any;
  selectedDepot: any = [];
  selectedDepotList: any = [];
  dropdownSettings = {};
  constructor(
    private passData: PassdataService,
    private rest: RestapiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.mysubmit=false;
    this.getunitlist();
    this.getdepotlist();
    //Getting edit product Data
    let data = this.passData.getJSONData();
    this.productlist = this.passData.getJSONData();
    console.log('Getting edit product Data: ' + JSON.stringify(data));
    let productid;
    let productname;
    let units;
    let depotId;
    let depotName;
    this.selectedDepot = [];
    let productdescription;
    for (let i of data) {
      productid = i.PRODUCT_ID;
      productname = i.PRODUCT_NAME;
      units = i.UNIT;
      depotId = i.DEPOT_ID;
      depotName = i.DEPOT_NAME;
      productdescription= i.PRODUCT_DESCRIPTION;
      let depotList = { DEPOT_ID: depotId, DEPOT_NAME: depotName };
      this.selectedDepot.push(depotList);
    }
    console.log('productid---: ' + productid);
    console.log('productname---: ' + productname);
    console.log('units---: ' + units);    
    console.log('productdescription---: ' + productdescription);
    console.log('this.selectedDepot : ' + JSON.stringify(this.selectedDepot));
    this.product.productname = productname;
    this.product.productid = productid;
    this.product.units = units;
    this.product.productdescription= productdescription;
    //this.selectedItems=selectedItems; 
    //this.selectedDepot=selectedItems; 
    //let depotList={DEPOT_ID:depotId,DEPOT_NAME:depotName};
    //this.selectedDepot.push(JSON.stringify(depotList));
    //this.selectedDepot=depotList;

  }
  //Getting The Unit list For Product Edit 
  getunitlist() {
    let postData = {
    };
    console.log('Sending The Unit list data For Product Edit :' + JSON.stringify(postData));
    this.rest.sendPostRequest('unitlist', JSON.stringify(postData))
      .subscribe(
        res => this.getunitlistresp(res),
        error => this.getErrorunitlist(error));
  }
  //Getting Reponse unit list for product 
  getunitlistresp(resp) {
    this.unitlist = resp;
    console.log('unitlist for product edit time: ' + JSON.stringify(resp));
  }
  getErrorunitlist(error) {
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
    console.log(error);
  }

//Getting depot list for product edit time
  getdepotlist() {
    let postData = {
      listcall: ''
    };
    this.rest.sendPostRequest('authorizeddepotlist', JSON.stringify(postData))
      .subscribe(
        res => this.getdepotResp(res),
        error => this.getError1(error));
  }
  //Getting Response Depot list for product 
  getdepotResp(resp) {

    this.depotlist = resp;
    console.log('Getting the Depotlist for product: ' + JSON.stringify(resp));
    /* this.selectedDepotList=[
      {DEPOT_ID:this.selectedDepot.DEPOT_ID,DEPOT_NAME:this.selectedDepot.DEPOT_NAME}
    ]; */
    this.selectedDepotList = this.selectedDepot;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'DEPOT_ID',
      textField: 'DEPOT_NAME',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
    console.log('Selected Depot 222: ' + (JSON.stringify(this.selectedDepotList)));
  }
  getError1(error) {
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
    console.log(error);
  }
  onItemSelect(item: any) {
    console.log("Selected item : " + JSON.stringify(item));
  }
  onSelectAll(items: any) {
    console.log('Selected All : ' + JSON.stringify(items));
  }

  //Validating the edit Product
  validateProduct(f: NgForm) {
    console.log('Validate the edit product');
    console.log('productname : ' + this.product.productname);
    console.log('productid : ' + this.product.productid);
    console.log('depotList : ' + JSON.stringify(this.selectedDepotList));
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
      depotlist: this.selectedDepotList,
      productdescription:this.product.productdescription
    };
    console.log('Edit Product Data :' + JSON.stringify(postData));
    this.rest.sendPostRequest('editproduct', JSON.stringify(postData))
      .subscribe(
        res => this.getproductresp(res),
        error => this.getError(error));
  }

  //Getting Response for Edit Product
  getproductresp(resp) {
    console.log('getproductresp : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('Product Edited Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/product']);
        console.log('Navigate to product');
      }, 3000);
    } else {
      this.mysubmit=false;
      this.toastr.error(resp.RESP_DESC);
    }
  }
  getError(error) {
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
    console.log('ErrorOccured : ' + JSON.stringify(error));

  }
}
