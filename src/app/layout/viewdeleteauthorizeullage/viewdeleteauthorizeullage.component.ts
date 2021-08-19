import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { PassdataService } from '../../services/passdata.service';


@Component({
  selector: 'app-viewdeleteauthorizeullage',
  templateUrl: './viewdeleteauthorizeullage.component.html',
  styleUrls: ['./viewdeleteauthorizeullage.component.css']
})
export class ViewdeleteauthorizeullageComponent implements OnInit {
  ullagelist:any;
  selectedTank: any = [];
   constructor(
    private passData: PassdataService,
    private router: Router,
    private rest: RestapiService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    let data=this.passData.getJSONData();
    this.ullagelist=this.passData.getJSONData();
    console.log('Data ullagelist: '+JSON.stringify(data));
  }
  // validating the authorize the ullage
  deleteauthorizetank(data) {
    console.log(' validating the authroizeullage data' + JSON.stringify(data));
    //this.selectedTank = [];
   this.selectedTank.push(data.TANK_ID)
    const postData = {
      tankid: this.selectedTank,
     // tankid:data.TANK_ID,
       authdeauth: 'A'
    };
    console.log('deleteauthorizetank data: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('deleteullagechecker', JSON.stringify(postData))
      .subscribe(
        res => this.getauthullageResp(res),
        error => this.getauthproductError(error));
  }
  
  //Getting Response for Authorize the add ullage
  getauthullageResp(resp) {
    console.log('Get getauthullageResp : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('ullage Authorized Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/ullage']);
        console.log('Navigate to ullage');
      }, 3000);
    } else {
      this.toastr.error(resp.RESP_DESC);
    }
  }
  
  //error
  getauthproductError(error) {
    console.log('ErrorOccured authorized product : ' + JSON.stringify(error));
  }
  // validating the De-Authorize the Add Depot
  deleteDeauthorizetank(data) {
    console.log('Validating the deleteDEauthorizetank data' + JSON.stringify(data));
  //  this.selectedTank = [];
    this.selectedTank.push(data.TANK_ID)
     const postData = {
       tankid: this.selectedTank,
      // tankid:data.TANK_ID,
        authdeauth: ''
     };
    console.log('deleteDEauthorizetank data: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('deleteullagechecker', JSON.stringify(postData))
      .subscribe(
        res => this.getdeauthullageResp(res),
        error => this.getdeauthproductError(error));
  }
  
  //Getting Response for authorize the add ullage
  getdeauthullageResp(resp) {
    console.log('Get de-authDepotResp : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('product De-Authorized Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/ullage']);
        console.log('Navigate to ullage');
      }, 3000);
    } else {
      this.toastr.error(resp.RESP_DESC);
    }
  }
  //error
  getdeauthproductError(error) {
    console.log('ErrorOccured De-authorized ullage : ' + JSON.stringify(error));
  }
  }
  
  

