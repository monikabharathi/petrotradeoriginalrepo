import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';

@Component({
  selector: 'app-addlinksupplier',
  templateUrl: './addlinksupplier.component.html',
  styleUrls: ['./addlinksupplier.component.css']
})
export class AddlinksupplierComponent implements OnInit {
  model: any = {};
  supplierlist = [];
  depotlist = [];
  selectedItems = [];
  dropdownSettings = {};
  productlist = [];
  selectedProductList:any=[];
  form:any;
  ishide: any;
  constructor(
    private router: Router,
    private rest: RestapiService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.ishide=true;
    this.getdepotlist();
    this.getsupplierlist();
  } 
  //Getting The Depot List For Add LinkSupplier
  getdepotlist() {
    let postData = {
      listcall: ''
    };
    //Sending Request For Getting The Depot List For Add LinkSupplier
    console.log('Sending Request For Getting The Depot List For Add LinkSupplier: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('authorizeddepotlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespDepot(res),
        error => this.GetErrorDepot(error));
  }
// Response For Getting The Depot List For Add LinkSupplier
  GetRespDepot(resp) {
    this.depotlist = resp;
    console.log('Response For Getting The Depot List For Add LinkSupplier: ' + JSON.stringify(resp));
  }
  // Error For Getting The Depot List For Add LinkSupplier
  GetErrorDepot(error) {
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
    console.log('Error For Getting The Depot List For Add LinkSupplier: ' + JSON.stringify( error));
     }


