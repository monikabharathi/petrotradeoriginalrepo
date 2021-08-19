import { PassdataService } from '../../services/passdata.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';

@Component({
  selector: 'app-editsupplier',
  templateUrl: './editsupplier.component.html',
  styleUrls: ['./editsupplier.component.css']
})
export class EditsupplierComponent implements OnInit {
  ishide: any;

  model: any = {};
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  supplierlist:[];
  depotlist = [];
  productlist = [];
  supplierlistedit: any;
  selectedProduct:any=[];
  selectedProductList:any=[];
  getError88: any;
  form:any;
editedProduct=[];
  constructor(
    private passData: PassdataService,
    private rest: RestapiService,
    private toastr: ToastrService,
    private router: Router, ) { }

  ngOnInit() {
    this.ishide=false;

    //this.getdepotlist();
    this.getsupplierlist();
    let data=this.passData.getJSONData();
    this.supplierlistedit=this.passData.getJSONData();
    console.log(' supplierlist for edit Data ---: '+JSON.stringify(data));
    let suppliername;
    let leadtime;
    let depotid;
    let depotname;
    let productId;
    let productName;
    let supplierid;
    this.selectedProduct=[];
  
    for(let i of data){
      suppliername=i.SUPPLIER_NAME;
      supplierid=i.SUPPLIER_ID;
      depotid=i.DEPOT_ID;
      depotname=i.DEPOT_NAME;
     /*  productId=i.PRODUCT_ID;
      productName=i.PRODUCT_NAME;
      let productList={PRODUCT_ID:productId,PRODUCT_NAME:productName};
      this.selectedProduct.push(productList); */
    }
    console.log('suppliername---: '+suppliername);
    console.log('leadtime---: '+leadtime);
    console.log('depotid---: '+depotid);  
    console.log('depotname---: '+depotname);
    
     this.model.suppliername=suppliername;
     this.model.depotname=depotname; 
     this.model.supplierid=supplierid;  
     this.model.depotid=depotid;
     /*  let postData= {
        depotid: depotid,
        listcall: 'PRODLINKDEPOT'
      };
      console.log('sending edit depotid for productlist for edittime : ' + JSON.stringify(postData));
      this.rest.sendPostRequest('homeproductlist', JSON.stringify(postData))
        .subscribe(
          res => this.getproductrespedittime(res),
          error => this.getError88(error));
    }
    //getting product response based on depot name selection in edit timesupplier
    getproductrespedittime(resp) {
    
      this.productlist = resp;
      console.log('getting productlist: ' + JSON.stringify(resp));
     this.selectedProductList=this.selectedProduct;
      console.log('selectedProductList edittime start: '+(JSON.stringify(this.selectedProductList))); 
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'PRODUCT_ID',
        textField: 'PRODUCT_NAME',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 4,
        allowSearchFilter: true
      };
    }
   
    
  //getting the depot list for supplier add
  getdepotlist() {
    let postData = {
      listcall: ''
    };
    //sending request for depot list
    console.log(' depot list for supplier: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('getdepotlist', JSON.stringify(postData))
      .subscribe(
        res => this.getdepotResp(res),
        error => this.getError1(error));
  }
  //getting response for depot
  getdepotResp(resp) {
    this.depotlist = resp;
    console.log('depotlist for product: ' + JSON.stringify(resp));
  }
  getError1(error) {
    console.log(error);
  } */

}

//getting the productlist for supplier based on depot selection
/* getproductlistfordepot(depotid: string): void {
  console.log("depot id for selction-->" + depotid);
  let postData = {
    depotid: depotid,
    listcall: 'PRODLINKDEPOT'
  };
  console.log('send depotid for productlist in edit link supplier : ' + JSON.stringify(postData));
  this.rest.sendPostRequest('homeproductlist', JSON.stringify(postData))
    .subscribe(
      res => this.getproductresp(res),
      error => this.getError1(error));
}
//getting product response based on depot name selection in edit link supplier
getproductresp(resp) {

  this.productlist = resp;
  console.log('productlist for edit supplier: ' + JSON.stringify(resp));
  this.selectedProductList='';
  console.log('selectedProductList edit select diff: '+(JSON.stringify(this.selectedProductList))); 
  this.dropdownSettings = {
    singleSelection: false,
    idField: 'PRODUCT_ID',
    textField: 'PRODUCT_NAME',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 4,
    allowSearchFilter: true
  };
}
onItemSelect(item: any) {
  console.log("Selected item : " + JSON.stringify(item));
}
onSelectAll(items: any) {
  console.log('Selected All : ' + JSON.stringify(items));
} */
//end  



 //getting the supplier list for supplier link add
 getsupplierlist() {
  let postData = {
    listcall: 'SUPPLIERLIST'
  };
  //sending request for supplier list
  console.log(' supplier list for supplier link add: ' + JSON.stringify(postData));
  this.rest.sendPostRequest('homesupplierlist', JSON.stringify(postData))
    .subscribe(
      res => this.getsupplierResp(res),
      error => this.getErrorsupplier(error));
}
//getting response for supplierlist
getsupplierResp(resp) {
  this.supplierlist = resp;
  console.log('supplierlist for linksupplier: ' + JSON.stringify(resp));
}
getErrorsupplier(error) {
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




 //Validating the edit linksupplier
 validatelinkSupplier(f: NgForm) {
  console.log('Validate the edit link supplier');
  this.ishide="true";

  console.log('suppliername : ' + this.model.suppliername);
  console.log('depotid : ' + this.model.depotid);
  console.log('supplierid : ' + this.model.supplierid);
  console.log('data : ' + JSON.stringify(this.supplierlistedit));
  console.log('edited productlist : ' + JSON.stringify(this.editedProduct));
  const postData = {
    supplierid: this.model.supplierid,
     depotid: this.model.depotid,
     data:this.supplierlistedit
   //  edited:
   // productname: this.selectedProductList,
    };
  console.log('edit link supplier Data :' + JSON.stringify(postData));
  this.rest.sendPostRequest('editsupplier', JSON.stringify(postData))
    .subscribe(
      res => this.getlinksupplierresp(res),
      error => this.getError(error));
}

//Getting Response for Add link supplier
getlinksupplierresp(resp) {
  console.log('getproductresp : ' + JSON.stringify(resp));
  if (resp.RESP_STATUS === 'SUCCESS') {
    this.toastr.success(resp.RESP_DESC);
    console.log('supplier link Edited Successfully');
    setTimeout(() => {
      this.toastr.clear();
    }, 2500);
    setTimeout(() => {
      this.router.navigate(['/layout/supplier']);
      console.log('Navigate to supplier');
    }, 3000);
  } else {
    this.ishide=false;

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


editproduct(pid){

  console.log("edited productid--"+pid);
  let productList={productid:pid};
  this.editedProduct.push(productList); 
  console.log('editedProduct list is  : ' + JSON.stringify(this.editedProduct));
}
}
