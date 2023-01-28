import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Notes } from './notes.model';

@Injectable({
  providedIn: 'root',
})
// object of model class
export class NotesService {
  // selectedNote!: Notes;
  // notesList!: Notes[];
  selectedNote: Notes = {
    _id: '',
    title: '',
    noteBody: '',
  };
  notesList!: Notes[];
  constructor(private http: HttpClient) {}

  postSaveNotes(note: Notes) {
    return this.http.post('http://localhost:3000/api' + '/notes', note);
  }

  getNotesList() {
    return this.http.get('http://localhost:3000/api' + '/notes');
  }
  putNotes(note: Notes) {
    return this.http.put('http://localhost:3000/api' + `/notes/${note._id}`, note);
  }
  deleteNotes(_id: string) {
    return this.http.delete('http://localhost:3000/api' + `/notes/${_id}`);
  }
}
