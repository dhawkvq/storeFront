import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fakeProduct } from 'src/utils/fakeProduct';
import { Product } from 'src/types/Product';
import { ProductsService, ShoppingCartService } from 'src/app/services';
import { IconOptions } from 'src/app/components/icon-button/icon-button.component';
import { Classes } from 'src/types/Classes';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product = fakeProduct;

  quantity: number = 1;

  lightIcon = false;

  iconOption = IconOptions.ADD;

  currentClasses: Classes = {};

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.product = this.productsService.getProductById(+id);
    }
  }

  setQuantity(event: any) {
    this.quantity = +event.target?.value ?? 1;
  }

  addProductToCart() {
    this.updateClasses({ productAddedToCart: true });
    this.cartService.addItemToCart({
      ...this.product,
      quantity: this.quantity,
    });

    this.quantity = 1;
  }

  updateClasses(classes: Classes = {}) {
    this.currentClasses = classes;
    const keys = Object.keys(classes);
    if (!!keys.length) {
      setTimeout(() => {
        this.updateClasses();
      }, 1000);
    }
  }
}
