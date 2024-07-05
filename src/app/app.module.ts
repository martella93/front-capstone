import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FavoritiComponent } from './components/favoriti/favoriti.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';
import { EsperienzaComponent } from './components/esperienza/esperienza.component';
import { EsperienzaDetailsComponent } from './components/esperienza-details/esperienza-details.component';
import { GuidaComponent } from './components/guida/guida.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreaEsperienzaComponent } from './components/crea-esperienza/crea-esperienza.component';
import { ModificaEsperienzaComponent } from './components/modifica-esperienza/modifica-esperienza.component';
import { PrenotazioniComponent } from './components/prenotazioni/prenotazioni.component';
import { ProfiloComponent } from './components/profilo/profilo.component';
import { PrivateChatComponent } from './components/private-chat/private-chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { CommunityComponent } from './components/community/community.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';


const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path:'signup', component: SignupComponent },
  { path: 'dettaglio-esperienza/:id', component: EsperienzaDetailsComponent },
  { path: 'favoriti', component: FavoritiComponent },
  { path: 'guida/:id', component: GuidaComponent},
  { path: 'profilo', component: ProfiloComponent},
  { path: 'crea-esperienza', component: CreaEsperienzaComponent},
  { path: 'modifica-esperienza', component: ModificaEsperienzaComponent},
  { path: 'prenotazioni', component: PrenotazioniComponent},
  { path: 'community', component: CommunityComponent},
  { path: 'private-chat', component: PrivateChatComponent },
  
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritiComponent,
    LoginComponent,
    SignupComponent,
    EsperienzaComponent,
    EsperienzaDetailsComponent,
    GuidaComponent,
    NavbarComponent,
    CreaEsperienzaComponent,
    ModificaEsperienzaComponent,
    PrenotazioniComponent,
    ProfiloComponent,
    FooterComponent,
    ChatComponent,
    CommunityComponent,
    PrivateChatComponent,
    JumbotronComponent
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    RouterModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }