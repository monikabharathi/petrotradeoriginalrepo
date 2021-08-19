import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PassdataService } from '../../services/passdata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userpasswordgeneratepage',
  templateUrl: './userpasswordgeneratepage.component.html',
  styleUrls: ['./userpasswordgeneratepage.component.css']
})
export class Userpasswordgeneratepage implements OnInit {

  user : any  = {};
  userData: any;
  constructor(  private rest: RestapiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private passData: PassdataService,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {

    let data=this.passData.getJSONData();
    this.userData=this.passData.getJSONData();
    console.log('view password Data== : '+JSON.stringify(this.userData.USERNAME));
    this.user.username=this.userData.USERNAME;
    this.user.password=this.userData.PASSWORD;
 }


}
