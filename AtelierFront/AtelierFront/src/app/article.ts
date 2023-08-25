
export interface Article {
  id?: number,
  libelle?: string;
  prix: number;
  quantiteStock: number;
  reference: string;
  fournisseur_id: number[];
  categorie_id: string;
  photo:string
}

