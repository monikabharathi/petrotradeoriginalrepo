import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-viewsafety',
  templateUrl: './viewsafety.component.html',
  styleUrls: ['./viewsafety.component.css']
})
export class ViewsafetyComponent implements OnInit {
  safetylist: [];
  constructor(
    private rest: RestapiService,
    private passData: PassdataService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
     let data = this.passData.getJSONData();
    this.safetylist = this.passData.getJSONData();
    console.log('Getting the Data in View safety Page: ' + JSON.stringify(data));
  }
 //View Safety Days For Particular Depot And product
 Viewsafety(data) {
  console.log('View Safety Days For Particular Depot And product : ' + JSON.stringify(data));
  let postData = {
    listcall:'HISTORYVIEW',
    productid:data.PRODUCT_ID,
    depotid:data.DEPOT_ID
  };
  //Sending The Request For View Safety Days For Particular Depot And product
  console.log('Sending The Request For View Safety Days For Particular Depot And product : ' + JSON.stringify(postData));
  this.rest.sendPostRequest('homesafetylist', JSON.stringify(postData))
    .subscribe(
      res => this.GetRespViewSafety(res),
      error => this.GetErrorViewSafety(error));
}
//Getting Response For View Safety Days For Particular Depot And product
GetRespViewSafety(resp) {
  this.passData.setJSONData(resp);
  console.log('Getting Response For View Safety Days For Particular Depot And product: ' + JSON.stringify(resp));
  this.router.navigate(['/layout/viewsafetyhistory']);
}
//Getting Error For View Safety Days For Particular Depot And product
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
  console.log('Getting Response For View Safety Days For Particular Depot And product: ' + JSON.stringify(error));
}

}
