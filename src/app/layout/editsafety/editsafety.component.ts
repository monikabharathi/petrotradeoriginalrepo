import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';

@Component({
  selector: 'app-editsafety',
  templateUrl: './editsafety.component.html',
  styleUrls: ['./editsafety.component.css']
})
export class EditsafetyComponent implements OnInit {
  safetylist: [];
  constructor(
    private rest: RestapiService,
    private passData: PassdataService,
    private router: Router
  ) { }

  ngOnInit() {
     let data = this.passData.getJSONData();
    this.safetylist = this.passData.getJSONData();
    console.log('Getting the Data in Edit safety Page: ' + JSON.stringify(data));
  }
//Edit Safety Days For Particular Depot And Depot
/* Editsafety(data) {
  console.log('Edit Safety Days For Particular Depot And Depot : ' + JSON.stringify(data));
  let postData = {
    listcall:'VIEWEDIT',
    productid:data.PRODUCT_ID,
    depotid:data.DEPOT_ID
  };
  //Sending The Request For Edit Safety Days For Particular Depot And Depot
  console.log('Sending The Request For Edit Safety Days For Particular Depot And Depot : ' + JSON.stringify(postData));
  this.rest.sendPostRequest('homeullagelist', JSON.stringify(postData))
    .subscribe(
      res => this.GetRespEditSafety(res),
      error => this.GetErrorEditSafety(error));
}
//Getting Response For Edit Safety Days For Particular Depot And Depot
GetRespEditSafety(resp) {
  this.passData.setJSONData(resp);
  console.log('Getting Response For Edit Safety Days For Particular Depot And Depot: ' + JSON.stringify(resp));
  this.router.navigate(['/layout/viewsafetyhistoric']);
}
//Getting Error For Edit Safety Days For Particular Depot And Depot
GetErrorEditSafety(error) {
  console.log('Getting Response For Edit Safety Days For Particular Depot And Depot: ' + JSON.stringify(error));
} */

Editsafety(data) {
  console.log('Edit Safety Days For Particular Depot And Depot : ' + JSON.stringify(data));
  this.passData.setJSONData(data);
  this.router.navigate(['/layout/editsafetystock']);
}


}
