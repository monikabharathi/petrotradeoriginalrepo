import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RestapiService } from '../../services/restapi.service';
import { PassdataService } from '../../services/passdata.service';

@Component({
  selector: 'app-deletedepot',
  templateUrl: './deletedepot.component.html',
  styleUrls: ['./deletedepot.component.css']
})
export class DeletedepotComponent implements OnInit {
  msg: any;
  mysubmit : any;
  modalRef: BsModalRef;
  config = {
    keyboard: true
  };
 
  depotList: any;
  depotName: any;
  depotlist: any;
  res: any;
  depotid: any;
  depotname: any;
  constructor(

    private router: Router,
    private modalService: BsModalService,
    private rest: RestapiService,
    private toastr: ToastrService,
    private passData: PassdataService
  ) { }
  showAlert(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.config);
  }
 /*  openConfirmDialog() {
      this.modalRef = this.modalService.show(CustomalertComponent);
      this.modalRef.content.onClose.subscribe(result => {
          console.log('results', result);
      })
  } */

  //Getting Delete Data in Delete depot page 
  ngOnInit() {
    this.mysubmit=false;
   
    let data = this.passData.getJSONData();
    this.depotlist = this.passData.getJSONData();
    console.log('Getting Delete Data in Delete depot page : ' + JSON.stringify(data));
  };

  //Getting Delete value for depot
  deletedepot(DeleteAlert,c) {
    this.mysubmit=true;
    //let depotid;
   // let depotname;
    for (let i of c) {
     this. depotid = i.DEPOT_ID;
     this.depotname = i.DEPOT_NAME;
    }
    const postData = {
      depotid:this. depotid,
      depotname:this.depotname
    }
    //sending values for Delete Depot
    console.log('sending values for Delete Depot : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('deletedepot', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespDeleteDepot(DeleteAlert,res),
        error => this.GetErrorDeleteDepot(error));
  }
  //Getting the response for the delete depot
  GetRespDeleteDepot(template: TemplateRef<any>, resp) {
    console.log(' Getting the response for the delete depot : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('Depot Deleted Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/depot']);
        console.log('Navigate to Depot');
      }, 3000);
    } 
    //ALERT 
   else if (resp.RESP_STATUS === 'ALERT') {
      console.log('Alert !!!!!!!!');
    
       this.showAlert(template);
    }
   else {
      console.log('Delete Depot Failed !!!!');
       this.toastr.error(resp.RESP_DESC);
   }
    
  }
  //Getting the Error for the delete depot
  GetErrorDeleteDepot(error) {
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
    console.log(' Getting the Error for the delete depot: ' + JSON.stringify(error));
  }
/* //confirm Delete the Depot
ConfirmDeletedDepot(){
   console.log('confirm Delete the Depot');
   this.modalRef.hide();
   const postData = {
    depotid:this.depotid,
    depotname:this.depotname,
    reason:'y'
   }
//sending for confirm Delete the Depot values
console.log('sending for confirm Delete the Depot values: ' + JSON.stringify(postData));
this.rest.sendPostRequest('deletedepot', JSON.stringify(postData))
  .subscribe(
    res => this.GetRespConfirmDeleteDepot( res),
    error => this.GetErrorConfirmDeleteDepot1(error));
}
// Getting the response for the Confirm delete depot
GetRespConfirmDeleteDepot( resp) {
console.log(' Getting the response for the Confirm delete depot : ' + JSON.stringify(resp));
if (resp.RESP_STATUS === 'SUCCESS') {
  this.toastr.success(resp.RESP_DESC);
  console.log('Depot Confirm Deleted Successfully');
  setTimeout(() => {
    this.toastr.clear();
  }, 2500);
  setTimeout(() => {
    this.router.navigate(['/layout/depot']);
    console.log('Navigate to Depot');
  }, 3000);
} else {
 this.toastr.error(resp.RESP_DESC);
 console.log('Failed Confirm Delete Depot');
}
}
// Getting the Error for the Confirm delete depot
GetErrorConfirmDeleteDepot1(error) {
console.log(' Getting the Error for the Confirm delete depot: ' + JSON.stringify(error));
} */

 }

