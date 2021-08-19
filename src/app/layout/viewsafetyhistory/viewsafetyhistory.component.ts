import { Component, OnInit } from '@angular/core';
import { PassdataService } from '../../services/passdata.service';

@Component({
  selector: 'app-viewsafetyhistory',
  templateUrl: './viewsafetyhistory.component.html',
  styleUrls: ['./viewsafetyhistory.component.css']
})
export class ViewsafetyhistoryComponent implements OnInit {
  safetylist: [];
  constructor(
   private passData: PassdataService
  ) { }

  ngOnInit() {
     let data = this.passData.getJSONData();
    this.safetylist = this.passData.getJSONData();
    console.log('Getting the Data in View safety History Page: ' + JSON.stringify(data));
  }
}