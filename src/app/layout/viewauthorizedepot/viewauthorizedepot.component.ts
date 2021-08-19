import { Component, OnInit } from '@angular/core';
import { PassdataService } from '../../services/passdata.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
@Component({
  selector: 'app-viewauthorizedepot',
  templateUrl: './viewauthorizedepot.component.html',
  styleUrls: ['./viewauthorizedepot.component.css']
})
export class ViewauthorizedepotComponent implements OnInit {
  depotList: any;
  depotName: any;
  res: any;
  constructor(
    private router: Router,
    private passData: PassdataService,
    private rest: RestapiService,
    private toastr: ToastrService,
  
  ) { }

  //getting the depot values for authdeauth
  ngOnInit() {
    let data = this.passData.getJSONData();
    this.depotList = this.passData.getJSONData();
    console.log('Data : ' + JSON.stringify(data));
    };
  
  // validating the authorize the depot
  authroizeDepot(c) {
    console.log(' validating the authroizeDepot data' + JSON.stringify(c));
    
     let depotid;
    let depotname;
    for(let i of c){
      depotid=i.DEPOT_ID;
      depotname=i.DEPOT_NAME;
    }
    const postData = {
      depotid:depotid,
      depotname: depotname,
      authdeauth: 'A'
    };
    console.log('Add authorize depot data: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('Addauthdeauth', JSON.stringify(postData))
      .subscribe(
        res => this.getauthDepotResp(res),
        error => this.getauthDepotError(error));
  }

  //Getting Response for Authorize the add Depot
  getauthDepotResp(resp) {
    console.log('Get authDepotResp : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('Depot Authorized Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/depot']);
        console.log('Navigate to Depot');
      }, 3000);
    } else {
      this.toastr.error(resp.RESP_DESC);
    }
  }

  //error
  getauthDepotError(error) {
    console.log('ErrorOccured authorized depot : ' + JSON.stringify(error));
  }
  // validating the De-Authorize the Add Depot
  DeauthroizeDepot(c) {
    console.log('Validating the De-authroizeDepot data' + JSON.stringify(c));
    let depotid;
    let depotname;
    for(let i of c){
      depotid=i.DEPOT_ID;
      depotname=i.DEPOT_NAME;
    }
    const postData = {
      depotid:depotid,
      depotname: depotname,
      authdeauth: 'deauthorize'
    };
    console.log('Add De-authorize depot data: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('Addauthdeauth', JSON.stringify(postData))
      .subscribe(
        res => this.getdeauthDepotResp(res),
        error => this.getdeauthDepotError(error));
  }

  //Getting Response for authorize the add depot
  getdeauthDepotResp(resp) {
    console.log('Get de-authDepotResp : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('Depot De-Authorized Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/depot']);
        console.log('Navigate to Depot');
      }, 3000);
    } else {
      this.toastr.error(resp.RESP_DESC);
    }
  }
  //error
  getdeauthDepotError(error) {
    console.log('ErrorOccured De-authorized depot : ' + JSON.stringify(error));
  }
}
