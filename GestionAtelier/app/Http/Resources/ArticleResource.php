<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'libelle' => $this->libelle,
            'quantiteStock' => $this->quantiteStock,
            'categorie' => $this->categorie_id,
            'fournisseur' => $this->fournisseur_id,
            'reference' =>$this->reference
          ];
    }
}
