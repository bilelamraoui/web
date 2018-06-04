import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { AuthService } from './auth.service';
@Injectable()
export class OffreService {
  BASE_URL = 'http://localhost:3000/api/';

  selectedOffre;


  offres: any[];
  myOffres: any[];

  constructor(private auth: AuthService, private http: HttpClient) {
    this.getOffre().subscribe(res => this.offres = res);
    this.getMyOffres(this.auth.username).subscribe(res => this.myOffres = res);
  }

  getOffre(): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL + 'offres').pipe();
  }

  getMyOffres(username): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL + 'offres/' + username).pipe();

  }

  removeMyOffres(username) {
    this.http.delete(this.BASE_URL + 'offres/delete/' + username).subscribe(res => {
      if (this.offres) {
        for (let i = 0; i < this.offres.length; i++) {
          if (this.offres[i].username === res['username']) {
            this.offres.splice(i, 1);
          }

        }
      }
      if (this.myOffres) {
        for (let i = 0; i < this.myOffres.length; i++) {
          if (this.myOffres[i].username === res['username']) {
            this.myOffres.splice(i, 1);
          }

        }
      }
    });
  }

  postOffre(offre, username) {
    if (!offre) return;
    return this.http.post(this.BASE_URL + 'offres/add/' + username, offre);
  }

  editOffre(offreData) {
    return this.http.put(this.BASE_URL + 'offres/edit', offreData);
  }


  edit1Offre(offreId) {
    return this.http.get(this.BASE_URL + 'offres/edit/' + offreId);
  }
}