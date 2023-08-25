import { Article } from "./article";
import { Category } from "./category";

export interface NouveauArticle {
  nouvelArticle: Article;
  MesCategories: Category[];
}
