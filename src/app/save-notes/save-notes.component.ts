import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotesService } from '../shared/notes.service';
import { NgForm } from '@angular/forms';
import { Notes } from '../shared/notes.model';

declare var M: any;
@Component({
  selector: 'app-save-notes',
  templateUrl: './save-notes.component.html',
  styleUrls: ['./save-notes.component.css'],
  providers: [NotesService],
})
export class SaveNotesComponent implements OnInit {
  constructor(public notesService: NotesService) {}
  showSuccessMessage: boolean | undefined;
  serverErrorMessages: string | undefined;
  actionType = 'Create Note';
  submitStatus = true;

  ngOnInit(): void {
    this.refreshNotesList();
  }

  onSubmit(form: NgForm) {


    if (form.value._id == '') {
      this.notesService.postSaveNotes(form.value).subscribe(
        (res) => {
          this.refreshNotesList();
          this.refreshForm(form);

          this.showSuccessMessage = true;
          setTimeout(() => (this.showSuccessMessage = false), 4000);
        },
        (err) => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>');
          } else {
            this.serverErrorMessages = 'Something went wrong';
          }
        }
      );
    } else {
      this.notesService.putNotes(form.value).subscribe((res) => {
        this.refreshNotesList();
        this.refreshForm(form);
        this.changeActionType();
        this.showSuccessMessage = true;
        setTimeout(() => (this.showSuccessMessage = false), 4000);
      });
    }
  }

  refreshNotesList() {
    this.notesService.getNotesList().subscribe((res) => {
      this.notesService.notesList = res as Notes[];
    });
  }

  onEdit(note: Notes) {
    this.notesService.selectedNote = note;
    this.changeActionType('edit');
  }

  onDelete(_id: any, form: NgForm) {
    if (
      confirm(
        'Deleting this record cannot be undone, Are you sure you want to proceed?'
      )
    ) {
      this.notesService.deleteNotes(_id).subscribe((res) => {
        this.refreshNotesList();
        this.refreshForm();
      });
    }
  }

  refreshForm(form?: NgForm) {
    if (form) {
      this.submitStatus = false;
      form.reset();
      this.notesService.selectedNote = {
        _id: '',
        title: '',
        noteBody: '',
      };
      this.refreshNotesList();
    }
  }

  changeActionType(action = 'create') {
    if (action == 'create') {
      this.actionType = 'Create Note';
    } else {
      this.actionType = 'Edit Note';
    }
  }
  changeSubmitStatus(status) {
    if (status) {
      this.submitStatus = false;
    } else {
      this.submitStatus = true;
    }
  }
}
