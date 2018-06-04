import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {  OffreService } from "../offre.service";
import{ FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
@Component({
  selector: 'app-propose',
  templateUrl: './propose.component.html',
  styleUrls: ['./propose.component.css']
})
export class ProposeComponent implements OnInit {

  form;



  constructor(private formBuilder: FormBuilder, private auth: AuthService,  private offre: OffreService, private router:Router) {
    this.form = formBuilder.group({
      username: [this.auth.username],
      entreprise: ['', Validators.required],
      ville: ['', Validators.required],
      date:['',Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required],
      poste: ['', Validators.required],
      description: ['', Validators.required],
    })
   }

  ngOnInit() {
  }

  addOffre() {
    this.offre.postOffre(this.form.value, this.auth.username).subscribe(res => {
      this.offre.offres.unshift(res);
      this.offre.myOffres.unshift(res);
      this.router.navigate(['/search']);
    });
  }
}
