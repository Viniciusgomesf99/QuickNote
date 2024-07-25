import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotesService } from './services/notes.service';
import { Notes } from './models/notes.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'QuickNote';

  notas$ = new Observable<Notes[]>;

  constructor(private NotesService: NotesService){
    this.obterNotasCadastradas();
  }

  obterNotasCadastradas() {
    this.notas$ = this.NotesService.GetNotes();
  }

}