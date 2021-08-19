import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
@Component({
  selector: 'app-adddepot',
  templateUrl: './adddepot.component.html',
  styleUrls: ['./adddepot.component.css']
})
export class AdddepotComponent implements OnInit {
  depot: any = {};
  mysubmit: any;
  form: any;
  constructor(
              private router: Router,
              private rest: RestapiService,
              private toastr: ToastrService
              ) {}

  ngOnInit() {
    this.mysubmit=false;
  }
  
  //Getting The Add Depot Values After Submit
  validateDepot( f: NgForm) {
    console.log('Getting The Add Depot Values After Submit');
    console.log('depotName : ' + this.depot.depotname);
    console.log('depotId : ' + this.depot.depotid);
    console.log('depotLocation : ' + this.depot.depotlocation);
    console.log('daynumber : ' + this.depot.daynumber);

    if(this.depot.depotid ===  this.depot.depotname)
    {
      alert('Depot Name and Depot Id Should Not Same !!! : ' );
      return false;
    }


this.mysubmit=true;
    const postData = {
      depotname : this.depot.depotname,
      depotid : this.depot.depotid,
      depotlocation : this.depot.depotlocation,
      daynumber : this.depot.daynumber
    };
    //Sending The Added Values For Depot
    console.log('Sending The Depot Added Values : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('adddepot', JSON.stringify(postData))
    .subscribe(
      res => this.GetRespAddDepot(res),
      error => this.GetErrorAddDepot(error));
  }
//Getting Response For Add Depot
GetRespAddDepot(resp) {
    console.log('Getting Response For Add Depot : ' + JSON.stringify(resp));
    if ( resp.RESP_STATUS === 'SUCCESS' ) {
       this.toastr.success(resp.RESP_DESC);
       console.log('Depot Added Successfully');
       setTimeout(() => {
         this.toastr.clear();
       }, 2500);
       setTimeout(() => {
         this.router.navigate(['/layout/depot']);
         console.log('Navigate Too Depot');
       }, 3000);
   } else {
    console.log('Failed For Add Depot');
    this.mysubmit=false;

       this.toastr.error(resp.RESP_DESC);
       //return false;

   }
  }
   //Getting Error For Add Depot
  GetErrorAddDepot(error) {
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
    console.log('Getting Error For Add Depot : ' + JSON.stringify(error));

  }
 
}