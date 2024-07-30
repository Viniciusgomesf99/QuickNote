import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Notes } from "../models/notes.model";

@Injectable({
    providedIn: 'root'
})

export class NotesService {

    private url = `${environment.api}/notes`;
    
    constructor(private httpClient: HttpClient) {

    }

    GetNotes(){
            return this.httpClient.get<Notes[]>(this.url)
    }

    newNotes(nota:Notes){
        return this.httpClient.post<Notes>(this.url, { ...nota, id:undefined});
    }

    changeNotes(nota:Notes){
        return this.httpClient.put<Notes>(`${this.url}/${nota.id}`, nota);
    }

    favoriteNotes(nota:Notes){
        return this.httpClient.put<Notes>(`${this.url}/${nota.id}`, nota);
    }

    removeNotes(id: number){
        return this.httpClient.delete<void>(`${this.url}/${id}`);
    }
}