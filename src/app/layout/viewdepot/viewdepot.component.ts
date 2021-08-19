import { Component, OnInit } from '@angular/core';
import { PassdataService } from '../../services/passdata.service';
@Component({
  selector: 'app-viewdepot',
  templateUrl: './viewdepot.component.html',
  styleUrls: ['./viewdepot.component.css']
})
export class ViewdepotComponent implements OnInit {
  depotlist: any;
   constructor(
  private passData: PassdataService
    ) {  }

  ngOnInit() {
    let data=this.passData.getJSONData();
    this.depotlist=this.passData.getJSONData();
    console.log('view depot Data== : '+JSON.stringify(data));
  }

}
