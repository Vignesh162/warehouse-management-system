import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { postProductResponseData, Product, ProductResponse } from '../../interfaces/product';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  // * Stores the product details entered in the form.

  product: Product = {
    name: '',
    sku: '',
    category: '',
    quantity: 0,
    rackLocation: '',
    description: ''
  };

  //store the product id for fetching the data and passed in getsingleproduct function
  productId: string = '';

  // condition button to for ADD and Edit button of form
  submitButton(): void {
    if (this.productId) {
      this.updateProduct();
      this.productId = ''
    } else {
      this.postProduct();
    }

  }

  //  * Stores the product ID used for editing an existing product.
  constructor(private productService: ProductService, private router: Router, private routeActive: ActivatedRoute, private toastr: ToastrService) { }


  /**
   * Determines whether to add a new product or update an existing product.
   * Uses the product ID to identify the current form mode.
   *
   * @return void.
   */

  ngOnInit(): void {
    this.productId = this.routeActive.snapshot.paramMap.get('id') || '';
    console.log(this.productId);

    if (this.productId) {
      this.getSingleProduct();
    }
  }
  //  * Fetches the product details using the product ID.
  //  * The retrieved details are assigned to the product form for editing.
  getSingleProduct(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token not found');

      return;
    }

    this.productService.getSingleProduct(this.productId, token).subscribe({
      next: (response: ProductResponse) => {
        this.product = {
          name: response.name,
          sku: response.sku,
          category: response.category,
          quantity: response.quantity,
          rackLocation: response.rackLocation,
          description: response.description
        };
        console.log(response);

      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  // * Adds a new product using the details entered in the form.
  //  * Clears the form and navigates to the products page after successful creation.
  postProduct() {
    const token: string | null = localStorage.getItem('token');
    if (!token) {
      this.toastr.error("Token not Found")
      return;
    }
    if (
      !this.product.name || !this.product.sku || !this.product.category || !this.product.quantity || !this.product.rackLocation || !this.product.description) {
      this.toastr.error('All fields are required.');
      return;
    }

    this.productService.postProduct(this.product, token).subscribe({
      next: (response: HttpResponse<postProductResponseData>) => {
        // console.log(response);
        this.product = {
          name: '',
          sku: '',
          category: '',
          quantity: 0,
          rackLocation: '',
          description: ''
        };
        if (response.status === 201) {
          this.toastr.success('Product Added Successfully ');
          this.router.navigate(['/products']);
        }

      },
      error: (error: unknown) => {
        console.log(error);
      }
    })
  }


  //  * Updates an existing product using the product ID and form data.
  //  * Navigates to the products page after successful update.
  updateProduct(): void {
    const token: string | null = localStorage.getItem('token');

    if (!token) {
      this.toastr.error('Token not Found');
      return;
    }


    this.productService.updateProduct(this.productId, this.product, token).subscribe({
      next: (response: HttpResponse<Product>) => {
        console.log(response);

        if (response.status === 200) {
          this.toastr.success('Product Added Successfully ');
          this.router.navigate(['/products']);
        }
      },

      error: (error: unknown) => {
        console.log(error);
      }
    });
  }


}