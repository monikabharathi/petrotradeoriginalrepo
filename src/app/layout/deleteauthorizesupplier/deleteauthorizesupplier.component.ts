import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-deleteauthorizesupplier',
  templateUrl: './deleteauthorizesupplier.component.html',
  styleUrls: ['./deleteauthorizesupplier.component.css']
})
export class DeleteauthorizesupplierComponent implements OnInit {
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
  ) { }
 ngOnInit() {
    console.log('Get waiting for delete authorize supplier list ');
    this.getsupplierlist();
    this.spinner.show(); 
  }
  //Get waiting for delete authorize supplier list
  getsupplierlist() {
    let postData = {
      listcall: 'DELETE'
    };
    console.log(' DELETE authorize supplier list : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homesupplierlist', JSON.stringify(postData))
      .subscribe(
        res => this.getsupplierdeleteauthResp(res),
        error => {
          this.getError(error);
          this.spinner.hide();
        });
  }
  getsupplierdeleteauthResp(resp) {
    this.supplierlist = resp;
    console.log('Get all waiting delete authorize supplier list values: ' + JSON.stringify(resp));
    this.initPagination();
    setTimeout(()=>{
      this.loading=false;
      this.spinner.hide();
    },100);
  }
  getError(error) {
    console.log(error);
  }
  //view the particular deelte eAuthorize supplier value
  viewdeleteauthorizesupplier(data) {
    console.log('view delete authorize particular supplier value : ' + JSON.stringify(data));
    let postData = {
      listcall: 'SUPPLIERPRODLINK',
      supplierid: data.SUPPLIER_ID,
      depotid: data.DEPOT_ID
    };
    console.log(' send particular delete authorize supplier value : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homesupplierlist ', JSON.stringify(postData))
      .subscribe(
        res => this.getsupplierrespview(res),
        error => this.getError1(error));
  }
  getsupplierrespview(resp) {
    this.passData.setJSONData(resp);
    console.log('getsupplierrespview: ' + JSON.stringify(resp));
    this.router.navigate(['/layout/viewdeleteauthorizesupplier']);
  }
  getError1(error) {
    console.log(error);
  }

  //pagination 
  initPagination() {
    this.collection.data = this.supplierlist;
    console.log('pagination Data of delete authorized supplier: ' + JSON.stringify(this.collection.data));
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
