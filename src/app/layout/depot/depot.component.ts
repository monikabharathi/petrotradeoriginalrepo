import { Component, OnInit, Input } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.css']
})
export class DepotComponent implements OnInit {
  config: any;
  filter: any;
  loading:boolean=true;
  collection = { data: [] };
  listcall: any;
  depotlist: any[];
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
    
    
  ) {
  }
  ngOnInit() {


    console.log('Get all depot list ');  
    this.getDepotList();
    

  this.menuactions = JSON.parse(localStorage.getItem('MENUSACTIONS'));

    console.log("MenusActions :: "+JSON.stringify(this.menuactions.undersub));
     this.deletevisiable=false;
    this.editvisiable=false;
    this.viewvisiable=false;
    this.addvisiable=false;
    this.deleteauthvisiable=true;
    this.authprofilevisiable=true;
    
    for (let unaction of this.menuactions.undersub) {
    if (unaction.SUBMENUID === '00101' && unaction.SUPERMENUID==='0010101' && unaction.FLAG===false) {
    
    //add profile
    this.addvisiable=true;
    
    }
    if (unaction.SUBMENUID === '00101' && unaction.SUPERMENUID==='0010102' && unaction.FLAG===false) {
    
    //edit profile
    this.editvisiable=true;
    
    }
    if (unaction.SUBMENUID === '00101' && unaction.SUPERMENUID==='0010103' && unaction.FLAG===false) {
    
    //delete profile
    this.deletevisiable=true;
    
    }
    if (unaction.SUBMENUID === '00101' && unaction.SUPERMENUID==='0010104'&& unaction.FLAG===false) {
    
    
    //view profile
    this.viewvisiable=true;
    
    }
    
    
    }
   
 /* 
    if(localStorage.getItem('USERTYPE')==='B')
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

  //Getting The All Depot List For Showing in homepage Depot
  getDepotList() {
    let postData = {
      listcall: ''
    };
    console.log('Sending Request For Getting All Depot List For Showing : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('getdepotlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespDepot(res),
        error => {
          this.spinner.hide();
          this.GetErrorDepot(error);
        });
       /*  this.rest.postData('getdepotlist', JSON.stringify(postData)).subscribe((data) => {
          console.log('Data: ' +JSON.stringify(data));
        }); */
  }
  //Getting Response For All Depot List For Showing
  GetRespDepot(resp) {
    console.log('Resp : '+ JSON.stringify(resp));
    if(resp !== undefined) {
      this.depotlist = resp;
      console.log('Getting Response For All Depot List For Showing: ' + JSON.stringify(resp));
      this.initPagination();
      setTimeout(()=>{
        this.loading=false;
        this.spinner.hide();
      },50);
    } else {
      console.log('cannot get resp');
    }
  }
  //Getting Error For All Depot List For Showing
  GetErrorDepot(error) {
    console.log('depotlist : '+ this.depotlist);
    // alert('Error : '+JSON.stringify(error));
    console.log('Error occured while getting depotlist : ' + JSON.stringify(error));
    if(localStorage.getItem("TOKEN")===null) {
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

  //View The Particular Depot Value
  ViewDepot(data) {
    console.log('View The Particular Depot Value : ' + JSON.stringify(data));
    let postData = {
      listcall: 'UNIQUEVIEW',
      depotid: data.DEPOT_ID
    };
    console.log(' send particular depot value : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('getdepotlist ', JSON.stringify(postData))
      .subscribe(
        res => this.getdepotrespview(res),
        error => this.getError1(error));
  }
  getdepotrespview(resp) {
    this.passData.setJSONData(resp);
    console.log('getdepotrespview: ' + JSON.stringify(resp));
    this.router.navigate(['/layout/viewdepot']);
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


  //Edit the particular Depot value
  EditDepot(data) {
    console.log('view particular Depot value : ' + JSON.stringify(data));
    let postData = {
      listcall: 'UNIQUEVIEW',
      depotid: data.DEPOT_ID
    };
    console.log(' send particular depot value : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('getdepotlist ', JSON.stringify(postData))
      .subscribe(
        res => this.getdepotrespedit(res),
        error => this.getdepoteditError(error));
  }
  getdepotrespedit(resp) {
    this.passData.setJSONData(resp);
    console.log('getdepotrespedit: ' + JSON.stringify(resp));
    this.router.navigate(['/layout/editdepot']);
  }
  getdepoteditError(error) {
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


  //Delete the particular Depot value
  DeleteDepot(data) {
    console.log(' Delete particular Depot value : ' + JSON.stringify(data));
    let postData = {
      listcall: 'UNIQUEVIEW',
      depotid: data.DEPOT_ID
    };
    console.log(' send particular depot value : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('getdepotlist ', JSON.stringify(postData))
      .subscribe(
        res => this.getdepotrespdelete(res),
        error => this.getdepotdeleteError(error));
  }
  getdepotrespdelete(resp) {
    this.passData.setJSONData(resp);
    console.log('getdepotrespdelete: ' + JSON.stringify(resp));
    this.router.navigate(['/layout/deletedepot']);
  }
  getdepotdeleteError(error) {
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
 //pagination start
  initPagination() {
    console.log('Depot List : '+ JSON.stringify(this.depotlist));
    if(this.depotlist !== null && this.depotlist!==undefined) {
      this.collection.data = this.depotlist;
      console.log('Pagination Data showing Depot data : ' + JSON.stringify(this.collection.data));
      if (this.collection.data != null) { 
        this.config = {
          itemsPerPage: 10,
          currentPage: 1,
          totalItems: this.depotlist.length
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
  pageChanged(event) {
    this.config.currentPage = event;
  }
  //pagination ended
}