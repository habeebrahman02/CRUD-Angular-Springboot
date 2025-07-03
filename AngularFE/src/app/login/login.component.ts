import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };
  loginError = '';

  constructor(private userService: UserService, private router: Router) {}

onLogin() {
  this.userService.loginUser(this.user.email, this.user.password).subscribe(
    result => {
      if (result) {
        window.alert('Login Success ');
        this.router.navigate(['/users']);
      } else {
        this.loginError = 'Invalid email or password.';
      }
    },
    error => {
      this.loginError = 'Login failed. Please try again.';
    }
  );
}

  goToAddUser() {
    this.router.navigate(['/add-user']);
  }

  goToUserList() {
    this.router.navigate(['/users']);
  }
}
