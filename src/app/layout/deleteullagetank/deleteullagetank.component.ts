import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PassdataService } from '../../services/passdata.service';
@Component({
  selector: 'app-deleteullagetank',
  templateUrl: './deleteullagetank.component.html',
  styleUrls: ['./deleteullagetank.component.css']
})
export class DeleteullagetankComponent implements OnInit {
  ullagelist: [];
  selectedTank: any = [];
  constructor(
    private rest: RestapiService,
    private passData: PassdataService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    let data=this.passData.getJSONData();
    this.ullagelist=this.passData.getJSONData();
    console.log('Data ullagelist: '+JSON.stringify(data));
  }
//deelte the tank details particular depot and product
DeleteTank(data) {
  console.log('DeleteUllage the tank details particular depot and product : ' + JSON.stringify(data));
  this.selectedTank.push(data.TANK_ID)
  let postData = {
   // listcall:'VIEWEDIT',
    tankid: this.selectedTank
   };
  console.log('particular depot and product for delete the tank details  : ' + JSON.stringify(postData));
  this.rest.sendPostRequest('delelteullagemaker', JSON.stringify(postData))
    .subscribe(
      res => this.getproductrespview(res),
      error => this.getError1(error));
}
//Getting Response for add depot
getproductrespview(resp) {
  console.log('getDepotResp : ' + JSON.stringify(resp));
  if ( resp.RESP_STATUS === 'SUCCESS' ) {
     this.toastr.success(resp.RESP_DESC);
     console.log('tank delete Successfully');
     setTimeout(() => {
       this.toastr.clear();
     }, 2500);
     setTimeout(() => {
       this.router.navigate(['/layout/ullage']);
       console.log('Navigate to ullage');
     }, 3000);
 } else {
      this.selectedTank=[];
     this.toastr.error(resp.RESP_DESC);
 }
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
  console.log('ErrorOccured : ' + JSON.stringify(error));
}

}