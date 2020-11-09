import { Injectable } from "@angular/core";
import { ArticleService } from "../article/article.service";
import { UserInterface } from "../user/interface";
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(
    private userService: UserService,
    private articleService: ArticleService
  ) {}

  prepareData() {
    /// User
    this.userService.getCurrentUser();
    /// Articles
    UserService.user.subscribe((user: UserInterface) => {
      if (!user) return;
      this.articleService.getUserSuggestions();
      this.articleService.getTrending();
      this.articleService.articles.subscribe(console.log);
    });
  }
}
