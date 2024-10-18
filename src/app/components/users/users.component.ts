import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Pessoa } from '../../modelo/Pessoa';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-componente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})

export class UsersComponent {
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    idade: new FormControl(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(120),
    ]),
    cidade: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  btnCdastrar: boolean = true;

  vetor: Pessoa[] = [];
  indice: number = -1;

  cadastrar() {
    this.vetor.push(this.formulario.value as Pessoa);
    this.formulario.reset();
  }

  selecionar(indice: number) {
    this.indice = indice;
    this.formulario.setValue({
      nome: this.vetor[indice].nome,
      idade: this.vetor[indice].idade,
      cidade: this.vetor[indice].cidade,
    });

    this.btnCdastrar = false;
  }

  alterar() {
    this.vetor[this.indice] = this.formulario.value as Pessoa;
    this.formulario.reset();
    this.btnCdastrar = true;
  }

  remover() {
    this.vetor.splice(this.indice, 1);
    this.formulario.reset();
    this.btnCdastrar = true;
  }

  cancelar() {
    this.formulario.reset();
    this.btnCdastrar = true;
  }
}
