import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotesService } from './services/notes.service';
import { Notes } from './models/notes.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'QuickNote';

  notas$: Observable<Notes[]>;

  // form
  id: number | undefined = undefined;
  titulo = '';
  content = '';
  date = '';

  dateConst = new Date(Date.now());
  formattedDate = this.dateConst.getDate().toString().padStart(2, '0') + '/' + (this.dateConst.getMonth() + 1).toString().padStart(2, '0') + '/' + this.dateConst.getFullYear();

  constructor(private notesService: NotesService) {
    this.notas$ = new Observable<Notes[]>();
    this.obterNotasCadastradas();
  }

  obterNotasCadastradas() {
    this.notas$ = this.notesService.GetNotes();
  }

  cadastrarNotas() {
    if (!this.titulo || !this.content) return;

    const nota: Notes = {
      id: this.id ? this.id : undefined,
      title: this.titulo,
      content: this.content,
      date: this.formattedDate,
      fav: false,
      pinned: false
    };

    if (this.id) {
      this.atualizar(nota);
    } else {
      this.notesService.newNotes(nota).subscribe(() => {
        this.obterNotasCadastradas();
        this.limparFormulario();
      });
    }
  }

  atualizar(nota: Notes) {
    this.notesService.changeNotes(nota).subscribe(() => {
      this.obterNotasCadastradas();
      this.limparFormulario();
    });
  }

  editarNotas(nota: Notes) {
    this.id = nota.id!;
    this.titulo = nota.title;
    this.content = nota.content;
    this.date = nota.date!;
  }

  favoriteNotas(nota: Notes){

    nota.fav = !nota.fav;
    
    this.notesService.favoriteNotes(nota).subscribe(_ => {
      this.obterNotasCadastradas();
    })
  }

  removerNotas(id: number) {
    this.notesService.removeNotes(id).subscribe(() => {
      this.obterNotasCadastradas();
    });
  }

  limparFormulario() {
    this.id = undefined;
    this.titulo = '';
    this.content = '';
  }
}