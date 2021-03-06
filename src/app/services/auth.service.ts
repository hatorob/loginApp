import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators'

// No necesito importarlo por que ya esta definido de forma global
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';

  // apikey lo sacamos de firebase en configuración del proyecto
  private apikey = 'AIzaSyCuqrRMmcKAQEIXWVWFDaaG6_aoao6mgUM';

  userToken: string;

   // Crear nuevo usuario lo sacamos de la documetación de api firebase  
   // en este link https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
  /* https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY] */

  // Iniciar seccion
  /* https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY] */

  constructor( private http: HttpClient ) {
    this.leerToken();
  }


  logout() {
    localStorage.removeItem('token');
  }

  login( usuario: UsuarioModel) {

    const authData = {
      /* email: usuario.email,
      password: usuario.password,  */  //puedo resumir estas propiedades que vienen de usuario con  ...usuario
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map( resp => {
        console.log("entro en el mapa del RXJS");
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );

  }

  nuevoUsuario( usuario: UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.apikey}`,
      authData
    ).pipe(
      map( resp => {
        console.log("entro en el mapa del RXJS");
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );

  }

  private guardarToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString());


  }

  leerToken() {
    if( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {

    if( this.userToken.length < 2 ) {
      return false;
    }
    const expira = Number(localStorage.getItem('expira'));
    console.log("expira:",expira)
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    console.log("expiraDate",expiraDate);

    if( expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }   
    
  }

}
