import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey = 'users';

  constructor() { }

  register(user: { name: string, lastName: string, email: string, password: string }): boolean {
    const users = this.getUsers();
    if (users.some(u => u.email === user.email)) {
      return false; // User already exists
    }
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return true;
  }

  login(credentials: { email: string, password: string }): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  private getUsers(): any[] {
    const users = localStorage.getItem(this.storageKey);
    return users ? JSON.parse(users) : [];
  }
}
