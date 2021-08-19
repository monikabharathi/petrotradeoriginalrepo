import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-authorizesupplier',
  templateUrl: './authorizesupplier.component.html',
  styleUrls: ['./authorizesupplier.component.css']
})
export class AuthorizesupplierComponent implements OnInit {
  config: any;
  collection = { data: [] };
  supplierlist: any[];
  listcall: any;
  filter:any;
  loading:boolean=true;
  constructor(
    private rest: RestapiService,
    private passData: PassdataService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {

  }

  ngOnInit() {

    console.log('Get waiting for authorize supplier list ');
    this.getsupplierlist();
    this.spinner.show(); 
  }
  //Get waiting for authorize supplier list
  getsupplierlist() {
    let postData = {
      listcall: 'AUTHORIZE'
    };
    console.log(' authorize supplier list : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homesupplierlist', JSON.stringify(postData))
      .subscribe(
        res => this.getsupplierauthResp(res),
        error => {
          this.getError(error);
          this.spinner.hide();
        });
  }

  getsupplierauthResp(resp) {
    this.supplierlist = resp;
    console.log('Get all waiting authorize supplier list values: ' + JSON.stringify(resp));
    this.initPagination();
    setTimeout(()=>{
      this.loading=false;
      this.spinner.hide();
    },200);
  }
  getError(error) {
    console.log(error);
  }
  //view the particular Authorize supplier value
  viewauthorizesupplier(data) {
    console.log('view authorize particular supplier value : ' + JSON.stringify(data));
    let postData = {
      listcall: 'SUPPLIERPRODLINK',
      supplierid: data.SUPPLIER_ID,
      depotid: data.DEPOT_ID
    };
    console.log(' send particular authorize supplier value : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homesupplierlist ', JSON.stringify(postData))
      .subscribe(
        res => this.getproductrespview(res),
        error => this.getError1(error));
  }
  getproductrespview(resp) {
    this.passData.setJSONData(resp);
    console.log('getsupplierrespview: ' + JSON.stringify(resp));
    this.router.navigate(['/layout/viewauthorizesupplier']);
  }
  getError1(error) {
    console.log(error);
  }

  //pagination 
  initPagination() {
    this.collection.data = this.supplierlist;
    console.log('pagination Data of authorized supplier: ' + JSON.stringify(this.collection.data));
    if (this.collection.data != null) {
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.supplierlist.length
      };
    }
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  //pagination ended
}
