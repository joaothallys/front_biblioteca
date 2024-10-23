import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';


import { Livro } from '../../../model/Livro';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, MatCardModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  livros: Livro[] = [];
  displayedColumns: string[] = ['nome', 'dt_publicacao', 'autor', 'genero', 'editora', 'acoes'];
  modoExibicao: 'lista' | 'card' = 'lista';

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.buscarLivros();
  }

  buscarLivros() {
    this.userService.buscarTodos().subscribe(
      (data) => {
        this.livros = data;
        console.log('Livros carregados com sucesso', this.livros);
      },
      (error) => {
        this.snackBar.open('Erro ao buscar lista.', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }

  excluirLivro(id: string) {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.userService.excluir(id).subscribe(
        () => {
          console.log('Livro excluído com sucesso');
          this.buscarLivros();
        },
        (error) => {
          console.error('Erro ao excluir livro', error);
        }
      );
    }
  }

  irParaDetalhes(id: string) {
    this.router.navigate([`/details/${id}`]);
  }

  alternarModoExibicao() {
    this.modoExibicao = this.modoExibicao === 'lista' ? 'card' : 'lista';
  }

  irParaCadastro() {
    this.router.navigate(['/new']);
  }
}
