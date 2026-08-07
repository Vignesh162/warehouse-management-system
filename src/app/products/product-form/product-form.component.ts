import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  product = {  
    name: '',
    sku: '',
    category: '',
    quantity: 0,
    rackLocation: '',
    description: ''
  };

  productId = '';

  // condition button to for ADD and Edit button of form
  submitButton(){
    if(this.productId){
      this.updateProduct();
      this.productId=''
    }else{
      this.postProduct();
    }

  }

  constructor(private productService : ProductService , private router : Router , private routeActive : ActivatedRoute , private toastr : ToastrService){}

  ngOnInit(){
    this.productId = this.routeActive.snapshot.paramMap.get('id') || '';
    console.log(this.productId);

      if (this.productId) {
    this.getSingleProduct();
  }
  }
  //use for fething the single product and pass to update function
  getSingleProduct(){
    const token = localStorage.getItem('token');
    if(!token){
      return;
    }

    this.productService.getSingleProduct(this.productId  ,token).subscribe({
      next : (response) =>{
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
      error : (error)=>{
        console.log(error);    
      }
    })
  }
   

   postProduct(){
    const token = localStorage.getItem('token');
    this.productService.postProduct(this.product , token).subscribe({
      next : (response) =>{
        console.log(response);
        this.product = {
          name: '',
          sku: '',
          category: '',
          quantity: 0,
          rackLocation: '',
          description: ''
        };
        this.toastr.success('Product Added Successfully ');
      },
      error : (error)=>{
        console.log(error);
      }
    })
  }



 updateProduct() {
  const token = localStorage.getItem('token');

  if (!token) {
    return;
  }

  this.productService
    .updateProduct(
      this.productId,
      this.product,
      token
    )
    .subscribe({
      next: (response) => {
        console.log(response);

        this.router.navigate(['/products']);
      },

      error: (error) => {
        console.log(error);
      }
    });
}


}