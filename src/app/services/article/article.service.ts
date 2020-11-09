import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { UserInterface } from "../user/interface";
import { UserService } from "../user/user.service";
import { ArticleInterface } from "./interfaces";
import { take } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ArticleService {
  articles: BehaviorSubject<{
    [key: string]: ArticleInterface;
  }> = new BehaviorSubject({});

  constructor(private firestore: AngularFirestore) {}

  private parseArticle(article: any) {
    let articles: { [key: string]: ArticleInterface } = this.articles.value;
    if (Object.keys(articles).includes(article.id)) return;

    articles[article.id] = {
      id: article.id,
      ...article.data(),
    };
    this.articles.next(articles);
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

  async getArticlesByIds(articleIds: string[]) {
    articleIds.forEach(async (articleId: string) => {
      if (this.articles.value[articleId]) return;
      const article = await this.firestore
        .collection("articles")
        .doc(articleId)
        .get()
        .pipe(take(1))
        .toPromise();
      this.parseArticle(article);
    });
  }

  async getUserSuggestions() {
    const user: UserInterface = UserService.user.value;
    if (user) {
      const articleIds: string[] = (
        await this.firestore
          .collection("suggestions")
          .doc(user.id)
          .get()
          .pipe(take(1))
          .toPromise()
      ).data()?.articles;

      if (!articleIds) return;
      this.getArticlesByIds(articleIds);
    }
  }

  async getTrending() {
    const user: UserInterface = UserService.user.value;
    if (user) {
      const articleIds: string[] = (
        await this.firestore
          .collection("trending")
          .doc("in")
          .get()
          .pipe(take(1))
          .toPromise()
      ).data()?.articles;

      if (!articleIds) return;
      this.getArticlesByIds(articleIds);
    }
  }
}