 //Getting The Supplier List For Add LinkSupplier
  getsupplierlist() {
    let postData = {
      listcall: 'SUPPLIERLIST'
    };
    //Sending Request for Getting The Supplier List For Add LinkSupplier
    console.log('Sending Request for Getting The Supplier List For Add LinkSupplier: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homesupplierlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespSupplier(res),
        error => this.GetErrorSupplier(error));
  }
  //Response For Getting The Supplier List For Add LinkSupplier
  GetRespSupplier(resp) {
    this.supplierlist = resp;
    console.log('Response For Getting The Supplier List For Add LinkSupplier: ' + JSON.stringify(resp));
  }
    //Error For Getting The Supplier List For Add LinkSupplier
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
    console.log('Response For Getting The Supplier List For Add LinkSupplier: ' + JSON.stringify(error));
  }


  //changesuppplier

  changesuppplier()
  {
    this.model.depotname=' ';
    this.productlist=[];
    this.ishide=true;
   /*  alert('changesuppplier')
    if(this.productlist.length !==0)
    {
     for(let p of this.productlist) {
       p.checkboxstatus=false;
       p.FLAG=false;
       
     } */
  }
  //checkBox

  changeCheckBox(p,val,proid)
  {
    this.ishide=true;

 // alert("status > "+val+"proid > "+proid);
  if(val===true) {
    p.leadtime=undefined;


    // this.productlist[i].checkboxstatus=true;
    const postData = {
      supplierid: this.model.suppliername,
        depotid: this.model.depotname,
          productid:proid
    };
    //Sending Add linkSupplier Values
    console.log('Sending Add linkSupplier Values :' + JSON.stringify(postData));
    this.rest.sendPostRequest('verifyproductforsupplier', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespProdutds(p,res),
        error => this.GetErrorAddLinkRespProdutdsSupplier(error));
  }
  else{
    p.leadtime=undefined;

    p.isDisabled=true;
    for(let p of this.productlist) 
    {
      if(p.checkboxstatus===true)
      {
        this.ishide=false;
      }
      
    }
  }
}
  //Getting Response for Sending Add linkSupplier Values
  async GetRespProdutds(p,resp) {
    console.log('Getting Response for Sending Add linkSupplier Values : ' + JSON.stringify(resp));
    // alert('resp.RESP_STATUS : '+resp.RESP_STATUS);
    //console.log('p.checkboxstatus: '+this.productlist[i].checkboxstatus);
    console.log('p.checkboxstatus: '+p.checkboxstatus);
    if (resp.RESP_STATUS === 'SUCCESS') 
    {
      p.isDisabled=false;
      this.ishide=false;
    //  p.leadtime=undefined;


    } 
    
    else {
     // p.isDisabled=false;


      await this.toastr.success(resp.RESP_DESC);
      setTimeout(() => {
        this.toastr.clear();
        p.checkboxstatus=false;
       // p.leadtime="undefined";

        for(let p of this.productlist) 
        {
          if(p.checkboxstatus===true)
          {
            this.ishide=false;

          }
          
        }
        console.log('p.checkboxstatus: '+p.checkboxstatus);
      }, 1500);
      
    }
  }
  //Getting Error for Sending Add linkSupplier Values
  GetErrorAddLinkRespProdutdsSupplier(error) {
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
    console.log('Getting Error for Sending Add linkSupplier Values : ' + JSON.stringify(error));

  }




 //Getting The product List For Add LinkSupplier
  getproductlistfordepot(depotid: string): void {
    
   // alert("Depot Id Selection for LinkSupplier" + depotid)
    console.log("Depot Id Selection for LinkSupplier" + depotid);
    let postData = {
      depotid: depotid,
      listcall: 'PRODLINKDEPOT'
    };
    //Sending the Request Getting The product List For Add LinkSupplier
    console.log('Sending the Request Getting The product List For Add LinkSupplier123 : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homeproductlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespProductList(res),
        error => this.GetErrorProductList(error));
  }
  //Response for Getting The product List For Add LinkSupplier
  GetRespProductList(resp) {
     this.productlist = resp;
     if(this.productlist.length !==0)
     {
       
      for(let p of this.productlist) 
      {
        p.checkboxstatus=false;
        p.isDisabled=true;
      //  p.leadtime="undefined";
        
      }
      // this.ishide=false;
    console.log('Response for Getting The product List For Add LinkSupplier: ' + JSON.stringify(resp));
    /* this.selectedProductList='';
   this.dropdownSettings = {
      singleSelection: false,
      idField: 'PRODUCT_ID',
      textField: 'PRODUCT_NAME',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    }; */
  }
  else{
    this.ishide=true;

    this.toastr.error("No Products Are Configured With Selected Depot !!! ");
    setTimeout(() => {
      this.toastr.clear();
    }, 2000);
    //this.router.navigate(['/layout/supplier']);


  }
  }
  onItemSelect(item: any) {
    console.log("Selected item : " + JSON.stringify(item));
  }
  onSelectAll(items: any) {
    console.log('Selected All : ' + JSON.stringify(items));
  }
  //Error for Getting The product List For Add LinkSupplier
  GetErrorProductList(error) {
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
    console.log('Error for Getting The product List For Add LinkSupplier: ' + JSON.stringify(error));

  }
   //Getting The Add linkSupplier Values After Submit
  validatelinkSupplier(f: NgForm) {
    console.log('Getting The Add linkSupplier Values After Submit');
    console.log('suppliername : ' + this.model.suppliername);
 //   console.log('leadtime : ' + this.model.leadtime);
    console.log('depotname : ' + this.model.depotname);
   // console.log('productlist : ' + JSON.stringify(this.selectedProductList));
   console.log('data :'+ JSON.stringify(this.productlist));


   for(let p of this.productlist) 
   {

    //alert('leadtime '+p.leadtime)
      if(p.checkboxstatus===true && p.leadtime === undefined)
     {

alert('Please select lead time for:  '+p.PRODUCT_NAME);
return false;

     } 
    
     
   }
   this.ishide="true";


    const postData = {
      supplierid: this.model.suppliername,
    //  leadtime: this.model.leadtime,
      depotid: this.model.depotname,
     // productname: this.selectedProductList
     data:this.productlist
    };
    //Sending Add linkSupplier Values
    console.log('Sending Add linkSupplier Values :' + JSON.stringify(postData));
    this.rest.sendPostRequest('linksupplier', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespAddLinkSupplier(res),
        error => this.GetErrorAddLinkSupplier(error));
  }
 
  //Getting Response for Sending Add linkSupplier Values
  GetRespAddLinkSupplier(resp) {
    console.log('Getting Response for Sending Add linkSupplier Values : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('supplier link Added Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/supplier']);
        console.log('Navigate to supplier');
      }, 3000);
    } else {
      this.ishide=false;

      console.log('Added Error Supplier Link');
      this.toastr.error(resp.RESP_DESC);
    }
  }
  //Getting Error for Sending Add linkSupplier Values
  GetErrorAddLinkSupplier(error) {
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
    console.log('Getting Error for Sending Add linkSupplier Values : ' + JSON.stringify(error));

  }

}


