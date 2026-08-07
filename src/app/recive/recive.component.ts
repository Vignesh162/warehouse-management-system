import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recive',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recive.component.html',
  styleUrl: './recive.component.css'
})
export class ReciveComponent {
    receiveData = {
    productName: '',
    sku: '',
    quantity: 0,
    supplier: '',
    rackLocation: '',
    date: '',
    remark : ''
  };

  receiveProduct() {
    console.log(this.receiveData);
  }
}
