import { Component } from '@angular/core';

import { DashboardResponse } from '../interfaces/dashboard';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

    // Stores dashboard statistics received from the backend.
  // Initially all values are set to 0.
  dashboardData: DashboardResponse = {
    totalProducts: 0,
    totalOrders: 0,
    issuedOrders: 0,
    receivedOrders: 0
  };

    // Inject ProductService to communicate with the backend API.

  constructor(
    private dashboardService: ProductService
  ) {}

   // Angular lifecycle method.
  // It runs automatically when the component is initialized.
  // Here, it calls getDashboard() to fetch dashboard data.
  ngOnInit(): void {
    this.getDashboard();
  }

   // Fetches dashboard statistics from the backend API.
  getDashboard(): void {

    const token: string | null = localStorage.getItem('token');

    if (!token) {
      console.log('Token not found');
      return;
    }

    this.dashboardService.getDashboardData(token).subscribe({
        next: (response: DashboardResponse) => {
          // console.log('Dashboard Response:', response);
          // Store the API response in dashboardData.
          this.dashboardData = response;
        },
        error: (error: unknown) => {
          console.log('Dashboard Error:', error);
        }
      });
  }
}