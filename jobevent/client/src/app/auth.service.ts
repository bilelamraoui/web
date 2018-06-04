import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tokenKey } from '@angular/core/src/view';
@Injectable()
export class AuthService {
  BASE_URL = 'http://localhost:3000/api/';
  token_key = 'token';
  username_key = 'username';
  userId_key = 'id';
  constructor(private http:HttpClient, private router:Router) { }

  get isAuthenticated() {
    return !!localStorage.getItem(this.token_key);
  }
  
  get token() {
    return localStorage.getItem(this.token_key);
  }
  get username() {
    return localStorage.getItem(this.username_key);
  }
  register(user) {
    this.http.post(this.BASE_URL + 'users/add', user).subscribe(res => {
      console.log(res);
      this.router.navigate(['/connexion']);
    });
  }

  logIn(userData) {
    this.http.post(this.BASE_URL + 'users/login', userData).subscribe(res => {
      this.authenticate(res);
    });
  }

  logOut() {
    localStorage.removeItem(this.token_key);
    localStorage.removeItem(this.username_key);
  }

  authenticate(res){
    let authResponse = res;
    
    if (!authResponse.token) {
      return;
    }
    localStorage.setItem(this.token_key, authResponse.token);
    localStorage.setItem(this.username_key, authResponse.username);
    
    this.router.navigate(['/search']);
  }

  deleteUser(userId_key) {
    this.http.delete('/users/'+userId_key)
      .subscribe(res => {
          this.router.navigate(['/searchoupropose']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
