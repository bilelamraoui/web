import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-hconnexxion',
  templateUrl: './hconnexxion.component.html',
  styleUrls: ['./hconnexxion.component.css']
})
export class HconnexxionComponent implements OnInit {

  userData = {
    email: '',
    password: ''
  }

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  logInUser() {
    this.auth.logIn(this.userData);
  }

}



