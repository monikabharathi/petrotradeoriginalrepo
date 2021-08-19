import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplyplan',
  templateUrl: './supplyplan.component.html',
  styleUrls: ['./supplyplan.component.css']
})
export class SupplyplanComponent implements OnInit {


  //maker
  deletevisiable: any;
  editvisiable: any;
  addvisiable: any;
//both
  viewvisiable: any;
 //checker
  deleteauthvisiable: any;
  authprofilevisiable: any
  menuactions :any;


  constructor() { }
  response;
  ngOnInit() {




    this.menuactions = JSON.parse(localStorage.getItem('MENUSACTIONS'));

    console.log("MenusActions :: "+JSON.stringify(this.menuactions.undersub));
    
    
    this.deletevisiable=false;
    this.editvisiable=false;
    this.viewvisiable=false;
    this.addvisiable=false;
    
    
    this.deleteauthvisiable=true;
    this.authprofilevisiable=true;
    
    
    
    
    
    for (let unaction of this.menuactions.undersub) {
    if (unaction.SUBMENUID === '00304' && unaction.SUPERMENUID==='0030401' && unaction.FLAG===false) {
    
    //add profile
    this.addvisiable=true;
    
    }
    if (unaction.SUBMENUID === '00304' && unaction.SUPERMENUID==='0030403' && unaction.FLAG===false) {
    
    //edit profile
    this.editvisiable=true;
    
    }
   
    if (unaction.SUBMENUID === '00304' && unaction.SUPERMENUID==='0030402'&& unaction.FLAG===false) {
    
    
    //view profile
    this.viewvisiable=true;
    
    }
  }
  
  
  
     
    }








  }   
