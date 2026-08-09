import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TransationService } from '../services/transation.service';
import { ProductResponse, TransactionData, TransactionResponse } from '../interfaces/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recive',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recive.component.html',
  styleUrl: './recive.component.css'
})  
export class ReciveComponent {

  //  * Stores the ID of the selected product.
  productId: string = '';

  //  * Stores the transaction details entered in the form.
  FormData: TransactionData = {
    transactionType: '',
    remarks: '',
    quantity: ''
  };

  //  * Stores the details of the selected product.
  product: ProductResponse = {
    _id: '',
    name: '',
    sku: '',
    category: '',
    quantity: 0,
    rackLocation: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    createdBy: ''
  };

  constructor(private transsationServices: TransationService, private router: Router, private routeActive: ActivatedRoute, private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.productId = this.routeActive.snapshot.paramMap.get('id') || '';

    if (this.productId) {
      this.getSingleProduct();
    }
  }

  /**
   * Fetches the selected product details using the product ID.
   * Assigns the API response to the product object.
   *
   * @return void.
   */
  getSingleProduct(): void {
    const token: string | null = localStorage.getItem('token');
    if (!token) {
      console.log('Token not found');
      this.toastr.error('Token not found');
      return;
    }

    this.transsationServices.getSingleProduct(this.productId, token).subscribe({
      next: (response: ProductResponse) => {
        this.product = response;
        console.log(response);
      },
      error: (error: unknown) => {
        console.log(error);
      }
    });
  }

  /**
   * Creates a receive or issue transaction for the selected product.
   * Clears the transaction form and navigates to the transactions page
   * after a successful operation.
   *
   * @return void.
   */
  postOprationsProduct(): void {

    const token: string | null = localStorage.getItem('token');
    if (!token) {
      console.log('Token not found');
      return;
    }
    if (!this.FormData.transactionType || !this.FormData.remarks || !this.FormData.quantity) {
      this.toastr.error('All fields are required.');
      return;
    }

    this.transsationServices.postOprationProduct(this.productId, this.FormData, token).subscribe({
      next: (response: TransactionResponse) => {
        // console.log(response);
        this.FormData = {
          transactionType: '',
          remarks: '',
          quantity: ''
        };
        this.router.navigate(['/transactions']);
      },
      error: (error: unknown) => {
        this.toastr.error('Enter quantity properly');
        console.log(error);
      }
    });
  }
}