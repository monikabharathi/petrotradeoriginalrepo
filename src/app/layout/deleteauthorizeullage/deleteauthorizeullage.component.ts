import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-deleteauthorizeullage',
  templateUrl: './deleteauthorizeullage.component.html',
  styleUrls: ['./deleteauthorizeullage.component.css']
})
export class DeleteauthorizeullageComponent implements OnInit {
  config: any;
  collection = { data: [] };
  ullagelist : any [ ] ;
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

    console.log('Get waiting for delete authorize ullage list ');
    this.getullagelist();
    this.spinner.show(); 
  }
  //Get waiting for authorize product list
  getullagelist(){
    let postData= {
      listcall:'DELETE'
    };
    console.log(' delete authorize ullage list : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('homeullagelist',JSON.stringify(postData))
      .subscribe(
        res => this.getproductauthResp(res),
        error => {
          this.getError(error);
          this.spinner.hide();
        });
  }

  getproductauthResp(resp){
    this.ullagelist=resp;
    console.log('Get all waiting delete authorize ullage list values: '+JSON.stringify(resp));
    this.initPagination();
    setTimeout(()=>{
      this.loading=false;
      this.spinner.hide();
    },100);
  }
  getError(error){
    console.log(error);
  }
  viewdeleteauthorizetank ( data ){
    
  this.passData.setJSONData(data);
  console.log('viewdeleteauthorizetank data: ' + JSON.stringify(data));
   this.router.navigate(['/layout/viewdeleteauthorizeullage']);

  }
  //view the particular delete Authorize Depot value
/*   viewdeleteauthorizetank ( data ){
    console.log('view  deleteauthorize particular Product value : ' + JSON.stringify(data));
     let postData = {
      listcall:'VIEWEDIT',
      productid:data.PRODUCT_ID,
      depotid:data.DEPOT_ID
    };
    console.log(' send particular ullage value : ' + JSON.stringify(postData));
   this.rest.sendPostRequest('homeullagelist ', JSON.stringify(postData))
    .subscribe(
      res => this.getproductrespview(res),
      error => this.getError1(error));
}
getproductrespview(resp) {
  this.passData.setJSONData(resp);
console.log('getproductrespview: ' + JSON.stringify(resp));
   this.router.navigate(['/layout/viewdeleteauthorizeullage']);
}
getError1(error) {
  console.log(error);
} */
 //pagination 
  initPagination(){
    this.collection.data=this.ullagelist;
    console.log('pagination Data of authorized ullagelist: '+JSON.stringify(this.collection.data));
    if(this.collection.data!=null){
    this.config = {
      itemsPerPage:10,
      currentPage: 1,
      totalItems:this.ullagelist.length
    };
  }
   }
 pageChanged(event){
    this.config.currentPage = event;
  }
  //pagination ended
}
