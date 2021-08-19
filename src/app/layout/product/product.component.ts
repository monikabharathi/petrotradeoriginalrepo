import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  config: any;
  filter: any;
  collection = { data: [] };
  productlist: any[];
 loading:boolean=true;
//maker
deletevisiable: any; 
editvisiable: any;
addvisiable: any;
//both
viewvisiable: any;
//checker
deleteauthvisiable: any;
authprofilevisiable: any

menuactions : any;
  constructor(
    private rest: RestapiService,
    private passData: PassdataService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    console.log('Get all product list  ');
    this.getproductlist();


    this.menuactions = JSON.parse(localStorage.getItem('MENUSACTIONS'));

    console.log("MenusActions :: "+JSON.stringify(this.menuactions.undersub));
    
    
    this.deletevisiable=false;
    this.editvisiable=false;
    this.viewvisiable=false;
    this.addvisiable=false;
    
    
    this.deleteauthvisiable=true;
    this.authprofilevisiable=true;
    
    
    
    
    
    for (let unaction of this.menuactions.undersub) {
    if (unaction.SUBMENUID === '00102' && unaction.SUPERMENUID==='0010201' && unaction.FLAG===false) {
    
    //add profile
    this.addvisiable=true;
    
    }
    if (unaction.SUBMENUID === '00102' && unaction.SUPERMENUID==='0010202' && unaction.FLAG===false) {
    
    //edit profile
    this.editvisiable=true;
    
    }
    if (unaction.SUBMENUID === '00102' && unaction.SUPERMENUID==='0010203' && unaction.FLAG===false) {
    
    //delete profile
    this.deletevisiable=true;
    
    }
    if (unaction.SUBMENUID === '00102' && unaction.SUPERMENUID==='0010204'&& unaction.FLAG===false) {
    
    
    //view profile
    this.viewvisiable=true;
    
    }
    
    }
    



    /* if(localStorage.getItem('USERTYPE')==='B')
    {
      this.deletevisiable=false;
      this.editvisiable=false;
      this.viewvisiable=false;
      this.addvisiable=false;
  
  
  
    this.deleteauthvisiable=true;
    this.authprofilevisiable=true;
    }
  else{
    this.viewvisiable=false;
    this.deleteauthvisiable=false;
    this.authprofilevisiable=false;
  
  
  
    this.deletevisiable=true;
      this.editvisiable=true;
      this.addvisiable=true;
  }
   */



    this.spinner.show(); 
    setTimeout(()=>{
      this.loading=false;
      this.spinner.hide();
    },200);
  }
  //Getting The All product list showing
  getproductlist() {
    let postData = {
      listcall:''
    };
     this.rest.sendPostRequest('homeproductlist ', JSON.stringify(postData))
      .subscribe(
        res => this.getproductresp(res),
        error => {
          this.getError(error);
          this.spinner.hide();
        });
  }
 getproductresp(resp) {
    this.productlist = resp;
    console.log('All product list values: ' + JSON.stringify(resp));
    this.initPagination();
    setTimeout(()=>{
      this.loading=false;
      this.spinner.hide();
    },50);
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
    console.log(error);
  }

  //view the particular product value
  ViewProduct(data) {
    console.log('view particular Product value : ' + JSON.stringify(data));
     let postData = {
      listcall:'VIEW',
      productid:data.PRODUCT_ID
    };
    console.log(' send particular product value : ' + JSON.stringify(postData));
   this.rest.sendPostRequest('homeproductlist ', JSON.stringify(postData))
    .subscribe(
      res => this.getproductrespview(res),
      error => this.getError1(error));
}
getproductrespview(resp) {
  this.passData.setJSONData(resp);
  console.log('getproductrespview: ' + JSON.stringify(resp));
   this.router.navigate(['/layout/viewproduct']);
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
 //end view product
  //delete the particular product value
  DeleteProduct(data) {
    console.log('Delete particular Product value : ' + JSON.stringify(data));
     let postData = {
      listcall:'VIEW',
      productid:data.PRODUCT_ID
    };
    console.log(' send particular product value : ' + JSON.stringify(postData));
   this.rest.sendPostRequest('homeproductlist ', JSON.stringify(postData))
    .subscribe(
      res => this.getproductrespdelete(res),
      error => this.getErrordelete(error));
}
getproductrespdelete(resp) {
  this.passData.setJSONData(resp);
  console.log('getproductrespdelete: ' + JSON.stringify(resp));
   this.router.navigate(['/layout/deleteproduct']);
}
getErrordelete(error) {
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
 //end delete product




  //Edit the particular product value
  EditProduct(data) {
    console.log('Edit particular Product value : ' + JSON.stringify(data));
     let postData = {
      listcall:'VIEW',
      productid:data.PRODUCT_ID
    };
    console.log(' send particular product value : ' + JSON.stringify(postData));
   this.rest.sendPostRequest('homeproductlist ', JSON.stringify(postData))
    .subscribe(
      res => this.getproductrespedit(res),
      error => this.getErroredit(error));
}
getproductrespedit(resp) {
  this.passData.setJSONData(resp);
  console.log('getproductrespedit: ' + JSON.stringify(resp));
   this.router.navigate(['/layout/editproduct']);
}
getErroredit(error) {
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
 //end edit product
 


  
  //pagination start
  initPagination() {
    this.collection.data = this.productlist;
    console.log('Pagination Data showing product data : ' + JSON.stringify(this.collection.data));
    if (this.collection.data != null) {
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.productlist.length
      };
    }
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  //pagination ended

}
