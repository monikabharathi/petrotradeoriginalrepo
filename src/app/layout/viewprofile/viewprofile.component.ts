import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { PassdataService } from '../../services/passdata.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
  profileData: any;
 
  menu:any={parentmenu:[],submenu:[],childmenu:[]};
  parentmenu: any = {};
  submenu: any = {};
  subpersubmeny: any = {};

  constructor(  private rest: RestapiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private passData: PassdataService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {

    let data=this.passData.getJSONData();
    this.profileData=this.passData.getJSONData();
    console.log('view profile Data== : '+JSON.stringify(this.profileData.profiletype));
 
    const postData = {
      MKCK :this.profileData.profiletype
  
    };

    this.rest.sendPostRequest('getparentMenus', JSON.stringify(postData))
    .subscribe(
      res => this.GetRespParentMenus(res),
      error => this.GetErrorParentMenus(error));
  }


 //Getting Response For Add Depot
 GetRespParentMenus(resp) {
  console.log('Getting Response Forparentmenu : ' + JSON.stringify(resp));
  if ( resp.RESP_STATUS === 'SUCCESS' ) {
     this.parentmenu=resp.RESP_DESC;
     this.profileData.menuids.forEach(element => {
  

     for(let p of this.parentmenu.parent){
      if(p.PARENTID===element){
       p.FLAG=true;
      }
    }



    

      for(let s of this.parentmenu.sub){
        if(s.SUBMENUID===element){
          s.FLAG=true;
        }
      }

        for(let cm of this.parentmenu.undersub){
          if(cm.SUPERMENUID===element){
            cm.FLAG=true;
          }
        }
      });




    }
}
 GetErrorParentMenus(error) {
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
  console.log('Getting Error For parentmenu : ' + JSON.stringify(error));

}

}