// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = 'assets/users.json';

  constructor(private http: HttpClient, private router: Router) {
    // Check if currentUser is present in localStorage on service initialization
    if (this.getCurrentUser() !== null) {
      // Redirect to dashboard if currentUser is present
      this.router.navigate(['/dashboard']);
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          // Get only the name of the user and store in localStorage as currentUser
          localStorage.setItem('currentUser', JSON.stringify({ name: user.name }));
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

    getCurrentUser(): any {
      return JSON.parse(localStorage.getItem('currentUser') ?? 'null');
    }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }


}
