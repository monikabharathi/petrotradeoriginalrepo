import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RestapiService } from '../../services/restapi.service';
import { PassdataService } from '../../services/passdata.service';
@Component({
  selector: 'app-editdepot',
  templateUrl: './editdepot.component.html',
  styleUrls: ['./editdepot.component.css']
})
export class EditdepotComponent implements OnInit {
  depotlist: any;
  mysubmit : any;
  depotName:any;
  res: any;
  form:any;
  depot:any={};
  constructor( 
    private passData: PassdataService,
     private router: Router,
    private modalService: BsModalService,
    private rest: RestapiService,
    private toastr: ToastrService
    ) 
    { }
   
   ngOnInit() {
     this.mysubmit=false;
     //Getting edit Data values for editdepotpage
    let data=this.passData.getJSONData();
    this.depotlist=this.passData.getJSONData();
    console.log('Getting edit Data for editdepotpage ---: '+JSON.stringify(data));
    let depotname;
    let depotid;
    let depotlocation;
    let daynumber;
   for(let i of data){
      depotname=i.DEPOT_NAME;
      depotid=i.DEPOT_ID;
      depotlocation=i.DEPOT_LOCATION;
      daynumber=i.DAYNUMBER;
    }
      this.depot.depotname=depotname;
      this.depot.depotid=depotid;
      this.depot.depotlocation=depotlocation;
      this.depot.daynumber=daynumber;
     
}

//Getting values for editdepot after submit
  EditDepot( f: NgForm) {
    console.log('Getting values for editdepot after submit');
    console.log('depotName : ' + this.depot.depotname);
    console.log('depotId : ' + this.depot.depotid);
    console.log('depotLocation : ' + this.depot.depotlocation);
    console.log('daynumber : ' + this.depot.daynumber);
    if(this.depot.depotid===this.depot.depotname)
    {
      alert('Depot Name and Depot Id Should Not Same !!! : '+ this.depot.depotname );
      return false;
    }

    this.mysubmit=true;
    const postData = {
      depotname : this.depot.depotname,
      depotid : this.depot.depotid,
      depotlocation : this.depot.depotlocation,
      daynumber : this.depot.daynumber
    };
    //sending editdepot values
    console.log('sending editdepot values : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('editdepot', JSON.stringify(postData))
    .subscribe(
      res => this.GetRespEditDepot(res),
      error => this.GetErrorEditDepot(error));
  }

  //getting response for edit depot
  GetRespEditDepot(resp) {
    console.log('getting response for edit depot : ' + JSON.stringify(resp));
    if ( resp.RESP_STATUS === 'SUCCESS' ) {
       this.toastr.success(resp.RESP_DESC);
       setTimeout(() => {
         this.toastr.clear();
       }, 2500);
       setTimeout(() => {
         this.router.navigate(['/layout/depot']);
         console.log('Navigate to Depot');
       }, 3000);
   } else {
     console.log('Failed edit depot');
     this.mysubmit=false;
       this.toastr.error(resp.RESP_DESC);
   }
  }
  //getting Error for edit depot
  GetErrorEditDepot(error) {
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
    console.log('getting Error for edit depot : ' + JSON.stringify(error));
  }
}

