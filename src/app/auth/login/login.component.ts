import { Component } from '@angular/core';
import { Router , RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../interfaces/login';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink , FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    loginData : Login = {
      username : '',
      password : ''
    }

    constructor(private router : Router , private loginServices : AuthService ){}


    postLogin(){
      this.loginServices.postLogin(this.loginData).subscribe({
        next : (response : any) =>{
          if(response.status === 200){
            console.log(response);
            localStorage.setItem('token', response.body.token)
            this.router.navigate(['/dashboard']);
          }
        },
        error : (error)=>{
          console.log(error);
          
        }
      })


    }
}
