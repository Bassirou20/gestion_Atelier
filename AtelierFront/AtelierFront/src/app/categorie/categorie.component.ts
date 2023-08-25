import { Component, OnInit } from '@angular/core';
import { RecupDataService } from '../recup-data.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Category } from '../category';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent implements OnInit {
  supprimerForm: FormGroup;
  errorMessage: string = '';
  public recup: FormGroup;
  public Value: any;
  public idsToDelete: number[] = [];
  isEditing = false;
  public categories: any;
  toggle: boolean = false;
  id: any;
  libelle: string = '';
  valeurChamp = this.libelle;
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 6, 9, 12];
  dataExist: boolean = true;
  btn: boolean = true;
  coche: boolean = false;
  testons: boolean = false;
  cocheInput: boolean = false;
  public myInput: boolean = false;
  links: any;
  libelleExisteControl = new FormControl('', Validators.required);

  constructor(
    private recuperation: RecupDataService,
    public formBuilder: FormBuilder,
    private fb: FormBuilder
  ) {
    this.recup = this.formBuilder.group({
      libelleControl: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });

    this.supprimerForm = this.formBuilder.group({
      categorieIds: [], // Contrôle pour stocker les IDs des catégories à supprimer
    });
    this.recup.get('libelleControl')?.enable();
  }

  ChangerPage(event: any) {
    this.page = event;
    if (event) {
      this.getUrl(event);
    }
  }

  getUrl(url: string) {
    console.log(url);

    this.recuperation.getUrls(url).subscribe((response: any) => {
      console.log(response);
      this.categories = response.data;
      this.links = response.links;
    });
  }

  ngOnInit() {
    this.GetData();
    this.isEditing = true;
  }

  GetData() {
    this.recuperation.getCategories().subscribe((response: any) => {
      this.categories = response.data;
      console.log(response);
      this.links = response.links;
    });
  }
  get libelleControl() {
    return this.recup.get('libelleControl');
  }

  OnChangeDataTables(event: any) {
    this.tableSizes = event.target.value;
    this.GetData();
  }
  ajouter() {
    // Utilisez "this.libelle" pour accéder à la valeur du champ "input"
    const libelleValue: string = this.recup.value.libelleControl;
    console.log(this.Value);
    const nouvelArticle: Category = {
      id: 1,
      libelle: libelleValue,
    };

    this.errorMessage = '';
    this.recuperation.insertData(nouvelArticle).subscribe(
      (response) => {
        console.log('Insertion réussie', response);
        this.GetData();
      },
      (error) => {
        console.error("Erreur lors de l'insertion", error);
      }
    );

    const monLibelle = this.recup.get('libelleControl');
    console.log(monLibelle);

    this.libelle = '';

  }


  recuperationId(event: Event) {
    const target: any = event.target;
    const isChecked = target.checked;
    const categoryId = +target.value;

    if (isChecked) {
      this.idsToDelete.push(categoryId);
      console.log(this.idsToDelete, this.categories);
    } else {
      const index = this.idsToDelete.indexOf(categoryId);
      if (index !== -1) {
        this.idsToDelete.splice(index, 1);
      }
    }

    // Mettre à jour l'état de la case à cocher principale globale
    this.cocheInput = this.idsToDelete.length === this.categories.length;
    this.coche =
      this.cocheInput &&
      this.categories.every((element: any) => element.selected);
  }

  delete() {
    // Supprimer les catégories sélectionnées
    if (this.idsToDelete.length > 0) {
      this.recuperation
        .supprimerCategorie({ ids: this.idsToDelete })
        .subscribe((response) => {
          console.log(response);
          this.GetData();

          // Réinitialiser les sélections
          this.cocheInput = false;
          this.coche = false;
          this.idsToDelete = [];
        });
    }
  }
  recupererValeur(valeur: any) {
    if (this.toggle) {
      this.libelle = valeur.libelle;
      this.id = valeur.id;
      this.btn = false;
      this.recup.get('libelleControl')?.enable();
      this.search()

    }
  }
  verifyDataExist() {}

  modifier() {
    console.log(this.libelle, this.id);
    this.recuperation
      .modifierCategorie(this.libelle, this.id)
      .subscribe((response) => {
        console.log(response);
        // this.rafraichirPage();
        this.GetData();
        this.libelle = '';
        this.toggle = false;
      });
  }

  diasablebInput() {

    if (!this.toggle) {
      this.recup.get('libelleControl')?.enable();
    } else {
      this.recup.get('libelleControl')?.disable();
    }
  }

  ajouterOuModifier(target: HTMLInputElement) {
    if (this.toggle) {
      this.modifier();
      this.valeurChamp = this.libelle;
    } else {
      this.ajouter();
    }

    // Réinitialiser les sélections
    this.cocheInput = false;
    this.coche = false;
    this.idsToDelete = [];
  }

  rafraichirPage() {
    window.location.reload();
  }

  search() {
    if (this.libelle.length < 3) {
      this.btn = true;
    }

    this.recuperation.search(this.libelle).subscribe((response: any) => {
      console.log(response);
      if (response.data == "") {
        this.btn = false;
      } else {
        this.btn = true;
      }
    });
  }

  selectAll(event: Event) {
    const target: any = event.target;
    const isChecked = target.checked;

    this.categories.forEach((element: any) => {
      element.selected = isChecked;
    });

    // Mettre à jour l'état des cases à cocher individuelles
    this.idsToDelete = isChecked
      ? this.categories.map((element: any) => element.id)
      : [];
    this.cocheInput = isChecked;

    // Mettre à jour l'état de la case à cocher principale globale
    this.coche =
      isChecked && this.idsToDelete.length === this.categories.length;
  }
}
