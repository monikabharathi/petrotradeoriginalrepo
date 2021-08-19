import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class RestapiService {
//url = 'http://172.16.10.226:7552/';  //local 
// url = 'http://localhost:8080/PetroTradeServices/'; //uat
 //url = 'http://172.16.10.59:8080/PetroTradeServices/';  //local 

url = 'http://localhost:7485/';  //mine 
  
 
  resp: any;
  menusdata: any = {};
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }
 /*  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , responseType: 'json' })
  }; */
setgetmethod(subUrl: any, postData: any ): Observable<{}> {

  const finalUrl = subUrl;
  return this.httpClient.post(finalUrl, postData,
    {headers: new HttpHeaders().set('cookie','JSESSOINID='+localStorage.getItem('TOKEN') ),withCredentials: true})
    .pipe(
//return this.httpClient.post(finalUrl, postData,{headers: new HttpHeaders().set('cookie','JSESSOINID='+localStorage.getItem('TOKEN') ).set('withCredentials', 'true')}).pipe(

 retry(0),
    map(this.extractData),
    retry(0),
    catchError(this.handleError)
  );

  
  }

   sendPostRequest(subUrl: any, postData: any ): Observable<{}> {
    const finalUrl = this.url + subUrl;
    console.log('Url : ' + finalUrl);
    console.log('token session :: '+localStorage.getItem('TOKEN') );
    //return this.httpClient.post(finalUrl, postData,
      
      /* { headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
        'withCredentials':'true',
        'cookie': 'JSESSOINID='+localStorage.getItem('TOKEN'),
//'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Access-Control-Allow-Origin',
        "Access-Control-Allow-Headers":"*"
        })}
    //.set('cookie','JSESSOINID='+localStorage.getItem('TOKEN') ),withCredentials: true
    
    ).pipe( */
    //return this.httpClient.post(finalUrl, postData).pipe(
     // return this.httpClient.post(finalUrl, postData,{headers: new HttpHeaders().set('cookie','JSESSOINID='+localStorage.getItem('TOKEN') ),withCredentials: true}).pipe(
//'cookie' this one also woing
    return this.httpClient.post(finalUrl, postData,
      {headers: new HttpHeaders().set('cookie','JSESSOINID='+localStorage.getItem('TOKEN') ),withCredentials: true})
      .pipe(
  //return this.httpClient.post(finalUrl, postData,{headers: new HttpHeaders().set('cookie','JSESSOINID='+localStorage.getItem('TOKEN') ).set('withCredentials', 'true')}).pipe(
 
   retry(0),
      map(this.extractData),
      retry(0),
      catchError(this.handleError)
    );
  }


 /*  postData(suburl, postData) {
    const headers = {headers: new HttpHeaders().set('cookie','JSESSOINID='+localStorage.getItem('TOKEN') ),withCredentials: true};
    return this.httpClient.post(this.url + suburl,postData, {headers: new HttpHeaders().set('cookie','JSESSOINID='+localStorage.getItem('TOKEN') ),withCredentials: true});
  } */
  /* private extractData(res: Response) {
    //console.log('Result : ' + JSON.stringify(res));
    const body = res;
    return body || { };
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error('Handle Error : ' + JSON.stringify(errMsg as any));
    return Observable.throw(errMsg);
  } */
  private extractData(res: Response) {
		console.log('Result : '+JSON.stringify(res));
		let body = res;
		return body || { };
	}
	
	private handleError (error: Response | any) {
    let errMsg: string;
    console.log('Error Status : '+error.status);
		if (error instanceof Response) {
			const err = error || '';
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error('Handle Error : '+JSON.stringify(<any>errMsg));
		return throwError(errMsg);
	}
}
