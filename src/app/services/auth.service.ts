import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

// No necesito importarlo por que ya esta definido de forma global
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';

  // apikey lo sacamos de firebase en configuración del proyecto
  private apikey = 'AIzaSyCuqrRMmcKAQEIXWVWFDaaG6_aoao6mgUM';

   // Crear nuevo usuario lo sacamos de la documetación de api firebase  
   // en este link https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
  /* https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY] */

  // Iniciar seccion
  /* https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY] */

  constructor( private http: HttpClient ) {}


  logout() {

  }

  login( usario: UsuarioModel) {

  }

  nuevoUsuario( usuario: UsuarioModel ) {

  }



}
