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
  url = 'http://localhost:1100/'
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
  AddProduct(jsonData: any): Observable<any> {
    return this.sendAjaxCall(this.url + 'Product/Add', jsonData);
  }
  AddCategory(jsonData: any): Observable<any> {
    return this.sendAjaxCall(this.url + 'Category/Add', jsonData);
  }
  EditCategory(jsonData: any): Observable<any> {
    return this.sendAjaxCall(this.url + 'Category/edit', jsonData);
  }
  EditProduct(jsonData: any): Observable<any> {
    return this.sendAjaxCall(this.url + 'Product/edit', jsonData);
  }
  DeleteProduct(jsonData: any): Observable<any> {
    return this.sendAjaxCall(this.url + 'Product/delete', jsonData);
  }
  DeleteCategory(jsonData: any): Observable<any> {
    return this.sendAjaxCall(this.url + 'Category/Delete', jsonData);
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
}
