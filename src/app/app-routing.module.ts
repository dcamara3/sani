import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmartPlaylistComponent } from './smart-playlist/smart-playlist.component';

const routes: Routes = [
    { path: '', component: SmartPlaylistComponent },
    { path: 'smart-playlist', component: SmartPlaylistComponent },
     { path: '**', component: SmartPlaylistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
