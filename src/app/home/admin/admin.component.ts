import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home.component';
import { AppComponent } from 'src/app/app.component';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { EmplyeeserviceService } from 'src/app/services/user-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  product = new Product(0,'',0,0,'',0,null);
  category = new Category(0,'');
  ProductList = [];
  CategoryList = [];
  json: {};


  constructor(private app: AppComponent, private employeeservice: EmplyeeserviceService) {
    this.app.ShowProductDiv = false;
  }

  ngOnInit() {
    this.app.isAdminPage = true;
    this.app.AdminPageText = 'Home';
    this.GetProducts();
    this.GetCategories();
  }
  ShowCategories() {
    this.app.ShowProductDiv = false;
  }
  ShowProducts() {

    this.app.ShowProductDiv = true;
  }

  GetShowProductValue() {
    return this.app.ShowProductDiv;
  }

  GetProducts() {
    this.employeeservice.GetAllProducts({}).subscribe(
      (data) => {
        if (data != null) {
          this.ProductList = data.data;
        }
      },
      (error) => {
        if (error.status == 401) {
          localStorage.setItem('IsLoggedIn', 'false');
          window.location.href = '/login';
        }
        else
          window.alert(error.error.error);
      })
  }
  GetCategories() {
    this.employeeservice.GetAllCategories({}).subscribe(
      (data) => {
        if (data != null) {
          this.CategoryList = data.data;
        }
      },
      (error) => {
        if (error.status == 401) {
          localStorage.setItem('IsLoggedIn', 'false');
          window.location.href = '/login';
        }
        else
          window.alert(error.error.error);

      }
    )
  }

  productForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    categoryId: new FormControl('', Validators.required),
    Title: new FormControl('', Validators.required),
    UnitPrice: new FormControl(0, Validators.required),
    AvailableQuantity: new FormControl(0, Validators.required)
  });

  get f() {
    return this.productForm.controls;
  }

  AddProduct() {
    this.employeeservice.AddProduct(this.productForm.value).subscribe(result => {
      this.GetProducts();
      this.ClearProductForm();
    },
      (error) => {
        if (error.status == 401) {
          window.location.href = '/login';
        }
        else
          window.alert(error.error.error);
      })
  }

  editProduct(data: any) {
    if (data) {
      this.productForm.controls['id'].setValue(data.id);
      this.productForm.controls['Title'].setValue(data.title);
      this.productForm.controls['categoryId'].setValue(data.categoryId);
      this.productForm.controls['UnitPrice'].setValue(data.unitPrice);
      this.productForm.controls['AvailableQuantity'].setValue(data.availableQuantity);
    }
  }

  updateProduct() {
    this.employeeservice.EditProduct(this.productForm.value).subscribe(result => {
      this.GetProducts();
      this.ClearProductForm();
    },
      (error) => {
        if (error.status == 401) {
          window.location.href = '/login';
        }
        else
          window.alert(error.error.error);
      })
  }

  ClearProductForm() {
    this.productForm.controls['id'].setValue(0);
    this.productForm.controls['Title'].setValue('');
    this.productForm.controls['categoryId'].setValue(0);
    this.productForm.controls['UnitPrice'].setValue(0);
    this.productForm.controls['AvailableQuantity'].setValue(0);
    this.productForm.markAsUntouched();
  }

  deleteProduct(data: any) {
    this.employeeservice.DeleteProduct(data).subscribe(result => {
      this.GetProducts();
    },
      (error) => {
        if (error.status == 401) {
          window.location.href = '/login';
        }
        else
          window.alert(error.error.error);
      })
  }

  categoryForm = new FormGroup({
    id: new FormControl(0, Validators.required),
    Title: new FormControl('', Validators.required),
  });

  get c() {
    return this.categoryForm.controls;
  }

  AddCategory() {
    this.employeeservice.AddCategory(this.categoryForm.value).subscribe(result => {
      this.GetCategories();
      this.ClearCategoryForm();
    },
      (error) => {
        if (error.status == 401) {
          window.location.href = '/login';
        }
        else
          window.alert(error.error.error);
      })
  }

  editCategory(data: any) {
    if (data) {
      this.categoryForm.controls['id'].setValue(data.id);
      this.categoryForm.controls['Title'].setValue(data.title);
    }
  }

  updateCategory() {
    if (this.categoryForm.valid) {
      this.employeeservice.EditCategory(this.categoryForm.value).subscribe(result => {
        this.GetCategories();
        this.ClearCategoryForm();
      },
        (error) => {
          if (error.status == 401) {
            window.location.href = '/login';
          }
          else
            window.alert(error.error.error);
        })
    }
  }

  ClearCategoryForm() {
    this.categoryForm.controls['id'].setValue(0);
    this.categoryForm.controls['Title'].setValue('');
    this.categoryForm.markAsUntouched();
  }

  deleteCategory(data: any) {
    this.employeeservice.DeleteCategory(data).subscribe(result => {
      this.GetCategories();
    },
      (error) => {
        if (error.status == 401) {
          window.location.href = '/login';
        }
        else
          window.alert(error.error.error);
      })
  }

  changeWebsite(e) {
    //console.log(e.target.value);
  }
}
