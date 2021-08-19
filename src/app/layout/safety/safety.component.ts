import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-safety',
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.css']
})
export class SafetyComponent implements OnInit {
  config: any;
  filter: any;
  collection = { data: [] };
  listcall: any;
  depotlist: any[];
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
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getdepotlist();
  
    this.menuactions = JSON.parse(localStorage.getItem('MENUSACTIONS'));

    console.log("MenusActions :: "+JSON.stringify(this.menuactions.undersub));
    
    
    this.deletevisiable=false;
    this.editvisiable=false;
    this.viewvisiable=false;
    this.addvisiable=false;
    
    
    this.deleteauthvisiable=true;
    this.authprofilevisiable=true;
    
    
    
    
    
    for (let unaction of this.menuactions.undersub) {
    if (unaction.SUBMENUID === '00105' && unaction.SUPERMENUID==='0010501' && unaction.FLAG===false) {
    
    //add profile
    this.addvisiable=true;
    
    }
    if (unaction.SUBMENUID === '00105' && unaction.SUPERMENUID==='0010502' && unaction.FLAG===false) {
    
    //edit profile
    this.editvisiable=true;
    
    }
    if (unaction.SUBMENUID === '00105' && unaction.SUPERMENUID==='0010503' && unaction.FLAG===false) {
    
    //delete profile
    this.deletevisiable=true;
    
    }
    if (unaction.SUBMENUID === '00105' && unaction.SUPERMENUID==='0010504'&& unaction.FLAG===false) {
    
    
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
}   */
this.spinner.show(); 
    setTimeout(()=>{
      this.loading=false;
      this.spinner.hide();
    },200);
  }
//Showing The All Depot List For Safety
getdepotlist() {
  let postData = {
    listcall: 'VIEW'
  };
   //Sending Request For Showing The All Depot List For Safety
  console.log('Sending Request For Showing The All Depot List For Safety : ' + JSON.stringify(postData));
  this.rest.sendPostRequest('homesafetylist', JSON.stringify(postData))
    .subscribe(
      res => this.GetRespsafety(res),
      error => {
        this.GetErrorsafety(error);
        this.spinner.hide();
      });
}
  //Getting Response For Showing The All Depot List For Safety
GetRespsafety(resp) {
  this.depotlist = resp;
  console.log('Getting Response For Showing The All Depot List For Safety: ' + JSON.stringify(resp));
  this.initPagination();
  setTimeout(()=>{
    this.loading=false;
    this.spinner.hide();
  },50);
}
 //Getting Error For Showing The All Depot List For Safety
GetErrorsafety(error) {
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
  console.log('Getting Error For Showing The All Depot List For Safety: ' + JSON.stringify(error));
}

//View The Particular Depot Value In SafetyDays
ViewSafety(data) {
  console.log('View The Particular Depot Value In SafetyDays: ' + JSON.stringify(data));
  let postData = {
    listcall: 'UNIQUEVIEW',
    depotid: data.DEPOT_ID
  };
  // Sending The Request For View The Particular Depot Value In SafetyDays
  console.log(' Sending The Request For View The Particular Depot Value In SafetyDays : ' + JSON.stringify(postData));
  this.rest.sendPostRequest('homesafetylist ', JSON.stringify(postData))
    .subscribe(
      res => this.GetRespViewSafety(res),
      error => this.GetErrorViewSafety(error));
}
//Getting the Response For View The Particular Depot Value In SafetyDays
GetRespViewSafety(resp) {
  this.passData.setJSONData(resp);
  console.log('Getting the Response For View The Particular Depot Value In SafetyDays: ' + JSON.stringify(resp));
  this.router.navigate(['/layout/viewsafety']);
}
//Getting the Error For View The Particular Depot Value In SafetyDays
GetErrorViewSafety(error) {
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
  console.log('Getting the error For View The Particular Depot Value In SafetyDays: ' + JSON.stringify(error));
}
//Edit The Particular Depot Value In SafetyDays
EditSafety(data) {
  console.log('Edit The Particular Depot Value In SafetyDays: ' + JSON.stringify(data));
  let postData = {
    listcall: 'UNIQUEVIEW',
    depotid: data.DEPOT_ID
  };
  // Sending The Request For Edit The Particular Depot Value In SafetyDays
  console.log(' Sending The Request For Edit The Particular Depot Value In SafetyDays : ' + JSON.stringify(postData));
  this.rest.sendPostRequest('homesafetylist ', JSON.stringify(postData))
    .subscribe(
      res => this.GetRespEditSafety(res),
      error => this.GetErrorEditSafety(error));
}
//Getting the Response For Edit The Particular Depot Value In SafetyDays
GetRespEditSafety(resp) {
  this.passData.setJSONData(resp);
  console.log('Getting the Response For Edit The Particular Depot Value In SafetyDays: ' + JSON.stringify(resp));
  this.router.navigate(['/layout/editsafety']);
}
//Getting the Error For Edit The Particular Depot Value In SafetyDays
GetErrorEditSafety(error) {
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
  console.log('Getting the error For Edit The Particular Depot Value In SafetyDays: ' + JSON.stringify(error));
}


//pagination start
initPagination() {
  this.collection.data = this.depotlist;
  console.log('Pagination Data Showing In Safety Days : ' + JSON.stringify(this.collection.data));
  if (this.collection.data != null) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.depotlist.length
    };
  }
}
pageChanged(event) {
  this.config.currentPage = event;
}
//pagination ended
}
