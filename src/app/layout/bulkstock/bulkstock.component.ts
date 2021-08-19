import { Component, OnInit, Input } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-bulkstock',
  templateUrl: './bulkstock.component.html',
  styleUrls: ['./bulkstock.component.css']
})
export class BulkstockComponent implements OnInit {
  config: any;
  filter: any;
  loading:boolean=true;
  collection = { data: [] };
  listcall: any;
  stocklist: any[];
  //maker
deletevisiable: any;
editvisiable: any;
addvisiable: any;
//both
viewvisiable: any;
//checker
deleteauthvisiable: any;
authprofilevisiable: any;

menuactions: any;
  constructor(
    private rest: RestapiService,
    private passData: PassdataService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    console.log('Get all depot list ');
    this.getdepotlist();
    this.spinner.show(); 
    setTimeout(()=>{
      this.loading=false;
      this.spinner.hide();
    },100);



    this.menuactions = JSON.parse(localStorage.getItem('MENUSACTIONS'));

    console.log("MenusActions :: "+JSON.stringify(this.menuactions.undersub));
    
    
    this.deletevisiable=false;
    this.editvisiable=false;
    this.viewvisiable=false;
    this.addvisiable=false;
    this.deleteauthvisiable=true;
    this.authprofilevisiable=true;
    
    
    
    
    
    for (let unaction of this.menuactions.undersub) {
    if (unaction.SUBMENUID === '00301' && unaction.SUPERMENUID==='0030101' && unaction.FLAG===false) {
    
    //add profile
    this.addvisiable=true;
    
    }
    if (unaction.SUBMENUID === '00301' && unaction.SUPERMENUID==='0030102' && unaction.FLAG===false) {
    
    //edit profile
    this.editvisiable=true;
    
    }
   /*  if (unaction.SUBMENUID === '00301' && unaction.SUPERMENUID==='0030103' && unaction.FLAG===false) {
    
    //delete profile
    this.deletevisiable=true;
    
    } */
    if (unaction.SUBMENUID === '00301' && unaction.SUPERMENUID==='0030103'&& unaction.FLAG===false) {
    
    
    //view profile
    this.viewvisiable=true;
    
    } 
    
    }

  }
  //Getting The All Stock List For Showing in homepage Bulsstock
  getdepotlist() {
    let postData = {
      listcall: ''
    };
    console.log('Sending Request For Getting All Stock List For Showing : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('bulkstocklist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespBulkStock(res),
        error => {
          this.GetErrorBulkStock(error);
          this.spinner.hide();
        });
  }
  //Getting Response For All stock List For Showing
  GetRespBulkStock(resp) {
    this.stocklist = resp;
    console.log('Getting Response For All Stock List For Showing: ' + JSON.stringify(resp));
    this.initPagination();
    setTimeout(()=>{
      this.loading=false;
      this.spinner.hide();
    },200);
  }
  //Getting Error For All stock List For Showing
  GetErrorBulkStock(error) {
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
    console.log('Getting Error For All Stock List For Showing: ' + JSON.stringify(error));
  }

 //View The Particular stock Value
 ViewStock(data) {
  console.log('View The Particular stock Value : ' + JSON.stringify(data));
  let postData = {
   depotid: data.DEPOT_ID
   //loadeddate : data.LOADED_DATE
  };
  //send particular Stock value for view
  console.log('send particular Stock value  for view: ' + JSON.stringify(postData));
  this.rest.sendPostRequest('bulkstockview', JSON.stringify(postData))
    .subscribe(
      res => this.GetRespStockView(res),
      error => this.GetErrorStockView(error));
}
//Get Response for send particular Stock value for view
GetRespStockView(resp) {
  this.passData.setJSONData(resp);
  console.log('Get Response for send particular Stock value  for view: ' + JSON.stringify(resp));
  this.router.navigate(['/layout/viewbulkstock']);
}
//Get Error for send particular Stock value for view
GetErrorStockView(error) {
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
  console.log('Get Response for send particular Stock value  for view: ' + JSON.stringify(error));
}


//Edit The Particular stock Value
EditStock(data) {
  console.log('Edit The Particular stock Value : ' + JSON.stringify(data));
  let postData = {
   depotid: data.DEPOT_ID,
   loadeddate : data.LOADED_DATE
   


  };
  //send particular Stock value for Edit
  console.log('send particular Stock value  for Edit: ' + JSON.stringify(postData));
  this.rest.sendPostRequest('bulkstockview', JSON.stringify(postData))
    .subscribe(
      res => this.GetRespStockEdit(res),
      error => this.GetErrorStockEdit(error));
}
//Get Response for send particular Stock value for Edit
GetRespStockEdit(resp) {
  this.passData.setJSONData(resp);
  console.log('Get Response for send particular Stock value  for Edit: ' + JSON.stringify(resp));
  this.router.navigate(['/layout/editbulkstock']);
}
//Get Error for send particular Stock value for Edit
GetErrorStockEdit(error) {
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
  console.log('Get Error for send particular Stock value  for Edit: ' + JSON.stringify(error));
}



//pagination start

initPagination() {
  console.log('Depot List : '+ JSON.stringify(this.stocklist));
  if(this.stocklist !== null && this.stocklist!==undefined) {
    this.collection.data = this.stocklist;
    console.log('Pagination Data showing Depot data : ' + JSON.stringify(this.collection.data));
    if (this.collection.data != null) { 
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.stocklist.length
      };
    } else{
      this.config = {
        itemsPerPage: 0,
        currentPage: 0,
        totalItems: 0
      };
    }
  } else {
    console.log('Cannot read depotlist')
  }
}


/* initPagination() {
  this.collection.data = this.stocklist;
  console.log('Pagination Data showing Stock data : ' + JSON.stringify(this.collection.data));
  if ( this.stocklist !== null &&   this.collection.data != null) { 
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.stocklist.length
    };
  } else{
    this.config = {
      itemsPerPage: 0,
      currentPage: 0,
      totalItems: 0
    };
  }
} */
pageChanged(event) {
  this.config.currentPage = event;
}
//pagination ended
}