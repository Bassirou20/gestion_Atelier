<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $articles = [
            [
                'libelle' => 'Article 1',
                'quantiteStock' => 50,
                'categorie_id' => 1,
                'fournisseur_id' => 1,
                'photo' => ''
            ],
            [
                'libelle' => 'Article 2',
                'quantiteStock' => 30,
                'categorie_id' => 1,
                'fournisseur_id' => 2,
                'photo' => ''
            ],
            // Ajoutez d'autres articles ici
        ];

        foreach ($articles as $articleData) {
            Article::create($articleData);
        }
    }

}
