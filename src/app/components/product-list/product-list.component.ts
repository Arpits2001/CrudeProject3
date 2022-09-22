import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  products: Product[] = [];
  currentProduct: Product = {
    id:undefined
  };
  currentIndex = -1;
  ProductName = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`ProductName`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.ProductName, this.page, this.pageSize);

    this.productService.getAll(params)
      .subscribe({
        next: (data) => {
          const { products, totalItems } = data;
          this.products = products;
          this.count = totalItems;
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveTutorials();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentProduct = {
      id:undefined
    };
    this.currentIndex = -1;
  }

  setActiveTutorial(product: Product, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.productService.deleteAll()
      .subscribe({
        next: res => {
          console.log(res);
          this.refreshList();
        },
        error: err => {
          console.log(err);
        }
      });

  }

  searchTitle(): void {
    this.page = 1;
    this.retrieveTutorials();
  }

}
