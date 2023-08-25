import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategorieComponent } from './categorie/categorie.component';
import { UniqueLibelleDirective } from './unique-libelle.directive';
import { ArticleComponent } from './article/article.component';
import { FormComponent } from './article/form/form.component';
import { ListeComponent } from './article/liste/liste.component';
import { PaginationComponent } from './article/pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategorieComponent,
    UniqueLibelleDirective,
    ArticleComponent,
    FormComponent,
    ListeComponent,
    PaginationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
