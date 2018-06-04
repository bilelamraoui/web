import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import{FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

form;



  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
    this.form = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
   }

  ngOnInit() {
  }

  addUser() {
    this.auth.register(this.form.value);
  }

}
