import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  username: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private loggingOut = false;

  // Credentials configuration
  private readonly credentials = {
    admin: { username: 'admin', password: 'admin', role: 'admin' as const },
    admin2: { username: '2', password: '2', role: 'admin' as const },
    user: { username: 'user', password: 'user', role: 'user' as const },
    user2: { username: '1', password: '1', role: 'user' as const },
  };

  constructor() {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string, role: 'admin' | 'user'): boolean {
    // Validate credentials against configured values by iterating through all credentials
    for (const key in this.credentials) {
      const credential = this.credentials[key as keyof typeof this.credentials];
      if (
        role === credential.role &&
        username === credential.username &&
        password === credential.password
      ) {
        const user: User = { username, role };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return true;
      }
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }

  isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }

  isUser(): boolean {
    return this.currentUserValue?.role === 'user';
  }

  hasRole(role: 'admin' | 'user'): boolean {
    return this.currentUserValue?.role === role;
  }

  isLoggingOut(): boolean {
    return this.loggingOut;
  }
}
