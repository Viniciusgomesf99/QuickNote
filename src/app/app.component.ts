import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotesService } from './services/notes.service';
import { Notes } from './models/notes.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'QuickNote';

  notas: Notes[] = []

  constructor(private NotesService: NotesService){
    this.obterNotasCadastradas();
  }

  obterNotasCadastradas() {
    this.NotesService.GetNotes()
    .subscribe(notas => this.notas = notas)
  }

}