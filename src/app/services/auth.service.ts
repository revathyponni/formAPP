import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/field';

/**
 * Authentication service for managing user login and roles.
 */
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
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Login method to authenticate user.
   * @param username - The username of the user.
   * @param password - The password of the user.
   * @param role - The role of the user.
   * @returns True if login is successful, false otherwise.
   */
  login(username: string, password: string, role: 'admin' | 'user'): boolean {
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

  /**
   * Logout method to terminate user session.
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  /**
   * Check if user is logged in.
   * @returns True if user is logged in, false otherwise.
   */
  isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }

  /**
   * Check if user has admin role.
   * @returns True if user is admin, false otherwise.
   */
  isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }

  /**
   * Check if user has user role.
   * @returns True if user is user, false otherwise.
   */
  isUser(): boolean {
    return this.currentUserValue?.role === 'user';
  }

  /**
   * Check if user has specific role.
   * @param role - The role to check.
   * @returns True if user has the specified role, false otherwise.
   */
  hasRole(role: 'admin' | 'user'): boolean {
    return this.currentUserValue?.role === role;
  }

  /**
   * Check if user is logging out.
   * @returns True if user is logging out, false otherwise.
   */
  isLoggingOut(): boolean {
    return this.loggingOut;
  }
}
