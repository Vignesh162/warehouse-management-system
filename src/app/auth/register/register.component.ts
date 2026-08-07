import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Register } from '../../interfaces/register';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerData : Register = {
    name : '',
    username : '',
    password : ''
  }

  constructor(private router : Router , private authService : AuthService){}
  register(){
    this.authService.postRegister(this.registerData).subscribe({
      next : (response : any) =>{
        if(response.status === 201){
          console.log(response);
          localStorage.setItem('token' , response.body.token)
          this.router.navigate(['/dashboard'])
        }
      },
      error : (error)=>{
        console.log(error);
      }
    })
  }

}
