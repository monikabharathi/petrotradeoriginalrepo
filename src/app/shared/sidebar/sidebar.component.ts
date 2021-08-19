import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PassdataService } from '../../services/passdata.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  customMenu: any = [];
  submenu: any = [];
  datalenth: any = [];
  username: any;
  lastlogin: any;
  parentmenu: any;
  icon: any;
  //submenu: any = {};
  submenuslist: any = [];
  subpersubmeny: any = {};
  selmenuids: any = {};

  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  constructor(private modalService: NgbModal, private rest: RestapiService, private router: Router, private route: ActivatedRoute, private passData: PassdataService) { }
  // End open close
  ngOnInit() {
    this.username = localStorage.getItem('USERNAME')
    this.lastlogin = localStorage.getItem('LASTLOGIN');


    let data = this.passData.getJSONData();

    //alert(JSON.stringify(data).length);
    console.log("SIDE BARE :: " + localStorage.getItem('ALLMENUS'))
    if (JSON.stringify(data).length === 2) {

      this.parentmenu = JSON.parse(localStorage.getItem('ALLMENUS'));
      this.selmenuids = JSON.parse(localStorage.getItem('MENUSIDS'));

    }
    else {
      this.parentmenu = data.ALLMENUS;
      this.selmenuids = data.MENUSIDS;
    }

    console.log("all  menus loc storege" + localStorage.getItem('ALLMENUS'));
    console.log("sel menus loc storege" + JSON.parse(localStorage.getItem('MENUSIDS')));

    console.log("all  menus DATA" + data.ALLMENUS);
    console.log("sel menus DATA" + data.MENUSIDS);

    this.selmenuids.forEach(element => {
      for (let p of this.parentmenu.parent) {
        if (p.PARENTID === element) {
          p.FLAG = true;
        }
      }

      for (let s of this.parentmenu.sub) {
        if (s.SUBMENUID === element) {
          s.FLAG = true;
        }
      }
      for (let cm of this.parentmenu.undersub) {
        if (cm.SUPERMENUID === element) {
          cm.FLAG = true;
        }
      }
    });
     localStorage.setItem('MENUSACTIONS', JSON.stringify(this.parentmenu)); 
  this.loadMenusDymically();
  }



  loadMenusDymically() {
 /*    this.customMenu.push(this.customMenu = this.customMenu = [
      {
        path: '',
        title: 'Dashboards',
        icon: 'mdi mdi-gauge',
        class: 'has-arrow',
        label: '',
        labelClass: 'label label-rouded label-themecolor pull-right',
        extralink: false,
        submenu: [
          { path: '/layout/stock', title: 'Stock', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
          { path: '/layout/forecast', title: 'Forecast', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        ]
      }]); */

    for (let parent of this.parentmenu.parent) {
      //alert(parent.FLAG +"parentid "+parent.PARENTID);
      if (parent.FLAG === true) {



        for (let sub of this.parentmenu.sub) {

          if (parent.FLAG === true && sub.FLAG === true && parent.PARENTID === sub.PARENTID) {

            this.submenuslist.push(
              { path: '/layout/' + sub.SUBACTION, title: sub.SUBMENUNAME, icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] });
          }

        }
        this.customMenu.push(
          {
            path: '',
            title: parent.PARENTNAME,
           // icon: 'mdi mdi-gauge',
           icon: parent.ICON,
            class: 'has-arrow',
            label: '',
            labelClass: 'label label-rouded label-themecolor pull-right',
            extralink: false,
            submenu: this.submenuslist
          }

        );
      }

      this.submenuslist = [];
    }


  }

  logout() {

    const postData = {

    };
    console.log('Logout User:' + JSON.stringify(postData));
    this.rest.sendPostRequest('logout', JSON.stringify(postData))
      .subscribe(
        res => this.GetRespLogout(res),
        error => this.GetErrorLogout(error));
  }

  GetRespLogout(resp) {
    console.log('Getting Response for  user Login : ' + JSON.stringify(resp));
    if (resp.RESP_STATUS === 'SUCCESS') {

      //this.rest.token=null;

      localStorage.removeItem('TOKEN');
      localStorage.removeItem('USERTYPE');
      localStorage.removeItem('USERNAME');
      localStorage.removeItem('LASTLOGIN');
      localStorage.removeItem('USERID');

      localStorage.removeItem('MENUSIDS');
      localStorage.removeItem('ALLMENUS');
      localStorage.removeItem('MENUSACTIONS');
      this.router.navigate(['/login']);

    }
    else {
      //localStorage.removeItem('MENUSDATA'); 

      localStorage.removeItem('TOKEN');
      localStorage.removeItem('USERTYPE');
      localStorage.removeItem('USERNAME');
      localStorage.removeItem('LASTLOGIN');
      localStorage.removeItem('USERID');

      localStorage.removeItem('MENUSIDS');
      localStorage.removeItem('ALLMENUS');
      localStorage.removeItem('MENUSACTIONS');
      this.router.navigate(['/login']);
    }



  }
  GetErrorLogout(error) {

    this.router.navigate(['/login']);

  }
}



