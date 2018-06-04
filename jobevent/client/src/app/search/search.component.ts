import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { OffreService } from '../offre.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  offres = [];

  ville = '';
  poste = '';

  constructor(private auth: AuthService, private offreService: OffreService) {

   }

  ngOnInit() {

    this.offreService.getOffre().subscribe(res => {
      this.offres = res;
      console.log(this.offres);
    });

  }

}
