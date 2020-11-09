import { Injectable } from "@angular/core";
import { ArticleService } from "../article/article.service";
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
    this.articleService.getUserSuggestions();
    this.articleService.getTrending();
  }
}
