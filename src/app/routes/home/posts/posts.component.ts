import { Component, OnInit } from "@angular/core";
import { ArticleService } from "src/app/services/article/article.service";

@Component({
  selector: "home-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"],
})
export class PostsComponent implements OnInit {
  articleIds: string[];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.userSuggestions.subscribe((articleIds: string[]) => {
      this.articleIds = articleIds;
    });
  }
}
