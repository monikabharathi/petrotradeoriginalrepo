import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { PassdataService } from '../../services/passdata.service';

@Component({
  selector: 'app-viewauthorizeullage',
  templateUrl: './viewauthorizeullage.component.html',
  styleUrls: ['./viewauthorizeullage.component.css']
})
export class ViewauthorizeullageComponent implements OnInit {
  config: any;
  collection = { data: [] };
  ullagelist: any[];
  listcall: any;
  selectedTank: any = [];
  constructor(
    private passData: PassdataService,
    private router: Router,
    private rest: RestapiService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    let data = this.passData.getJSONData();
    this.ullagelist = this.passData.getJSONData();
    console.log('Data : ' + JSON.stringify(data));
  }
  // Validating The Ullage Authorize
  authroizeullage(c) {
    console.log('Validating The Ullage Authorize Data' + JSON.stringify(c));
    let productid;
    let depotid;
   // this.selectedTank = [];
    for (let i of c) {
      productid = i.PRODUCT_ID;
      depotid = i.DEPOT_ID;
      // tankid=i.TANK_ID;
      this.selectedTank.push(i.TANK_ID);
    }
    console.log('this.selectedTank : ' + JSON.stringify(this.selectedTank));
    const postData = {
      productid: productid,
      depotid: depotid,
       tankid: this.selectedTank,
      authdeauth: 'A'
    };
    console.log('Sending The Ullage Authorize Data: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('authdeauthullage', JSON.stringify(postData))
      .subscribe(
        res => this.getauthullageResp(res),
        error => this.getauthproductError(error));
  }

  //Getting Response For The Ullage Authorize
  getauthullageResp(resp) {
    console.log('Getting Response For The Ullage Authorize : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('Ullage Authorized Successfully');
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
    console.log('ErrorOccured Authorized Ullage : ' + JSON.stringify(error));
  }
  // validating the De-Authorize the Add Depot
  Deauthroizeullage(c) {
    console.log('Validating The Ullage De-Authorize Data' + JSON.stringify(c));
    let productid;
    let depotid;
   // let tankid;
   // this.selectedTank = [];
    for (let i of c) {
      productid = i.PRODUCT_ID;
      depotid = i.DEPOT_ID;
      // tankid = i.TANK_ID;
      this.selectedTank.push(i.TANK_ID);
    }
    const postData = {
      productid: productid,
      depotid: depotid,
      //  tankid: tankid,
      tankid: this.selectedTank,
      authdeauth: ''
    };
    console.log('Sending The Ullage De-Authorize Data : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('authdeauthullage', JSON.stringify(postData))
      .subscribe(
        res => this.getdeauthullageResp(res),
        error => this.getdeauthproductError(error));
  }

  //Getting Response For The Ullage De-Authorize Data
  getdeauthullageResp(resp) {
    console.log('Getting Response For The Ullage De-Authorize Data : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('Ullage De-Authorized Successfully');
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
    console.log('ErrorOccured De-authorized Ullage : ' + JSON.stringify(error));
  }
}

