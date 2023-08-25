<?php

namespace Database\Seeders;

use App\Models\Categorie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categorie::create([
            'libelle' => 'Kaftan'
        ]);
        Categorie::create([
            'libelle' => 'Laxassaay Mouride'
        ]);
          Categorie::create([
            'libelle' => 'Robe'
        ]);
          Categorie::create([
            'libelle' => 'Ensemble Ndandité'
        ]);
          Categorie::create([
            'libelle' => 'Vêtement Socé'
        ]);
    }
}
