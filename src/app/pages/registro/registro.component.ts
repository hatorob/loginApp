import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';  //npm install sweetalert2@v9.11.0  --- esta version fue la que me sirvio

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( private auth: AuthService,
                private router: Router ) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();
  }

  OnSubmit( form: NgForm ) {

    if( form.invalid ) {  return;  }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario( this.usuario )
              .subscribe( resp => {
                console.log(resp);
                Swal.close();
                this.router.navigateByUrl('/home');
              }, (err) => {
                console.log(err.error.error.message);  //manejo de errores
                Swal.fire({
                  allowOutsideClick: false,
                  icon: 'error',
                  title: 'Error al autenticar',
                  text: err.error.error.message
                });
              });  // La primera vez puede crear un error, para esto toca reiniciar el servidor para que permita terminar de empaquetar las funciones

  }


}
