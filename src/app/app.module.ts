import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./routes/home/home.component";
import { CodeComponent } from "./components/blog/code/code.component";
import { ContentComponent } from "./components/blog/content/content.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "src/environments/environment.prod";
import { NavbarComponent } from './components/navbar/navbar.component';
import { BlogComponent } from './routes/blog/blog.component';
import { UserComponent } from './routes/user/user.component';
import { CategoriesComponent } from './routes/home/categories/categories.component';
import { TrendingComponent } from './routes/home/trending/trending.component';
import { PostsComponent } from './routes/home/posts/posts.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, CodeComponent, ContentComponent, NavbarComponent, BlogComponent, UserComponent, CategoriesComponent, TrendingComponent, PostsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
