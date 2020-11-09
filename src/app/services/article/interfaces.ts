export interface ArticleInterface {
  id: string;
  author: string;
  title: string;
  tags: string[];
  content: string;
  upvoters: string[];
  downvoters: string[];
  datePublished: Date;
  dateEdited: Date[];
}
