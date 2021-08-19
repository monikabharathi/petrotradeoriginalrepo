import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PassdataService } from '../../services/passdata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  profileData: any;
 
  mysubmit : any;

  meusidssel:any=[];
  menu:any={parentmenu:[],submenu:[],childmenu:[]};
  parentmenu: any = {};
  submenu: any = {};
  subpersubmeny: any = {};
  model: any = {};
form :any;
  constructor(  private rest: RestapiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private passData: PassdataService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
this.mysubmit=false;
    let data=this.passData.getJSONData();
    this.profileData=this.passData.getJSONData();
    console.log('view profile Data== : '+JSON.stringify(this.profileData.profiletype));
    this.model.profiletype=this.profileData.profiletype;
    this.model.profilename=this.profileData.profilename;
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

getMenu(pid,menu,event) {
  console.log(menu +' : '+ event);
  if(event === true) {
    for(let m of this.parentmenu.sub) {
      if(m.PARENTID===pid){
        m.FLAG=true;    
        console.log(m.PARENTID +' '+m.FLAG);
      }
      for(let cm of this.parentmenu.undersub) {  
        if(m.SUBMENUID===cm.SUBMENUID && m.PARENTID===pid){
          cm.FLAG=true;    
          console.log(cm.SUBMENUID +' '+cm.FLAG);
          console.log(cm.SUPERMENUID +' '+cm.FLAG);
        } 
      }
    }
  }
  else if(event === false){
    for(let m of this.parentmenu.sub) {
      if(m.PARENTID===pid){
        m.FLAG=false;    
        console.log(m.PARENTID +' '+m.FLAG);
      }
      for(let cm of this.parentmenu.undersub) {  
        if(m.SUBMENUID===cm.SUBMENUID && m.PARENTID===pid){
          cm.FLAG=false;    
          console.log(cm.SUBMENUID +' '+cm.FLAG);
          console.log(cm.SUPERMENUID +' '+cm.FLAG);
        } 
      }
    }
  }
}



getsubMenu(pid,menu,event) {
  console.log(menu +' : '+ event);
  if(event === true) {
    for(let m of this.parentmenu.undersub) {
      if(m.SUBMENUID===pid){
        m.FLAG=true;    
        console.log(m.PARENTID +' '+m.FLAG);
      }
     
    }
  }
  else if(event === false){
    for(let m of this.parentmenu.undersub) {
      if(m.SUBMENUID===pid){
        m.FLAG=false;    
        console.log(m.PARENTID +' '+m.FLAG);
      }
     
    }
  }
}

editProfile(form){
  this.mysubmit=true;
  let finalMenuId=[];
  console.log(this.meusidssel+'All Menu : '+JSON.stringify(this.menu));
  for(let p of this.parentmenu.parent){
    if(p.FLAG===true){
      finalMenuId.push(p.PARENTID);
    }
    for(let m of this.parentmenu.sub){
      if(m.FLAG===true && m.PARENTID===p.PARENTID){
        finalMenuId.push(m.SUBMENUID);
      }
      for(let cm of this.parentmenu.undersub){
        if(cm.FLAG===true && m.SUBMENUID===cm.SUBMENUID && m.PARENTID===p.PARENTID){
          finalMenuId.push(cm.SUPERMENUID);
        }
      }
    }
  }
  console.log('finalMenuId : '+JSON.stringify(finalMenuId));
  if(finalMenuId.length===0)
  {
    this.mysubmit=false;
    this.toastr.success("Select Menus ");
    return false;
  }
   const postData = {
    profileid:this.profileData.profileid,
    addby:this.profileData.addby,
    profilename: this.model.profilename,
    profiletype: this.model.profiletype,
    menuids: finalMenuId
   
  };
//Sending The Added Values For Product
console.log('Sending The editProfile Values For Profile :' + JSON.stringify(postData));
this.rest.sendPostRequest('editProfile', JSON.stringify(postData))
  .subscribe(
    res => this.GetRespeditProfile(res),
    error => this.GetErroreditProfile(error)); 
}


//Getting Response for Add Profile
GetRespeditProfile(resp) {
console.log('Getting Response for Add Profile : ' + JSON.stringify(resp));
if (resp.RESP_STATUS === 'SUCCESS') {
this.toastr.success(resp.RESP_DESC);
console.log('Profile Edited Successfully');
setTimeout(() => {
  this.toastr.clear();
}, 2500);
setTimeout(() => {
  this.router.navigate(['/layout/profile']);
  console.log('Navigate to Profile');
}, 3000);
} else {
console.log('Failed For Add Profile');
this.toastr.error(resp.RESP_DESC);
}
}
//Getting Error For Add Profile
GetErroreditProfile(error) {
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
console.log('Getting Error for Add Product : ' + JSON.stringify(error));

}




}
