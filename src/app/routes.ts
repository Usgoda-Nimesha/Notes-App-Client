import { Routes } from '@angular/router';
import { SaveNotesComponent } from './save-notes/save-notes.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  {
    // when navigated into the savenotes path, the saveNotes component will
    // be loaded into the first router outlet
    path: 'notes',
    component: SaveNotesComponent,
  },
];
