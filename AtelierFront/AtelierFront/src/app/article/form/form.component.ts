import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from 'src/app/article';
import { Category } from 'src/app/category';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Fournisseur } from 'src/app/fournisseur';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnChanges {
  @ViewChild('selectCategory') selectCategorie!: ElementRef;
  @ViewChild('inputFournisseur') inputFournisseur!: ElementRef;
  @ViewChild('myButton')  myButton!:ElementRef;
  // inputFournisseur : string = "";
  @Input() article: any;
  @Input() MesCategories: Category[] = [];
  @Output() eventEmetteur: EventEmitter<string> = new EventEmitter<string>();
  @Input() Mesfournisseurs: Fournisseur[] = [];
  @Input() FournisseursSelectiones: Fournisseur[] = [];
  @Output() FournisseursSelectForOutPut = new EventEmitter<Fournisseur[]>();
  @Input() editingArticleId: number | null = null;
  modeModify:boolean=false

  fournisseursDisponibles: Fournisseur[] = [];

  constructor(private fb: FormBuilder) {}

  public imageUrl: string ='https://cdn-icons-png.flaticon.com/512/3342/3342176.png';

  form: FormGroup = this.fb.group({
    libelle: ['', Validators.required],
    prix: ['', [Validators.required, Validators.min(0)]],
    stock: ['', [Validators.required, Validators.min(0)]],
    categorie: ['', Validators.required],
    fournisseur: ['', Validators.required],
    reference: [''],
    photo: [''],
  });

  currentStep: 'libelle' | 'categorie' | 'numeroOrdre' = 'libelle';
  @Input() Articles: Article[] = [];
  @Input() toEdit!: Article;


  @Output() nouvelArticleModifie:EventEmitter<Article>=new EventEmitter<Article>()
  @Output() nouvelArticleAjoute: EventEmitter<Article> =
    new EventEmitter<Article>();
    ngOnInit(): void {
      console.log(this.MesCategories);
      // this.loadArticleToEdit();

    this.fournisseursDisponibles = this.Mesfournisseurs;
    this.form.valueChanges.subscribe(() => {
      this.form.controls['reference'].setValue(this.generateReference());
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    const currentValue = changes['toEdit'];
    console.log(currentValue.currentValue);
    if (currentValue) {
      let value = currentValue.currentValue;
      this.form.patchValue({
        libelle: value.libelle,
        prix: value.prix,
        stock: value.quantiteStock,
        reference: value.reference,
        categorie: value.categorie.id,
        fournisseur: value.fournisseur
      });
        console.log(this.toEdit);
    }
  }

  selectedFournisseurIDs: string = '';


  ajouterArticle() {
    let nouvelArticle: Article = {
      libelle: this.form.value.libelle,
      prix: this.form.value.prix,
      quantiteStock: this.form.value.stock,
      reference: this.form.value.reference,
      fournisseur_id: this.FournisseursSelectiones.map(
        (element: Fournisseur) => +element.id
        ),
        categorie_id: this.selectCategorie.nativeElement.value,
        photo: this.form.value.photo,
    };
    console.log(nouvelArticle);


    this.nouvelArticleAjoute.emit(nouvelArticle);

    // Vider les champs du formulaire
    this.form.reset();
    this.Articles.unshift(nouvelArticle);
  }

  recupValue(event: Event) {
    let element = event.target as HTMLInputElement;
    this.eventEmetteur.emit(element.value);
    console.log(element.value);
    console.log(this.Mesfournisseurs);
    console.log(this.FournisseursSelectiones);
    // const itemTrouve = this.FournisseursSelectiones.find((item) =>
    //   this.Mesfournisseurs.includes(item)
    // );
    let itemTrouve: Fournisseur = this.FournisseursSelectiones.find(
      (item) => item
    ) as Fournisseur;
    // if (this.Mesfournisseurs.includes(itemTrouve)) {
    //   console.log('bap');
    // }
    this.FournisseursSelectiones.find((item) =>
      this.Mesfournisseurs.includes(item)
    );
    console.log(this.FournisseursSelectiones);
    console.log(this.Mesfournisseurs);
  }

  selectFournisseur(event: Fournisseur) {
    // console.log(event.id);

    if (!this.FournisseursSelectiones.includes(event)) {
      this.FournisseursSelectiones.push(event);
    }
    this.Mesfournisseurs = this.Mesfournisseurs.filter(
      (item) => item !== event
    );
    // this.form.controls['fournisseur'].setValue(this.getSelectedFournisseurNames());
    this.inputFournisseur.nativeElement.value = '';

    // this.inputFournisseur = "";
  }

  onPhotoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.form.patchValue({ file }); // Mettre à jour la valeur du champ "file" dans le formulaire
      this.imageUrl = URL.createObjectURL(file); // Mettre à jour l'URL de l'image pour affichage
    }
  }
  getSelectedFournisseurIDs() {
    this.selectedFournisseurIDs = this.FournisseursSelectiones.map(
      (item) => item.id
    ).join(', ');
    console.log('jkj', this.selectedFournisseurIDs);
    // return "";
  }



  getSelectedFournisseurNames(): string {
    return this.FournisseursSelectiones.map((item) => item.name).join(', ');
  }
  removeSelectedFournisseur(event: Fournisseur) {
    this.FournisseursSelectiones = this.FournisseursSelectiones.filter(
      (item) => item !== event
    );
    this.Mesfournisseurs.push(event);
    this.form.controls['fournisseur'].setValue(
      this.getSelectedFournisseurNames()
    );
  }

  isEnregistrerButtonDisabled(): boolean {
    const libelle = this.form.value.libelle;
    const prix = this.form.value.prix;
    const stock = this.form.value.stock;
    const categorie = this.form.value.categorie;
    const fournisseur = this.form.value.fournisseur;

    // Vérifier si tous les champs obligatoires sont vides
    if (!libelle || !prix || !stock || !categorie || !fournisseur) {
      return true; // Désactiver le bouton
    }

    return false; // Activer le bouton
  }
  isLibelleValid() {
    return (
      this.form.controls['libelle'].invalid &&
      this.form.controls['libelle'].touched
    );
  }

  generateReference(): string {
    const libelle = this.form.value.libelle;

    let cateLib = '';
    let cateId = 1;
    if (this.form.value.categorie !== '') {
      const categorie = this.MesCategories.find(
        (cat) => cat.id === +this.form.value.categorie
      )!;
      cateLib = categorie.libelle;
      cateId = categorie.id;
    }

    // if (libelle && categorie && this.currentStep === 'categorie') {

    const libelleAbrege = libelle.slice(0, 3).toUpperCase()!;
    const categorieInfo = `${cateLib.toUpperCase()}-${cateId}`;

    return `REF-${libelleAbrege}-${categorieInfo}`;
    // } else if (libelle && this.currentStep === 'libelle') {
    //   const libelleAbrege = libelle.slice(0, 3).toUpperCase();
    //   return `REF-${libelleAbrege}`;
  }

  // return ''; // Retourne une chaîne vide si les conditions ne sont pas remplies
  // }

  goToNextStep() {
    // if (this.currentStep === 'libelle') {
    //   this.currentStep = 'categorie';
    // } else if (this.currentStep === 'categorie') {
    //   this.currentStep = 'numeroOrdre';
    // }
    this.form.controls['reference'].setValue(this.generateReference());
  }

  modifierArticle() {
    // Construisez l'objet d'article à mettre à jour
    const articleModifie: Article = {
      libelle: this.form.value.libelle,
      prix: this.form.value.prix,
      quantiteStock: this.form.value.stock,
      reference: this.form.value.reference,
      fournisseur_id: this.FournisseursSelectiones.map(
        (element: Fournisseur) => +element.id
      ),
      categorie_id: this.selectCategorie.nativeElement.value,
      photo: this.form.value.photo,
      // Assurez-vous d'ajouter toutes les propriétés nécessaires de type Article
    };

    // Appelez une méthode ou un service pour effectuer la mise à jour de l'article
    // Vous devrez implémenter cette logique en fonction de votre application
    this.nouvelArticleModifie.emit(articleModifie)
    console.log('Article mis à jour :', articleModifie);

    // Après la modification, réinitialisez la valeur de editingArticleId
    this.editingArticleId = null;
  }


  modeModifier(){
    if (this.modeModify=true) {
        this.myButton.nativeElement.innerText="modifie"
    }
  }

  addOrModidy(){

  }
}
