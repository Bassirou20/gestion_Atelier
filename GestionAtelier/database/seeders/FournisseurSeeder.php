<?php

namespace Database\Seeders;

use App\Models\Fournisseur;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FournisseurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $articles = [
            [
                'name' => 'kha margin'
                // Autres attributs
            ],
            [
                'name' => 'Kha padding',
                // Autres attributs
            ],
            // Ajoutez d'autres articles ici
        ];

        foreach ($articles as $articleData) {
            Fournisseur::create($articleData);
        }

    }
}
