import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-deleteullage',
  templateUrl: './deleteullage.component.html',
  styleUrls: ['./deleteullage.component.css']
})
export class DeleteullageComponent implements OnInit {
  ullagelist: [];
  constructor(
    private rest: RestapiService,
    private passData: PassdataService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
     let data = this.passData.getJSONData();
    this.ullagelist = this.passData.getJSONData();
    console.log('Data in view ullage: ' + JSON.stringify(data));
  }
  //view the tank details particular depot and product
  DeleteUllage(data) {
    console.log('DeleteUllage the tank details particular depot and product : ' + JSON.stringify(data));
    let postData = {
      listcall:'VIEWEDIT',
      productid:data.PRODUCT_ID,
      depotid:data.DEPOT_ID
    };
    console.log('particular depot and product for delete the tank details  : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homeullagelist', JSON.stringify(postData))
      .subscribe(
        res => this.getproductrespview(res),
        error => this.getError1(error));
  }
  getproductrespview(resp) {
    this.passData.setJSONData(resp);
    console.log('getproductrespview: ' + JSON.stringify(resp));
    this.router.navigate(['/layout/deleteullagetank']);
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

}
