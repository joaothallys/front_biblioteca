import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UserService } from '../user.service';
import { Livro } from '../../../model/Livro';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  formulario: FormGroup;
  sucesso: boolean = false;
  mensagem: string = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      dt_publicacao: ['', Validators.required],
      autor: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      genero: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      editora: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]]
    });
  }

  ngOnInit(): void {}
  cadastrarLivro() {
    if (this.formulario.valid) {
      this.isSubmitting = true;
      const livro: Livro = this.formulario.value;
      
      this.userService.cadastrar(livro).subscribe({
        next: (response) => {
          this.snackBar.open('Livro cadastrado com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });          
        },
        error: (error) => {
          this.snackBar.open('Erro ao cadastrar livro. Tente novamente.', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
          setTimeout(() => {
            this.voltarParaLista();
          }, 2000);
        }
      });
    }
  }
  

  voltarParaLista() {
    this.router.navigate(['/list']);
  }
}
