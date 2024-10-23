import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Livro } from '../../model/Livro';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/livros';

  constructor(private http: HttpClient) { }

  cadastrar(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(`${this.apiUrl}/register`, livro).pipe(
      tap((response: Livro) => {
        console.log('Livro cadastrado com sucesso:', response);
      })
    );
  }

  buscarTodos(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.apiUrl}/all`).pipe(
      tap((response: Livro[]) => {
        console.log('Livros carregados com sucesso:', response);
      })
    );
  }

  editar(livro: Livro, id: string): Observable<Livro> {
    return this.http.put<Livro>(`${this.apiUrl}/register/${id}`, livro).pipe(
      tap((response: Livro) => {
        console.log('Livro atualizado com sucesso:', response);
      })
    );
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/register/${id}`).pipe(
      tap(() => {
        console.log(`Livro com ID ${id} excluído com sucesso`);
      })
    );
  }

  buscarLivro(id: string): Observable<Livro> {
  return this.http.get<Livro>(`${this.apiUrl}/all/${id}`);
}
}
