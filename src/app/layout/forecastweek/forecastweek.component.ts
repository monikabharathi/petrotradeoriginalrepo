import { Component, OnInit, TemplateRef } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forecastweek',
  templateUrl: './forecastweek.component.html',
  styleUrls: ['./forecastweek.component.css']
})
export class ForecastweekComponent implements OnInit {
  config: any;
  filter: any;
  deleteforecastdepot: any;
  loading: boolean = true;
  collection = { data: [] };
  listcall: any;
  forecastlist: any[];
  modalRef: BsModalRef;
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
    private Data: DataService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    debugger;
    this.getforecastlist();
    this.spinner.show();
    setTimeout(() => {
      this.loading = false;
      this.spinner.hide();
    }, 100);
    this.menuactions = JSON.parse(localStorage.getItem('MENUSACTIONS'));

    console.log("MenusActions :: " + JSON.stringify(this.menuactions.undersub));


    this.deletevisiable = false;
    this.editvisiable = false;
    this.viewvisiable = false;
    this.addvisiable = false;
    this.deleteauthvisiable = true;
    this.authprofilevisiable = true;
    for (let unaction of this.menuactions.undersub) {
      if (unaction.SUBMENUID === '00302' && unaction.SUPERMENUID === '0030201' && unaction.FLAG === false) {

        //add profile
        this.addvisiable = true;

      }
      if (unaction.SUBMENUID === '00302' && unaction.SUPERMENUID === '0030202' && unaction.FLAG === false) {

        //edit profile
        this.editvisiable = true;

      }
      /*  if (unaction.SUBMENUID === '00301' && unaction.SUPERMENUID==='0030103' && unaction.FLAG===false) {
       
       //delete profile
       this.deletevisiable=true;
       
       } */
      if (unaction.SUBMENUID === '00302' && unaction.SUPERMENUID === '0030203' && unaction.FLAG === false) {
 //view profile
        this.viewvisiable = true;

      }

    }
  }
  //Getting The All Stock List For Showing in homepage Bulsstock
  getforecastlist() {
    let postData = {
      // listcall: ''
    };
    console.log('Sending Request For Getting All Forecastweek List For Showing : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homeforcastlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespForecastweek(res),
        error => {
          this.GetErrorForecastweek(error);
          this.spinner.hide();
        });
  }
  //Getting Response For All Forecastweek List For Showing
  GetRespForecastweek(resp) {
    this.forecastlist = resp;
    console.log('Getting Response For All Forecastweek List For Showing: ' + JSON.stringify(resp));
    this.initPagination();
    setTimeout(() => {
      this.loading = false;
      this.spinner.hide();
    }, 200);
  }
  //Getting Error For All Forecastweek List For Showing
  GetErrorForecastweek(error) {
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
    console.log('Getting Error For All Forecastweek List For Showing: ' + JSON.stringify(error));
  }
 //View The Particular Forecastweekdata Value
  ViewForecast(data) {
    console.log('View The Particular Forecastweek Value : ' + JSON.stringify(data));
    let postData = {
      depotid: data.DEPOT_ID,
      forecastversion: data.FORECAST_VERSION,
      forecastdate: data.FORECAST_DATE
    };
    //send particular Forecastweek value for view
    console.log('view data in weekforecast: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('viewlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespForecastweekView(res, data),
        error => this.GetErrorForecastweekView(error));
  }
  showAlert(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.config);
  }
 //Get Response for send particular Forecastweek value for view
  GetRespForecastweekView(resp, data) {
    this.passData.setJSONData(resp);
    this.Data.setJSONData(data);
    console.log('Get Response for send particular Forecastweek value for view: ' + JSON.stringify(resp));
    this.router.navigate(['/layout/viewforecastweek']);
  }
  //Get Error for send particular Forecastweek value for view
  GetErrorForecastweekView(error) {
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
    console.log('Get Response for send particular Forecastweek value for view: ' + JSON.stringify(error));

  }
//Edit The Particular Forecastweekdata Value
  EditForecast(data) {
    console.log('Edit The Particular Forecastweek Value : ' + JSON.stringify(data));
    let postData = {
      depotid: data.DEPOT_ID,
      forecastversion: data.FORECAST_VERSION,
      forecastdate: data.FORECAST_DATE
    };
  //send particular Forecastweek value for Edit
    console.log('Edit data in weekforecast: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('viewlist', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespForecastweekEdit(res, data),
        error => this.GetErrorForecastweekEdit(error));
  }

  DeleteForecast(template: TemplateRef<any>,data) {
    this.deleteforecastdepot = data;
    this.showAlert(template);
   
  }
  Deleteforecastweek(data){
    this.modalRef.hide();
    let postData = {
      depotid: data.DEPOT_ID,
      forecastversion: data.FORECAST_VERSION,
      forecastdate: data.FORECAST_DATE
    };
 
  //send particular Forecastweek value for Edit
    console.log('Edit data in weekforecast: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('deleteweeklyforecast', JSON.stringify(postData))
      .subscribe(
        
        res => this.GetRespForecastDaily(res, data),
        error => this.GetErrorForecastweekEdit(error));
      
    
  }
  
 
  //Get Response for send particular Forecastweek value for Edit
  GetRespForecastweekEdit(resp, data) {
    this.passData.setJSONData(resp);
    this.Data.setJSONData(data);
    console.log('Get Response for send particular Forecastweek value for view: ' + JSON.stringify(resp));
    this.router.navigate(['/layout/editforecastweek']);
  }

  GetRespForecastDaily(resp,data){
    
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('weekly forecast delete Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      
    } else {
      console.log('Delete weekly forecast Failed');
      this.toastr.error(resp.RESP_DESC);
    }
    this.getforecastlist();
  }
  //Get Error for send particular Forecastweek value for view
  GetErrorForecastweekEdit(error) {
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
    console.log('Get Response for send particular Forecastweek value for view: ' + JSON.stringify(error));
}
 //pagination start
  initPagination() {
    this.collection.data = this.forecastlist;
    console.log('Pagination Data showing Forecastweek data : ' + JSON.stringify(this.collection.data));
    if (this.collection.data != null) {
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.forecastlist.length
      };
    } else {
      this.config = {
        itemsPerPage: 0,
        currentPage: 0,
        totalItems: 0
      };
    }
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  //pagination ended
}