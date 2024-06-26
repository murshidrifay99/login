import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import md5 from 'md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, md5(this.password)).subscribe(success => {
      if (success) {
        this.router.navigate(['/dashboard']); // Redirect to dashboard
      } else {
        alert('Invalid username or password');
      }
    });
  }
}
