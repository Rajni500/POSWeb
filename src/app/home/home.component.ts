import { Component, OnInit, NgZone } from '@angular/core';
import { EmplyeeserviceService } from '../services/user-service';
import { FormControl } from '@angular/forms';
import { BillItem } from '../models/user';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  SearchText = new FormControl('');
  BillItems = [];
  Products = [];
  SubTotal = 0;
  ItemCount = 0;
  Discount = new FormControl(0);
  VAT = new FormControl(0);
  Total = 0;
  json = {
  };

  constructor(private employeeservice: EmplyeeserviceService, private ngZone: NgZone) { }

  ngOnInit() {
    this.SearchText.setValue("");
    this.GetProducts(this.json);
    this.GetCategories(this.json);

    window['angularComponentReference'] = { component: this, zone: this.ngZone, CancelSaleFunction: () => this.Cancel(), ConfirmSaleFunction: () => this.ConfirmSale({}) };
  }
  GetProducts(jsonData: any) {
    jsonData.Title = this.SearchText.value;
    jsonData.CategoryId = this.employeeservice.CategorySelected;
    this.employeeservice.GetAllProducts(jsonData).subscribe(
      (data) => {
        if (data != null) {
          this.employeeservice.Products = data.data;
        }
      },
      (error) => {
        //window.alert(error.error);

        if (error.status == 401) {
          localStorage.setItem('IsLoggedIn', 'false');
          window.location.href = '/login';
        }
        else
          window.alert(error.error.error);
      })
  }
  GetCategories(jsonData: any) {
    this.employeeservice.GetAllCategories(jsonData).subscribe(
      (data) => {
        if (data != null) {
          this.employeeservice.Categories = data.data;
        }
      },
      (error) => {
        //window.alert(error.error);

        if (error.status == 401) {
          localStorage.setItem('IsLoggedIn', 'false');
          window.location.href = '/login';
        }
        else
          window.alert(error.error.error);

      }
    )
  }
  onKey(event: any) {
    this.SearchText.setValue(event.target.value);
    this.GetProducts(this.json);
  }
  ChangeCategory(category: any) {
    if (category != null) {
      this.employeeservice.CategorySelected = category.id
    }
    else {
      this.employeeservice.CategorySelected = 0;
    }

    this.GetProducts(this.json);
  }
  IsSelected(category: any) {
    if (this.employeeservice.CategorySelected == category.id)
      return true;
    else
      return false;
  }
  SelectProduct(product: any) {
    let item = this.employeeservice.BillItems.find(ob => ob.id === product.id);
    if (!item) {
      product.quantity = 1;
      this.employeeservice.BillItems.push(product);
    }
    else {
      item.quantity += 1;
    }
    this.CalculateSubTotal();
  }

  IncreaseQuantity(product: any) {
    let item = this.employeeservice.BillItems.find(ob => ob.id === product.id);
    if (!item) {
      product.quantity = 1;
      this.employeeservice.BillItems.push(product);
    }
    else {
      item.quantity += 1;
    }
    this.CalculateSubTotal();
  }

  DecreaseQuantity(product: any) {
    let item = this.employeeservice.BillItems.find(ob => ob.id === product.id);
    if (!item) {
      product.quantity = 1;
      this.employeeservice.BillItems.push(product);
    }
    else {
      item.quantity -= 1;
      if (item.quantity == 0) {
        this.employeeservice.BillItems = this.employeeservice.BillItems.filter(a => a.id !== item.id);
      }
    }
    this.CalculateSubTotal();
  }
  RemoveItem(product: any) {
    let item = this.employeeservice.BillItems.find(ob => ob.id === product.id);
    if (item) {
      this.employeeservice.BillItems = this.employeeservice.BillItems.filter(a => a.id !== item.id);
    }
    this.CalculateSubTotal();
  }
  CalculateSubTotal() {
    this.SubTotal = 0; this.ItemCount = 0;
    this.employeeservice.BillItems.forEach(item => this.SubTotal += item.quantity * item.unitPrice);
    this.Total = this.SubTotal - (this.Discount.value * this.SubTotal / 100) + (this.VAT.value * this.SubTotal / 100);

    this.employeeservice.BillItems.forEach(item => this.ItemCount += item.quantity);
  }
  Cancel() {
    this.employeeservice.BillItems = [];
    this.SubTotal = 0;
    this.Total = 0;
    this.ItemCount = 0;
    this.Discount.setValue(0);
    this.VAT.setValue(0);
  }
  ConfirmSale(jsonData: any) {
    if (this.employeeservice.BillItems.length == 0) {
      return;
    }
    jsonData = {};
    jsonData.InvoiceNumber = "";
    jsonData.DateOfSale = Date.now;
    jsonData.DiscountPercent = this.Discount.value;
    jsonData.VAT = this.VAT.value;
    jsonData.SubTotal = this.SubTotal;
    jsonData.InvoiceTotal = this.Total;
    jsonData.BillItems = [];
    this.employeeservice.BillItems.forEach(item => {
      let newItem = new BillItem()
      newItem.ProductId = item.id;
      newItem.Quantity = item.quantity;

      jsonData.BillItems.push(newItem)
    });

    if (jsonData.DiscountPercent > 100 || jsonData.VAT > 100) {

      window.alert("Discount and VAT can not be greater than 100%");
      return;
    }

    this.employeeservice.AddInvoice(jsonData).subscribe(data => {
      window.alert("Your Order is Successfull\nYour GrandTotal is " + this.Total + " EUR");
      this.GetProducts(this.json);
      this.Cancel();
    },
      (error) => {
        if (error.status == 401) {
          localStorage.setItem('IsLoggedIn', 'false');
          window.location.href = '/login';
        }
        else
          window.alert(error.error.error);
      });
  }
}
