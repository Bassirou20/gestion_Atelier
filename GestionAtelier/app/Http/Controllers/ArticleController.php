<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleRequest;
use App\Models\Article;
use App\Models\ArticleFournisseur;
use App\Models\Fournisseur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Psy\Readline\Hoa\Console;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    private $article;

public function __construct(Article $articles)
{
  $this->article = $articles;
}

public function index()
{
    $articles = Article::all(); // Les relations sont déjà chargées
    return response()->json($articles);
}

    /**
     * Store a newly created resource in storage.
     */

    public function store(ArticleRequest $request)
    {

        $user = Article::create([
            "libelle"=>$request->libelle,
            "quantiteStock"=>$request->quantiteStock,
            "categorie_id"=>$request->categorie_id,
            "prix"=>$request->prix,
            "photo"=>$request->photo,
            "reference"=>$request->reference,
        ]);
        return response()->json($user);
        // Le code dans le "creating" observer sera automatiquement exécuté

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $article = Article::findOrFail($id);
        return response()->json($article);
    }

    /**
     * Update the specified resource in storage.
     */


    public function update(ArticleRequest $request, Article $artricle)
    {
        $data = $request->all();
        $artricle->update($data);
        return response()->json($artricle);
    }
    
    /**
     * Remove the specified resource from storage.
     */

    public function destroy(Article $article)
    {
        $article->delete();
        return "article supprimé avec succès";
    }
}
