import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  config: any;
  filter: any;
  collection = { data: [] };
  supplierlist: any[];
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
linksuppliervisiable : any;
menuactions : any;

  postDataSer  : any;

  constructor(
    private rest: RestapiService,
    private passData: PassdataService,
    private Data: DataService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    console.log('Get all supplier list  ');
    this.getsupplierlist();
    this.menuactions = JSON.parse(localStorage.getItem('MENUSACTIONS'));

    console.log("MenusActions :: "+JSON.stringify(this.menuactions.undersub));
    
    
    this.deletevisiable=false;
    this.editvisiable=false;
    this.viewvisiable=false;
    this.addvisiable=false;
    this.linksuppliervisiable=false;
    
    
    this.deleteauthvisiable=true;
    this.authprofilevisiable=true;
    
    
    
    
    
    for (let unaction of this.menuactions.undersub) {
    if (unaction.SUBMENUID === '00103' && unaction.SUPERMENUID==='0010301' && unaction.FLAG===false) {
    
    //add profile
    this.addvisiable=true;
    
    }
    if (unaction.SUBMENUID === '00103' && unaction.SUPERMENUID==='0010302' && unaction.FLAG===false) {
    
    //edit profile
    this.editvisiable=true;
    
    }
    if (unaction.SUBMENUID === '00103' && unaction.SUPERMENUID==='0010303' && unaction.FLAG===false) {
    
    //delete profile
    this.deletevisiable=true;
    
    }
    if (unaction.SUBMENUID === '00103' && unaction.SUPERMENUID==='0010309'&& unaction.FLAG===false) {
    
    
    //view profile
    this.viewvisiable=true;
    
    } if (unaction.SUBMENUID === '00103' && unaction.SUPERMENUID==='0010308'&& unaction.FLAG===false) {
    
    
    //view profile
    this.linksuppliervisiable=true;
    
    }
    
    }

    /*  if(localStorage.getItem('USERTYPE')==='B')
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
  } */
  this.spinner.show(); 
  setTimeout(()=>{
    this.loading=false;
    this.spinner.hide();
  },200);
  }
  //Getting The all supplier list showing
  getsupplierlist() {
    let postData = {
      listcall:''
    };
    console.log(' Get all supplier list : ' + JSON.stringify(postData));
     this.rest.sendPostRequest('homesupplierlist ',JSON.stringify(postData))
      .subscribe(
        res => this.getsupplierresp(res),
        error => {
          this.getError(error);
          this.spinner.hide();
        });
  }
  getsupplierresp(resp) {
    this.supplierlist = resp;
    console.log('All supplier list values: ' + JSON.stringify(resp));
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

  //view the particular supplier value
  ViewSupplier(data) {
    console.log('view particular supplier value : ' + JSON.stringify(data));
     this.postDataSer = {
      listcall:'SUPPLIERPRODLINK',
      supplierid:data.SUPPLIER_ID,
      depotid:data.DEPOT_ID
    }; 
    
  

    console.log(' send particular supplier value for view : ' + JSON.stringify(this.postDataSer ));
   this.rest.sendPostRequest('homesupplierlist ', JSON.stringify(this.postDataSer ))
    .subscribe(
      res => this.getsupplierrespview(res),
      error => this.getError1(error));

/*  this.rest.sendPostRequest('leadtimehistory ', JSON.stringify(this.postDataSer ))
    .subscribe(
      res => this.resphist(res),
      error => this.errorhist(error)); */
}


getsupplierrespview(resp) {
  this.passData.setJSONData(resp);

  this.rest.sendPostRequest('leadtimehistory ', JSON.stringify(this.postDataSer ))
  .subscribe(
    res => this.resphist(res),
    error => this.errorhist(error));
  
  console.log('getsupplierrespview: ' + JSON.stringify(resp));
   //this.router.navigate(['/layout/viewsupplier']);
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
resphist(resp) {
  this.Data.setJSONData(resp);
  console.log('hist: ' + JSON.stringify(resp));
   this.router.navigate(['/layout/viewsupplier']);
}
errorhist(error) {
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
 //end view supplier


  //delete the particular supplier value
  DeleteSupplier(data) {
    console.log('Delete particular supplier value : ' + JSON.stringify(data));
     let postData = {
      listcall:'SUPPLIERPRODLINK',
      supplierid:data.SUPPLIER_ID,
      depotid:data.DEPOT_ID
  };
    console.log(' send particular supplier value for delete: ' + JSON.stringify(postData));
   this.rest.sendPostRequest('homesupplierlist ', JSON.stringify(postData))
    .subscribe(
      res => this.getsupplierrespdelete(res),
      error => this.getErrordelete(error));
}
getsupplierrespdelete(resp) {
  this.passData.setJSONData(resp);
  console.log('getsupplierrespdelete: ' + JSON.stringify(resp));
   this.router.navigate(['/layout/deletesupplier']);
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
 //end delete supplier




  //Edit the particular supplier value
  EditSupplier(data) {
    console.log('Edit particular supplier value : ' + JSON.stringify(data));
    let postData = {
      listcall:'SUPPLIERPRODLINK',
      supplierid:data.SUPPLIER_ID,
      depotid:data.DEPOT_ID
  };
    console.log(' send particular supplier value for edit: ' + JSON.stringify(postData));
   this.rest.sendPostRequest('homesupplierlist ', JSON.stringify(postData))
    .subscribe(
      res => this.getsupplierrespedit(res),
      error => this.getErroredit(error));
}
getsupplierrespedit(resp) {
  this.passData.setJSONData(resp);
  console.log('getsupplierrespedit: ' + JSON.stringify(resp));
   this.router.navigate(['/layout/editsupplier']);
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
 //end edit supplier
 


  
  //pagination start
  initPagination() {
    this.collection.data = this.supplierlist;
    console.log('Pagination Data showing supplier data : ' + JSON.stringify(this.collection.data));
    if (this.collection.data != null) {
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.supplierlist.length
      };
    }
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  //pagination ended

}
