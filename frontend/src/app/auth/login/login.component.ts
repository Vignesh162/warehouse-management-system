import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../interfaces/login';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from '../../interfaces/login-response';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  /**
* Stores the login credentials entered by the user.
*/
  loginData: Login = {
    username: '',
    password: ''
  }
  /**
   * Creates an instance of LoginComponent.
   * Initializes the services required for user authentication,
   * navigation, and notification messages.
   *
   * @param _router Handles application navigation.
   * @param _loginServices Handles login API requests.
   * @param _toastr Displays success and error messages.
   */
  constructor(private router: Router, private loginServices: AuthService, private toastr: ToastrService) { }

  /**
   * Logs in the user using the entered username and password.
   * Stores the authentication token and navigates to the dashboard
   * when the login request is successful.
   *
   * @return void.
   */
  postLogin() {
    if (this.loginData.username === '' && this.loginData.password === '') {
      this.toastr.error('All Filleds are Required');

      return;
    }
    //  * Sends the login credentials to the authentication service.
    this.loginServices.postLogin(this.loginData).subscribe({
      next: (response: HttpResponse<LoginResponse>) => {
        if (response.status === 200) {
          console.log(response);
          localStorage.setItem('token', response.body!.token)
          this.toastr.success('Welcome Back!!');

          this.router.navigate(['/dashboard']);

        }
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Error try again!!');
      }
    })


  }
}
