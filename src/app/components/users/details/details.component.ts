import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { UserService } from '../user.service';
import { Livro } from '../../../model/Livro';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatProgressSpinnerModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatNativeDateModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  formulario: FormGroup;
  livroId: string = '';
  isSubmitting = false;
  mensagem: string = '';
  sucesso: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      dt_publicacao: ['', Validators.required],
      autor: ['', [Validators.required, Validators.minLength(3)]],
      genero: ['', [Validators.required, Validators.minLength(3)]],
      editora: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    if (history.state.livro) {
      const livro = history.state.livro as Livro;
      this.preencherFormulario(livro);
    } else {
      this.livroId = this.route.snapshot.paramMap.get('id')!;
      if (this.livroId) {
        this.buscarLivro();
      }
    }
  }

  buscarLivro() {
    if (this.livroId) {
      this.userService.buscarLivro(this.livroId).subscribe(
        (data: Livro) => this.preencherFormulario(data),
        (error) => {
          console.error('Erro ao buscar o livro', error);
        }
      );
    }
  }

  preencherFormulario(livro: Livro) {
    this.formulario.patchValue({
      nome: livro.nome,
      dt_publicacao: livro.dt_publicacao,
      autor: livro.autor,
      genero: livro.genero,
      editora: livro.editora
    });
  }

  editar() {
    if (this.formulario.valid) {
      this.isSubmitting = true;
      const livroAtualizado: Livro = { ...this.formulario.value, id: this.livroId };
  
      this.userService.editar(livroAtualizado, this.livroId).subscribe({
        next: (response) => {
          this.snackBar.open('Livro atualizado com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        error: (error) => {
          console.error('Erro ao atualizar livro', error);
          this.snackBar.open('Erro ao atualizar livro. Tente novamente.', 'Fechar', {
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
