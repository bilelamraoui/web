import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { OffreService } from './offre.service';
import { TokenInterceptor } from './token.interceptor';
import { AppComponent } from './app.component';
import { HconnexxionComponent } from './hconnexxion/hconnexxion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { SearchComponent } from './search/search.component';
import { ProposeComponent } from './propose/propose.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserPropositionComponent } from './user-proposition/user-proposition.component';
import { UserService } from './user.service';
import { OffreEditComponent } from './offre-edit/offre-edit.component';
import { JobFilterPipe } from './job-filter.pipe';
const routes: Routes = [
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },
  { path: 'connexion', 
  component: HconnexxionComponent 
},
{ path: 'inscription', 
component: InscriptionComponent 
},
{ path: 'search', 
component:SearchComponent
},
{ path: 'propose', 
component:ProposeComponent
},
{ path: 'useredit', 
component:UserEditComponent 

},
{ path: 'myProposition', 
component:UserPropositionComponent

},
{ path: 'offreedit', 
component: OffreEditComponent

},


];

@NgModule({
  declarations: [
    AppComponent,
    HconnexxionComponent,
    InscriptionComponent,
    SearchComponent,
    ProposeComponent,
    UserEditComponent,
    UserPropositionComponent,
    OffreEditComponent,
    JobFilterPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ 
    AuthService,
    OffreService, 
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true

    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
