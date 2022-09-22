import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  product: Product = {
    id:'',
    CategoryId: '',
    ProductName: '',
    CategoryName: '',
  };
  submitted = false;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    const data = {
      CategoryId: this.product.CategoryId,
      ProductName: this.product.ProductName,
      CategoryName:this.product.CategoryName,
      
    };

    this.productService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newTutorial(): void {
    this.submitted = false;
    this.product = {
      id:'',
      CategoryId: '',
      ProductName: '',
      CategoryName: '',
    };
  }

}
