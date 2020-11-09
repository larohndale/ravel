export interface ArticleInterface {
  id: string;
  author: string;
  title: string;
  shortDesc: string;
  tags: string[];
  content: string;
  thumbnail: string;
  upvoters: string[];
  downvoters: string[];
  datePublished: Date;
  dateEdited: Date[];
}
