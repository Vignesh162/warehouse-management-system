import { Component } from '@angular/core';
import { TransationService } from '../services/transation.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {

  ngOnInit(){
    this.getTransations();
  }

  transactions :any []= [];
  constructor(private transationService : TransationService){}
  getTransations(){
    const token = localStorage.getItem('token');
     if (!token) {
    console.log('Token not found');
      return;
    }
    this.transationService.getTransaction(token).subscribe({
      next : (response)=>{
        this.transactions = response.transactions;
        console.log(response);
      },
      error : (error)=>{
        console.log(error);
        
      }
    })

  }
}