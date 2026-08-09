import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Register } from '../../interfaces/register';
import { AuthService } from '../../services/auth.service';
import { RegisterResponse } from '../../interfaces/register-response';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  // Stores the user registration details.
  registerData: Register = {
    name: '',
    username: '',
    password: ''
  }

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  /**
  * Registers a new user using the entered registration details.
  * Stores the token and navigates to the dashboard after successful registration.
  *
  * @return void.
  */
  register(): void {
    this.authService.postRegister(this.registerData).subscribe({
      next: (response: HttpResponse<RegisterResponse>) => {
        // Handle successful registration.
        if (response.status === 201) {
          console.log(response);
          localStorage.setItem('token', response.body!.token)
          this.toastr.success('Register Successfully');
          this.router.navigate(['/dashboard'])
        }
      },
      // Handle registration API errors.
      error: (error) => {
        console.log(error);
        this.toastr.error('Register Failed try again!');
      }
    })
  }

}
