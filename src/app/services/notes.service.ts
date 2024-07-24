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
}