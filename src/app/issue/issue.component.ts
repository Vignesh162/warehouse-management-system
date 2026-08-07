import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-issue',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './issue.component.html',
  styleUrl: './issue.component.css'
})
export class IssueComponent {

  issueData = {
    productName: '',
    sku: '',
    quantity: 0,
    department: '',
    rackLocation: '',
    date: '',
    remark : ''
  };

  issueProduct() {
    console.log(this.issueData);
  }
}