import { Component, OnInit } from '@angular/core';
import { PassdataService } from '../../services/passdata.service';
@Component({
  selector: 'app-viewullagetank',
  templateUrl: './viewullagetank.component.html',
  styleUrls: ['./viewullagetank.component.css']
})
export class ViewullagetankComponent implements OnInit {
  ullagelist: [];
  constructor(
    private passData: PassdataService
  ) { }

  ngOnInit() {
    let data=this.passData.getJSONData();
    this.ullagelist=this.passData.getJSONData();
    console.log('Data ullagelist: '+JSON.stringify(data));
  }

}
