<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArtventeRequest;
use App\Models\Articlevente;
use Illuminate\Http\Request;

class ArticleventeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ArtventeRequest $request)
    {
        $perPage = $request->input('per_page', 5); // Nombre d'articles par page
        $articlesvente = Articlevente::with('categorie', 'article')
            ->paginate($perPage);

        return response()->json($articlesvente);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArtventeRequest $request)
    {
        $articlevente = Articlevente::create($request->all());

        $article = $request->input('article_id');
        $articlevente->article()->attach($article);

        return response()->json($articlevente);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArtventeRequest $request, Articlevente $artricle)
    {
        $data = $request->all();
        $artricle->update($data);
        return response()->json($artricle);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
