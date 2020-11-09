import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "article-card",
  templateUrl: "./article-card.component.html",
  styleUrls: ["./article-card.component.scss"],
})
export class ArticleCardComponent implements OnInit {
  @Input("variant")
  variant: "full" | "short" = "full";

  constructor() {}

  ngOnInit(): void {}
}
