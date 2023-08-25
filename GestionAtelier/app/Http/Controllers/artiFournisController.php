<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ArticleFournisseur;
use Illuminate\Validation\ValidationException;

class ArtiFournisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fournisseurs = ArticleFournisseur::all();
        return response()->json($fournisseurs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $this->validate($request, [
                'article_id' => ['required', 'integer'],
                'fournisseur_id'=>['required','integer']
            ]);

            $fournisseur = ArticleFournisseur::create($request->all());
            return response()->json($fournisseur, 201);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $fournisseur = ArticleFournisseur::findOrFail($id);
        return response()->json($fournisseur);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $this->validate($request, [
                'article_id' => ['required', 'integer'],
                'fournisseur_id'=>['required','integer']
            ]);

            $fournisseur = ArticleFournisseur::findOrFail($id);
            $fournisseur->update($request->all());
            return response()->json($fournisseur);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {


            $ids = $request->input('ids');
            ArticleFournisseur::whereIn('id', $ids)->delete();

            return response()->json(['message' => 'Fournisseurs supprimés']);
    }
}
