import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink , FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {


  searchText='';

  ngOnInit(){
    this.getProduct();
  }

  constructor(private productService : ProductService) {}
 
  products :  any [] = [];
  
  getProduct(){
    const token = localStorage.getItem('token');
     if (!token) {
    console.log('Token not found');
    return;
  }
    this.productService.getProduct(token).subscribe({
      next : (response) =>{
        console.log(response);
        this.products = response.products;
      },
      error : (error) =>{
        console.log(error);
      }
    })
  }

  deleteProduct(id : any){
    const token = localStorage.getItem('token');
    if (!token) {
    console.log('Token not found');
    return;
  }
    // console.log(token);
    
    this.productService.deleteProduct(id , token).subscribe({
      next : (response) =>{
        console.log(response.message);
        this.getProduct();

      },
      error : (error)=>{
        console.log(error);
      }
    })
  }



  get filteredProducts(){
    const search = this.searchText.toLowerCase();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(search) ||
      product.sku.toLowerCase().includes(search)
    )
  }




 
}