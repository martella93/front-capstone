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
  { path: 'preferiti', component: FavoritiComponent}

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
    ProfiloComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  
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
