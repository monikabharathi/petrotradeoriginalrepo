import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addprofile',
  templateUrl: './addprofile.component.html',
  styleUrls: ['./addprofile.component.css']
})
export class AddprofileComponent implements OnInit {


  menu: any = { parentmenu: [], submenu: [], childmenu: [] };
  meusidssel: any = [];
  mysubmit: any;
  form: any;
  totalomenus: any = {}
  model: any = {};
  mkcklist: any = {};
  parentmenu: any = [];
  submenu: any = {};
  subpersubmeny: any = {};
  openConfiguration: boolean;
  openSpr: boolean;
  openReport: boolean;
  openuser: boolean;
  constructor(private router: Router,
    private rest: RestapiService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.openConfiguration = true;
    this.openSpr = true;
    this.openReport = true;
    this.openuser = true;
    this.model.profiletype='B';
    this.getMenus('B');
    this.mysubmit=false;
  }
  getMenu(pid, menu, event) {
    console.log(menu + ' : ' + event);
    if (event === true) {
      for (let m of this.parentmenu.sub) {
        if (m.PARENTID === pid) {
          m.FLAG = true;
          console.log(m.PARENTID + ' ' + m.FLAG);
        }
        for (let cm of this.parentmenu.undersub) {
          if (m.SUBMENUID === cm.SUBMENUID && m.PARENTID === pid) {
            cm.FLAG = true;
            console.log(cm.SUBMENUID + ' ' + cm.FLAG);
            console.log(cm.SUPERMENUID + ' ' + cm.FLAG);
          }
        }
      }
    }
    else if (event === false) {
      for (let m of this.parentmenu.sub) {
        if (m.PARENTID === pid) {
          m.FLAG = false;
          console.log(m.PARENTID + ' ' + m.FLAG);
        }
        for (let cm of this.parentmenu.undersub) {
          if (m.SUBMENUID === cm.SUBMENUID && m.PARENTID === pid) {
            cm.FLAG = false;
            console.log(cm.SUBMENUID + ' ' + cm.FLAG);
            console.log(cm.SUPERMENUID + ' ' + cm.FLAG);
          }
        }
      }
    }
  }


  getsubMenu(pid, menu, event) {
    console.log(menu + '11 : ' + event);
    if (event === true) {
      for (let m of this.parentmenu.undersub) {
        if (m.SUBMENUID === pid) {
          m.FLAG = true;
          console.log(m.PARENTID + ' ' + m.FLAG);
        }

      }
    }
    else if (event === false) {
      for (let m of this.parentmenu.undersub) {
        if (m.SUBMENUID === pid) {
          m.FLAG = false;
          console.log(m.PARENTID + ' ' + m.FLAG);
        }

      }
    }
  }






  checkProfileName(f: NgForm) {


    // alert('ProfileName '+this.model.profilename);
    const postData = {
      profilename: this.model.profilename

    }
    console.log('Sending checkProfileName : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('profileNamechecking', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespCheckprofileName(res),
        error => this.GetErrorCheckprofileName(error));
  }

  //Getting Response For Add Depot
  GetRespCheckprofileName(resp) {
    console.log('Getting Response ForCheckprofile : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') { 
      this.model.profilename=null;
      this.toastr.error("This ProfileName Already Exist.Try Some Another Name.");
      setTimeout(() => {
        this.toastr.clear();
      }, 2000);
     /*  setTimeout(() => {
     console.log('timeout');
      }, 2000);
 */
 } else {
  console.log('username not already exist');
    
 }
  }
  //Getting Error For Add Depot
  GetErrorCheckprofileName(error) {
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
 addProfile(form) {
  this.mysubmit=true;

    let finalMenuId = [];
    console.log(this.meusidssel + 'All Menu : ' + JSON.stringify(this.menu));
    for (let p of this.parentmenu.parent) {
      if (p.FLAG === true) {
        finalMenuId.push(p.PARENTID);
      }
      for (let m of this.parentmenu.sub) {
        if (m.FLAG === true && m.PARENTID === p.PARENTID) {
          finalMenuId.push(m.SUBMENUID);
        }
        for (let cm of this.parentmenu.undersub) {
          if (cm.FLAG === true && m.SUBMENUID === cm.SUBMENUID && m.PARENTID === p.PARENTID) {
            finalMenuId.push(cm.SUPERMENUID);
          }
        }
      }
    }
    console.log('finalMenuId : ' + JSON.stringify(finalMenuId.length));

    if (finalMenuId.length ===0) {
      this.toastr.error("Select Menus ");
      this.mysubmit=false;
      return false;
    }

    const postData = {
      // profileid:'101',
      profilename: this.model.profilename,
    //  profiletype: this.model.profiletype,
    profiletype: "B",
      menuids: finalMenuId

    };
    //Sending The Added Values For Product
    console.log('Sending The Added Values For Profile :' + JSON.stringify(postData));
    this.rest.sendPostRequest('addProfile', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespaddProfile(res),
        error => this.GetErroraddProfile(error));
  }


  //Getting Response for Add Profile
  GetRespaddProfile(resp) {
    //this.mysubmit=false;

    console.log('Getting Response for Add Profile : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.toastr.success(resp.RESP_DESC);
      console.log('Profile Added Successfully');
      setTimeout(() => {
        this.toastr.clear();
      }, 2500);
      setTimeout(() => {
        this.router.navigate(['/layout/profile']);
        console.log('Navigate to Profile');
      }, 2500);
    } else {
      console.log('Failed For Add Profile');
      this.toastr.error(resp.RESP_DESC);
    }
  }
  //Getting Error For Add Profile
  GetErroraddProfile(error) {
    this.mysubmit=false;

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

/*   getMenus(f: NgForm) { */

  getMenus (profiletype: any) {
     //alert('mkck '+profiletype);
    if (profiletype === undefined || profiletype === null) {
      // alert('null');
      this.model.profiletype = null;
      return false;

    }
   const postData = {
      MKCK: profiletype

    };

    console.log('Sending The Depot Added Values : ' + JSON.stringify(postData));
    this.rest.sendPostRequest('getparentMenus', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespParentMenus(res),
        error => this.GetErrorParentMenus(error));


  }


  //Getting Response For Add Depot
  GetRespParentMenus(resp) {
    console.log('Getting Response Forparentmenu : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {
      this.parentmenu = resp.RESP_DESC;
      //this.totalomenus.Add(this.parentmenu);

    } else {
      console.log('Failed Forparentmenu ');
      this.toastr.error(resp.RESP_DESC);
    }
  }
  //Getting Error For Add Depot
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
