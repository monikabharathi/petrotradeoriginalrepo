import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-ullage',
  templateUrl: './ullage.component.html',
  styleUrls: ['./ullage.component.css']
})
export class UllageComponent implements OnInit {
  config: any;
  filter: any;
  collection = { data: [] };
  listcall: any;
  depotlist: any[];
  loading: boolean = true;
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
  ) {
  }
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
    if (unaction.SUBMENUID === '00104' && unaction.SUPERMENUID==='0010401' && unaction.FLAG===false) {
    
    //add profile
    this.addvisiable=true;
    
    }
    if (unaction.SUBMENUID === '00104' && unaction.SUPERMENUID==='0010402' && unaction.FLAG===false) {
    
    //edit profile
    this.editvisiable=true;
    
    }
    if (unaction.SUBMENUID === '00104' && unaction.SUPERMENUID==='0010403' && unaction.FLAG===false) {
    
    //delete profile
    this.deletevisiable=true;
    
    }
    if (unaction.SUBMENUID === '00104' && unaction.SUPERMENUID==='0010404'&& unaction.FLAG===false) {
    
    
    //view profile
    this.viewvisiable=true;
    
    }
    
    }
/* 
    if (localStorage.getItem('USERTYPE') === 'B') {
      this.deletevisiable = false;
      this.editvisiable = false;
      this.viewvisiable = false;
      this.addvisiable = false;
      this.deleteauthvisiable = true;
      this.authprofilevisiable = true;
    }
    else {
      this.viewvisiable = false;
      this.deleteauthvisiable = false;
      this.authprofilevisiable = false;
      this.deletevisiable = true;
      this.editvisiable = true;
      this.addvisiable = true;
    } */
    this.spinner.show(); 
    setTimeout(()=>{
      this.loading=false;
      this.spinner.hide();
    },200);
  }
  //showing the All Depot list 
  getdepotlist() {
    let postData = {
      listcall: 'HOMELIST'
    };
    console.log('homeullagelist : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homeullagelist', JSON.stringify(postData))
      .subscribe(
        res => this.getdepotResp(res),
        error => {
          this.getError(error);
          this.spinner.hide();
        });
  }
  //getting response from showing the all depotlist
  getdepotResp(resp) {
    this.depotlist = resp;
    console.log('All depot list values for ullage: ' + JSON.stringify(resp));
    this.initPagination();
    setTimeout(() => {
      this.loading = false;
      this.spinner.hide();
    }, 50);
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

  //view the particular Depot value in ullage
  ViewUllage(data) {
    console.log('view particular Depot value in ullage: ' + JSON.stringify(data));
    let postData = {
      listcall: 'VIEW',
      depotid: data.DEPOT_ID
    };
    console.log(' send particular depot value in viewullage : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homeullagelist ', JSON.stringify(postData))
      .subscribe(
        res => this.getdepotrespview(res),
        error => this.getError1(error));
  }
  getdepotrespview(resp) {
    this.passData.setJSONData(resp);
    console.log('getdepotrespview: ' + JSON.stringify(resp));
    this.router.navigate(['/layout/viewullage']);
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


  //Edit the particular Depot value in ullage
  EditUllage(data) {
    console.log('edit particular Depot value in ullage: ' + JSON.stringify(data));
    let postData = {
      listcall: 'VIEW',
      depotid: data.DEPOT_ID
    };
    console.log(' send particular depot value in editullage : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homeullagelist ', JSON.stringify(postData))
      .subscribe(
        res => this.getdepotrespedit(res),
        error => this.getErroredit(error));
  }
  getdepotrespedit(resp) {
    this.passData.setJSONData(resp);
    console.log('getdepotrespview: ' + JSON.stringify(resp));
    this.router.navigate(['/layout/editullage']);
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

  //Delete the particular Depot value in ullage
  DeleteUllage(data) {
    console.log('Delete particular Depot value in ullage: ' + JSON.stringify(data));
    let postData = {
      listcall: 'VIEW',
      depotid: data.DEPOT_ID
    };
    console.log(' send particular depot value in Deleteullage : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homeullagelist ', JSON.stringify(postData))
      .subscribe(
        res => this.getdepotrespDelete(res),
        error => this.getErrorDelete(error));
  }
  getdepotrespDelete(resp) {
    this.passData.setJSONData(resp);
    console.log('getdepotrespDelete: ' + JSON.stringify(resp));
    this.router.navigate(['/layout/deleteullage']);
  }
  getErrorDelete(error) {
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
    this.collection.data = this.depotlist;
    console.log('Pagination Data showing Depot data : ' + JSON.stringify(this.collection.data));
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