import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'app';
  constructor (
    private router: Router
  ){}
  
  ngOnInit(){
    /* alert('refresh');
   this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['layout/stock']);
  }); */   

}
}
