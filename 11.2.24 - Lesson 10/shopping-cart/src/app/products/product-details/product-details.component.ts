import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() productId?: number;
  @Input() isProductInCart?: boolean;
  @Output() addToCartEmitter = new EventEmitter();
  @Output() removeFromCartEmitter = new EventEmitter();

  selectedProduct?: Product;

  constructor(private productService: ProductService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productId'] && this.productId) {
      // Perform API call through service
      this.productService.getProductById(this.productId).subscribe({
        next: p => this.selectedProduct = p,
        error: e => {
          console.error(e);
          alert(e);
        }
      });
    }
  }

  addToCart(product: Product) {
    this.addToCartEmitter.emit(product);
  }

  removeFromCart(product: Product) {
    this.removeFromCartEmitter.emit(product);
  }
}
