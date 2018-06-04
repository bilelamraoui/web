import { Component, OnInit } from '@angular/core';
import{FormBuilder, Validators} from '@angular/forms'
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userData = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: ''
  };

  form;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private user: UserService) {
    /*this.form = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });*/
   }

  ngOnInit() {
    this.user.getUser(this.auth.username).subscribe(res =>{
      this.userData.firstName = res['firstName'];
      this.userData.lastName = res['lastName'];
      this.userData.userName = res['userName'];
      this.userData.email = res['email'];
      this.userData.password = res['password'];
    });
  }

  editUser() {
    this.user.editUser(this.userData);
  };
}