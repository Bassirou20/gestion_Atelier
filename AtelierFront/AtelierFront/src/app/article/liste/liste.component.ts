import { outputAst } from '@angular/compiler';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/article';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css'],
})
export class ListeComponent {
  @Input() Articles: Article[] = [];

  @Output() idToDelete = new EventEmitter<number>();

  @Output() ArticleToUpdate = new EventEmitter<Article>();

  sup: string = 'supprimer';

  compteur: number = 3;

  recupId(event: Article) {
    // console.log(event);
    this.ArticleToUpdate.emit(event)
  }

  // deleteArticle(event:Event){
  //   const target = event.target as HTMLButtonElement;
  //   this.compteur = 3;
  //   const countdownInterval = setInterval(() => {
  //     this.compteur--;

  //     if (this.compteur >= 0) {
  //       target.textContent = `OK (${this.compteur})`;
  //     } else {
  //       clearInterval(countdownInterval);
  //       target.textContent = 'supprimer ';
  //     }
  //   }, 1000);

  //     if (target.textContent?.includes("OK") ){
  //       //  this.idArticle= +target.value
  //       console.log("rghjvbn");
  //       this.idToDelete.emit(+target.value)
  //     }
  // }

  deleteArticle(event: Event, articleId: number) {
    const target = event.target as HTMLButtonElement;
    const originalText = target.textContent; // Conserver le texte d'origine du bouton
    this.compteur = 3;

    const countdownInterval = setInterval(() => {
      this.compteur--;

      if (this.compteur >= 0) {
        target.textContent = `OK (${this.compteur})`;
      } else {
        clearInterval(countdownInterval);
        target.textContent = originalText; // Rétablir le texte d'origine du bouton
      }
    }, 1000);

    if (target.textContent?.includes('OK')) {
      this.idToDelete.emit(articleId);
    }
  }
}
