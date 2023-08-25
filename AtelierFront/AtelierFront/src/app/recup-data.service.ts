import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class RecupDataService {
  private URL='http://localhost:8000/api/categories'
  private urlDelete='http://localhost:8000/api/supprimerCategories/'
  constructor(private http:HttpClient ) { }
  getCategories(page?:number):Observable<Category[]>{
    if (page) {
    return this.http.get<Category[]>('http://localhost:8000/api/categories?elementnumber=3&page='+page);
    }
    return this.http.get<Category[]>('http://localhost:8000/api/categories?elementnumber=3');
  }

  insertData(data: Category): Observable<Category> {

    return this.http.post<Category>(`${this.URL}`, data)

  }
  showData(id: number):Observable<Category[]>{
    return this.http.get<Category[]>(`${this.URL}/${id}`)
  }

  supprimerCategorie(id:{ids:number[]}): Observable<Category> {
    const url = `${this.urlDelete}`;
    return this.http.delete<Category>(url,
      {
        headers:{
          "Content-Type":"application/json",
          Accept:"apllication:json"
        },
        body:id
      }

      );

  }
  getUrls(url: string){
    return this.http.get(url+"&elementnumber=3  ")
  }

  modifierCategorie(cat: string, id: string){
    const categorie={"libelle": cat}
    return this.http.put<Category>(`${this.URL}/${id}`, categorie )
  }

  search(libelle:string){
    return this.http.get(`http://127.0.0.1:8000/api/categories/${libelle}/recherche`)
  }
}

