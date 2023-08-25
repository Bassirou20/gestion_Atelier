import { Component ,OnInit} from '@angular/core';
import {ArticleServiceService} from '../article-service.service'
import { Article } from '../article';
import { RecupDataService } from '../recup-data.service';
import { Category } from '../category';
import { Fournisseur } from '../fournisseur';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {

  articleData = {
    title: 'Mon article',
    content: 'Contenu de l\'article'
  };
  Articles: Article[]=[];
  MesCategories: Category[]=[]
  form: FormGroup;
  FournisseursSelectiones: Fournisseur[]=[]
  toEdit!:Article
  editingArticleId: number | null = null;


  // console.log(this.MesCategories);

  Mesfournisseurs:Fournisseur[]=[]

  editingArticle: Article | null = null;
  ngOnInit() {
    this.GetArticle();
    this.GetCategories()

  }
  constructor(private article: ArticleServiceService ,private categorie:RecupDataService,private fb: FormBuilder){
    this.form = this.fb.group({
      libelle: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      categorie: ['', Validators.required],
      // ... autres champs du formulaire
    });
  }

  idToModify(event:Article){
    this.toEdit=event;
    console.log(this.toEdit);


  }

  ajouterNouvelArticle(nouvelArticle: any) {
    console.log(nouvelArticle);

    this.article.ajouterArticle(nouvelArticle).subscribe((Response)=>{
      console.log(Response
        );
        this.Articles.unshift(nouvelArticle);
        this.sortArticlesByIdDesc();
    })
    console.log(nouvelArticle);
    this.GetArticle()
  }

  GetCategories(){
    this.categorie.getCategories().subscribe((response: any)=>{
      this.MesCategories=response.data
       console.log(this.MesCategories);

    })
  }

  GetArticle(){
    this.article.getArticles().subscribe((response)=>{
      this.Articles=response
      this.sortArticlesByIdDesc();
      console.log(this.Articles);

    })
  }

  sortArticlesByIdDesc() {
    this.Articles.sort((a, b) => {
      if (a.id !== undefined && b.id !== undefined) {
        return b.id - a.id;
      }
      return 0; // Aucun tri si les IDs sont indéfinis
    });
  }


  chercherFournisseur(event: string){
    // console.log(this.FournisseursSelectiones);

    if (event=="") {
      this.Mesfournisseurs=[]
      return
    }
    this.article.searchFournisseur(event).subscribe((response)=>{
     this.Mesfournisseurs=response as Fournisseur[]
     console.log(this.Mesfournisseurs);
    console.log(response);
    })
  }

  // deleteArticle(e:number){
  //   this.article.supprimerArticle(e).subscribe((response)=>{
  //     console.log(response);
  //     this.GetArticle()
  //   })
  // }


  deleteArticle(articleId: number) {
    // Supprimer l'article de la liste locale
    this.Articles = this.Articles.filter(article => article.id !== articleId);
    // Appeler le service pour supprimer l'article du serveur
    this.article.supprimerArticle(articleId).subscribe((response) => {
      console.log(response);
    });
    this.GetArticle()
  }


  modifierArticle(articleId: number){
      this.article.mofidierArticle(articleId,this.toEdit).subscribe((response)=>{
        return response
      })
  }




}
