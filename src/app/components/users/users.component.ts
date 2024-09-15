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
  // Objeto de formulário

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    idade: new FormControl(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(120),
    ]),
    cidade: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  // Visibilidade dos botões
  btnCdastrar: boolean = true;

  // Vetor
  vetor: Pessoa[] = [];

  // Armazenar índice da pessoa selecionada
  indice: number = -1;

  // Função de cadastro
  cadastrar() {
    // Cadastro no vetor
    this.vetor.push(this.formulario.value as Pessoa);

    // Limpeza dos inputs
    this.formulario.reset();
  }

  // Função de seleção
  selecionar(indice: number) {
    // Atribuir o índice da pessoa
    this.indice = indice;
    this.formulario.setValue({
      nome: this.vetor[indice].nome,
      idade: this.vetor[indice].idade,
      cidade: this.vetor[indice].cidade,
    });

    // Visibilidade dos botões
    this.btnCdastrar = false;
  }

  // Função de alteração
  alterar() {
    this.vetor[this.indice] = this.formulario.value as Pessoa;
    this.formulario.reset();
    this.btnCdastrar = true;
  }

  // Função de remoção
  remover() {
    this.vetor.splice(this.indice, 1);
    this.formulario.reset();
    this.btnCdastrar = true;
  }

  // Função para cancelar
  cancelar() {
    this.formulario.reset();
    this.btnCdastrar = true;
  }
}
