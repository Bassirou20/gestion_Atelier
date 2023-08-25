import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './article';
import { Fournisseur } from './fournisseur';

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {
  private UrlArticle = 'http://localhost:8000/api/articles';
  private searchFourn='http://localhost:8000/api/fournisseurs/search'

  constructor(private http: HttpClient) {}

  ajouterArticle(article: any): Observable<Article> {
     return this.http.post<Article>(`${this.UrlArticle}`, article);
    // return this.http.post
  }

  getArticles():Observable< Article[]>{
    return this.http.get<Article[]>(`${this.UrlArticle}`);
  }

  searchFournisseur(query: string):Observable<Fournisseur[]>{
    return this.http.post<Fournisseur[]>(`${this.searchFourn}`,{name:query});
  }
  supprimerArticle(id:number):Observable<Article>{
    return this.http.delete<Article>(`${this.UrlArticle}/${id}`)
  }
  mofidierArticle(id:number,data:Article):Observable<Article>{
    return this.http.put<Article>(`${this.UrlArticle}/${id}`,data
    )
  }
}

