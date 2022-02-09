import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor() { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();

    this.usuario.email = "alejotoro94@hotmail.com";

  }

  OnSubmit() {
    console.log("formulario enviado");
    console.log(this.usuario);
  }


}
