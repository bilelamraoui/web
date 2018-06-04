import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import{FormBuilder, Validators} from '@angular/forms'
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { OffreService } from '../offre.service';

@Component({
  selector: 'app-offre-edit',
  templateUrl: './offre-edit.component.html',
  styleUrls: ['./offre-edit.component.css']
})
export class OffreEditComponent implements OnInit {

  @Output() selectOffre = new EventEmitter<string>();

  offreData = {
    _id: '',
    entreprise: '',
    ville: '',
    email: '',
    tel: '',
    poste: '',
    description:'',
  };

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private user: UserService, private offreService: OffreService) { }

  ngOnInit() {
    this.offreService.getOffre().subscribe(res =>{
    });

    if (this.offreService.selectedOffre) {
      this.offreService.edit1Offre(this.offreService.selectedOffre['_id']).subscribe(res => {
        this.offreData._id = res['_id'];
        this.offreData.entreprise = res['entreprise'];
        this.offreData.ville = res['ville'];
        this.offreData.email = res['email'];
        this.offreData.tel = res['tel'];
        this.offreData.poste = res['poste'];
        this.offreData.description = res['description'];
      });
    }
  }
  
  editOffre() {
    this.offreService.editOffre(this.offreData).subscribe(res => {
      console.log(res);
    });
  };
}
