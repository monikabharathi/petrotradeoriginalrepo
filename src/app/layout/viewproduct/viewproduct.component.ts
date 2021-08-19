import { Component, OnInit } from '@angular/core';
import { PassdataService } from '../../services/passdata.service';
@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  productlist: [];
 constructor(
   private passData: PassdataService
    ) {  }

  ngOnInit() {
    
    let data=this.passData.getJSONData();
    this.productlist=this.passData.getJSONData();
    console.log('Data : '+JSON.stringify(data));
  }

}
