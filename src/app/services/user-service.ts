import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Role } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class EmplyeeserviceService {

  Products = [];
  Categories = [];
  CategorySelected = 0;
  BillItems = [];
  url = 'http://localhost:55088/'
  constructor(private http: HttpClient) { }


  createemployee(user: User): Observable<any> {
    //this.sendAjaxCall('Account/RegisterUser', user);
    return this.sendAjaxCall(this.url + 'Account/RegisterUser', user);
  }
  loginUser(user: User): Observable<any> {
    return this.sendAjaxCall(this.url + 'Account/LogOn', user);
  }
  logOutUser(): Observable<any> {
    return this.sendAjaxCall(this.url + 'Account/LogOff', {});
  }
  GetAllProducts(jsonData: any): Observable<any> {
    return this.sendAjaxCall(this.url + 'Product/GetAll', jsonData);
  }
  GetAllCategories(jsonData: any): Observable<any> {
    return this.sendAjaxCall(this.url + 'Category/GetAll', jsonData);
  }
  AddInvoice(jsonData: any): Observable<any> {
    return this.sendAjaxCall(this.url + 'Invoice/Add', jsonData);
  }

  sendAjaxCall(requestUrl: string, jsonData: Object): Observable<any> {

    var currentUserToken = localStorage.getItem('currentUserToken');
    var httpOptions = {
      headers: <HttpHeaders>new HttpHeaders({
        'Authorization': `Bearer ${currentUserToken ? currentUserToken : ''}`
      })
    };
    return this.http.post<User>(requestUrl, jsonData, httpOptions);
  }



  //sendAjaxCall(requestUrl: string, jsonData: Object, successHandler?: Function, errorHandler?: Function, completeHandler?: Function, requestType?: string, successMesage?: string, contentType?: string) {

  //  jsonData = jsonData === null ? {} : jsonData;
  //  requestType = !requestType || requestType == 'POST' ? 'post' : 'get';
  //  // var reqHeader = new Headers();
  //  // reqHeader.append('Authorization', `Bearer ${JSON.parse(localStorage.getItem('currentUser'))['token']}`);
  //  // reqHeader.append('Content-Type', 'application/json');
  //  var currentUser = JSON.parse(localStorage.getItem('currentUser'));

  //  var httpOptions = {
  //    headers: <HttpHeaders>new HttpHeaders({
  //      'Authorization': `Bearer ${currentUser && currentUser.Token ? currentUser['Token'] : ''}`
  //    })
  //  };

  //  this.http[requestType](this.url + requestUrl, jsonData, httpOptions).subscribe(
  //    (data: any) => {
  //      if (typeof successHandler === "function") {
  //        successHandler(data);
  //      }
  //    },
  //    (error: any) => {
  //      if (error.status === 401) {
  //        // auto logout if 401 response returned from api
  //        localStorage.removeItem('currentUser');
  //        location.reload(true);
  //        return;
  //      }

  //      if (typeof errorHandler === "function") {
  //        errorHandler(error);
  //      } else {
  //        console.log(error);
  //      }
  //    });
  //}
}
