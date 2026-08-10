import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { HttpResponse } from '@angular/common/http';

import { ProductService } from '../../services/product.service';
import { ProductList, ProductResponse } from '../../interfaces/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
   
  searchText: string = '';

  // Stores the products retrieved from the API
  products: ProductResponse[] = [];

  constructor(
    private productService: ProductService , private toastr: ToastrService
  ) { }

  /**
   * Initializes the product list component.
   * Fetches the available products when the component is loaded.
   */
  ngOnInit(): void {
    this.getProduct();
  }
 
  /**
   * Fetches the product list from the API.
   * Uses the stored authentication token.
   */
  getProduct(): void {
    const token: string | null = localStorage.getItem('token');
    if (!token) {
      console.log('Token not found');
      return;
    }
    this.productService.getProduct(token).subscribe({
      next: (response: ProductList) => {
      console.log(response);
      this.products = response.products;
      console.log('This is inside');
      console.log('Products:', this.products);
    },
    error: (error: unknown) => {
        console.log(error);
      }
    });
  }


  /**
   * Deletes a product using the product ID.
   */
  deleteProduct(id: string): void {
    const token: string | null = localStorage.getItem('token');
    if (!token) {
      console.log('Token not found');
      return;
    }

    this.productService.deleteProduct(id, token).subscribe({
        next: (response) => {
          console.log(response.message);
          // Refresh product list
          this.toastr.success('Product Deleted Successfully');
          this.getProduct();
        },
        error: (error: unknown) => {
          console.log(error);
        }
      });
  }

  
  
  
  
  /**
 * Filters products by name or SKU.
 *
 * @return Filtered product list.
 */
get filteredProducts(): ProductResponse[] {
  const search: string = this.searchText.trim().toLowerCase();

  if (!search) {
    return this.products;
  }

  return this.products.filter((product: ProductResponse) => product.name.toLowerCase().includes(search) || product.sku.toLowerCase().includes(search));
}

}