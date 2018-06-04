import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { AuthService } from '../auth.service';
import { OffreService } from '../offre.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-proposition',
  templateUrl: './user-proposition.component.html',
  styleUrls: ['./user-proposition.component.css']
})
export class UserPropositionComponent implements OnInit {

  offre: string = '' ;
  offreData = {
    entreprise: '',
    ville: '',
    email: '',
    tel: '',
    poste: '',
    description:'',
  };

  constructor(private auth: AuthService, private offreService: OffreService,private router:Router) {

  }

  ngOnInit() {
    this.offreService.getOffre().subscribe(res =>{
      this.offreData.entreprise = res['entreprise'];
      this.offreData.ville = res['ville'];
      this.offreData.email = res['email'];
      this.offreData.tel = res['tel'];
      this.offreData.poste = res['poste'];
      this.offreData.description = res['description'];
    });
  }

  getOffre(offre) {
    this.offre = offre;
  }
  editOffre() {
    this.offreService.editOffre(this.offreData);
    console.log("fait")
    this.router.navigate(['/offreedit']);
  };

  onSelect(offre) {
    this.offreService.selectedOffre = offre;
  }
}

