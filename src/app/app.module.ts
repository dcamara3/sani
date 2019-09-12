import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
//import { RouterModule } from "@angular/router";
import { SmartPlaylistModule } from './smart-playlist/smart-playlist.module';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SmartPlaylistModule,
        Angulartics2Module/*,
        Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ])*/
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
