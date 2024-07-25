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

  notas$ = new Observable<Notes[]>;

  //form
  id = '';
  titulo = ''
  content = ''
  date = ''

  dateConst = new Date(Date.now());
  formattedDate = this.dateConst.getDate().toString().padStart(2, '0') + '/' + (this.dateConst.getMonth() + 1).toString().padStart(2, '0') + '/' + this.dateConst.getFullYear();

  constructor(private NotesService: NotesService){
    this.obterNotasCadastradas();
  }

  obterNotasCadastradas() {
    this.notas$ = this.NotesService.GetNotes();
  }

  cadastrarNotas(){
    if (!this.titulo || !this.content)
      return

    if (this.id){
      this.atualizar();
      return;
    }

    const dateConst = new Date(Date.now());
    var formattedDate = dateConst.getDate().toString().padStart(2, '0') + '/' + (dateConst.getMonth() + 1).toString().padStart(2, '0') + '/' + dateConst.getFullYear();
    
    return this.NotesService.newNotes({id: this.id, title: this.titulo, content: this.content, date: formattedDate, fav: false, pinned: false }).subscribe(_ => this.obterNotasCadastradas);
  }

  atualizar () {
    this.NotesService.changeNotes({
      id: this.id,
      title: this.titulo,
      content: this.content,
      date: this.formattedDate.toString()
    }).subscribe(_=> this.obterNotasCadastradas());
  }

  editarNotas(nota:Notes){
    this.id = nota.id!.toString();
    this.titulo = nota.title;
    this.content = nota.content;
    this.date = nota.date!;
  }

  removerNotas(id: string) {
    this.NotesService.removeNotes(id).subscribe(_=> this.obterNotasCadastradas);
  }

}