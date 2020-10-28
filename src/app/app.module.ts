import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { CodeComponent } from './components/blog/code/code.component';
import { ContentComponent } from './components/blog/content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CodeComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
