import { Component, OnInit } from '@angular/core';
import { PassdataService } from '../../services/passdata.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestapiService } from '../../services/restapi.service';
import { DataService } from '../../services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-viewsupplier',
  templateUrl: './viewsupplier.component.html',
  styleUrls: ['./viewsupplier.component.css']
})
export class ViewsupplierComponent implements OnInit {
  supplierlist: any;
  filter: any;
  historylist: any;
  supplier: any = {};
  res: any;
  loading:boolean=true;
  config: any;

  collection = { data: [] };
  constructor(
    private passData: PassdataService,
    private router: Router,
     private rest: RestapiService,
   private toastr: ToastrService,
   private spinner: NgxSpinnerService,
   private Data: DataService
  ) {
    
   }

  ngOnInit() {
   
    let data = this.passData.getJSONData();
    this.supplierlist = this.passData.getJSONData();
    console.log('view Data  for supplier: ' + JSON.stringify(data));
   
    let data1 = this.Data.getJSONData();
    this.historylist = this.Data.getJSONData();
    this.initPagination();
    console.log('historylist: ' + JSON.stringify(data1));
   
  }
//pagination start
initPagination() {
  this.collection.data = this.historylist;
  console.log('Pagination Data showing s this.historylist : ' + JSON.stringify(this.collection.data));
  if (this.collection.data !== null) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems:  this.historylist.length
    };
  }
}
pageChanged(event) {
  this.config.currentPage = event;
}
//pagination ended

}
