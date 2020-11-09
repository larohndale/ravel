import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { UserInterface } from "../user/interface";
import { UserService } from "../user/user.service";
import { ArticleInterface } from "./interfaces";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ArticleService {
  articles: { [key: string]: ArticleInterface } = {};

  constructor(private firestore: AngularFirestore) {}

  private parseArticle(article: any) {
    this.articles[article.id] = {
      id: article.id,
      ...article.data(),
    };
  }

  async getArticleById(id: string) {
    if (this.articles[id] === null) {
      let article = await this.firestore
        .collection("articles")
        .doc(id)
        .get()
        .pipe(take(1))
        .toPromise();
      this.parseArticle(article);
    } else {
      console.log("Article Already Exists in Cache!!");
    }
  }

  async getUserSuggestions() {
    const user: UserInterface = UserService.user.value;
    if (user) {
      const articles = await this.firestore
        .collection("users")
        .doc(user.id)
        .collection("suggestions")
        .get()
        .pipe(take(1))
        .toPromise();
      console.log(articles);
    }
  }

  async getTrending() {
    const user: UserInterface = UserService.user.value;
    if (user) {
      const articles = await this.firestore
        .collection("public")
        .doc("trending")
        .collection("in")
        .get()
        .pipe(take(1))
        .toPromise();
      console.log(articles);
    }
  }
}
