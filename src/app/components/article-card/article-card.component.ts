import { Component, Input, OnInit } from "@angular/core";
import { ArticleService } from "src/app/services/article/article.service";
import { ArticleInterface } from "src/app/services/article/interfaces";

@Component({
  selector: "article-card",
  templateUrl: "./article-card.component.html",
  styleUrls: ["./article-card.component.scss"],
})
export class ArticleCardComponent implements OnInit {
  @Input("variant")
  variant: "full" | "short" = "full";

  @Input("id")
  id: string;

  article: ArticleInterface;

  constructor(private articleSerivce: ArticleService) {}

  ngOnInit(): void {
    this.articleSerivce.articles.subscribe(
      (articles: { [key: string]: ArticleInterface }) => {
        this.article = articles[this.id];
      }
    );
  }
}
