import { Component, OnInit } from '@angular/core';
import { PassdataService } from '../../services/passdata.service';

@Component({
  selector: 'app-viewbulkstock',
  templateUrl: './viewbulkstock.component.html',
  styleUrls: ['./viewbulkstock.component.css']
})
export class ViewbulkstockComponent implements OnInit {
  stocklist: any;
  stocklistdropdown: any;
  bulkstock: any = {};
  depotname: any;
  prodcut: any;
  myiputvalue: any;
  constructor(
    private passData: PassdataService
  ) { }
 ngOnInit() {
 this.myiputvalue ='';
   let depotname;
   this.prodcut=true;
   let loadeddate;
   let weekday;
      let data=this.passData.getJSONData();
     // this.stocklist=this.passData.getJSONData();
      this.stocklist=data.RESP_STATUS_DATA;
      this.stocklistdropdown=data.DataStockdropdown;

      console.log('view Stocklist Data in viewstock page== : '+JSON.stringify(this.stocklist));
   


      
      for (let i of data.RESP_STATUS_DATA) {

        depotname = i.DEPOT_NAME;
        loadeddate = i.LOADED_DATE;
        weekday = i.weekday;
      }

      console.log('depotname---: ' + depotname);
      console.log('loadeddate---: ' + loadeddate);
      console.log('weekday---: ' + weekday);

      this.bulkstock.depotname = depotname;
      this.bulkstock.loadeddate = loadeddate;
      this.bulkstock.weekday = weekday;
     
    }
  

    enableProduct(valueid: any): void
    {    this.prodcut=false;
  
     //alert("proid id : "+valueid);
  
      this.myiputvalue=valueid;
    }
  
    Number (value) { return Number(value)}
  }


