import { Component } from '@angular/core';
import { TransationService } from '../services/transation.service';
// import { TransactionResponse } from '../interfaces/product';
import { Transaction, TransactionHistory } from '../interfaces/transation';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {

    /**
   * Initializes the transactions component.
   * Fetches the transaction history when the component is loaded.
   * @return {void} Does not return a value.
   */
  ngOnInit(){
    this.getTransations();
  }
     // Stores the list of transactions received from the backend.

  transactions : Transaction []= [];
  constructor(private transationService : TransationService){}

    /**
   * Fetches the transaction history from the backend.
   * Retrieves the authentication token from local storage and updates the transaction list with the API response.
   * @return {void} Does not return a value.
   */
  getTransations(){
    const token : string | null = localStorage.getItem('token');
     if (!token) {
    console.log('Token not found');
      return;
    }
    this.transationService.getTransaction(token).subscribe({
      next : (response : TransactionHistory)=>{
        this.transactions = response.transactions;
        // console.log(response);
      },
      error : (error : unknown)=>{
        console.log(error);
        
      }
    })

  }
}