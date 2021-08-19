import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { PassdataService } from '../../services/passdata.service';
@Component({
  selector: 'app-viewdeleteauthorizedepot',
  templateUrl: './viewdeleteauthorizedepot.component.html',
  styleUrls: ['./viewdeleteauthorizedepot.component.css']
})
export class ViewdeleteauthorizedepotComponent implements OnInit {
  depotlist: any;
  depotName: any;
  res: any;
  constructor(
    private router: Router,
    private passData: PassdataService,
    private rest: RestapiService,
    private toastr: ToastrService,

  ) { }

  //getting the depot values for Delete authdeauth
  ngOnInit() {
    let data = this.passData.getJSONData();
    this.depotlist = this.passData.getJSONData();
    console.log('Data : ' + JSON.stringify(data));
  }
  // validating the authorize the depot
  deleteauthroizeDepot(c) {
    console.log(' validating the deleteauthroizeDepot data' + JSON.stringify(c));
     let depotid;
    let depotname;
    for(let i of c){
      depotid=i.DEPOT_ID;
      depotname=i.DEPOT_NAME;
    }
    const postData = {
      depotid: depotid,
      depotname: depotname,
      authdeauth:'A'
    }
    console.log('Delete authorize depot data: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('deletedepotchecker', JSON.stringify(postData))
      .subscribe(
        res => this.getDeleteDepotResp(res),
        error => this.getDelteDepotError(error));
  }

  //Getting Response for Delete Authorize the add Depot
  getDeleteDepotResp(resp) {
    console.log('Get authDepotResp : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log(' Deelte Depot Authorized Successfully');
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
  getDelteDepotError(error) {
    console.log('ErrorOccured Delete authorized depot : ' + JSON.stringify(error));
  }


  // validating the Delete De-Authorize the Add Depot
  deleteDeauthroizeDepot(c) {
    console.log(' validating the deleteauthroizeDepot data' + JSON.stringify(c));
 
    let depotid;
    let depotname;
    for(let i of c){
      depotid=i.DEPOT_ID;
      depotname=i.DEPOT_NAME;
    }
    const postData = {
      depotid: depotid,
      depotname: depotname,
      authdeauth:''
    }
    console.log('Add De-authorize depot data: ' + JSON.stringify(postData));
    this.rest.sendPostRequest('deletedepotchecker', JSON.stringify(postData))
      .subscribe(
        res => this.getdeltedeauthDepotResp(res),
        error => this.getdeletedeauthDepotError(error));
  }

  //Getting Response for authorize the add depot
  getdeltedeauthDepotResp(resp) {
    console.log('Get de-authDepotResp : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log(' Deelte Depot De-Authorized Successfully');
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
  getdeletedeauthDepotError(error) {
    console.log('ErrorOccured Delete De-authorized depot : ' + JSON.stringify(error));
  }
}
