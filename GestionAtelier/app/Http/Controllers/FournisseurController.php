<?php

namespace App\Http\Controllers;

use App\Models\Fournisseur;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;


class FournisseurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fournisseurs = Fournisseur::all();
        return response()->json($fournisseurs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $this->validate($request, [
                'name' => 'required|string',
            ]);

            $fournisseur = Fournisseur::create($request->all());
            return response()->json($fournisseur, 201);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function search(Request $request)
    {
        $nom = $request->input('name');

        // Utiliser la méthode where pour rechercher les fournisseurs dont le nom commence à partir du deuxième caractère
        $fournisseurs = Fournisseur::where('name', 'like', '%' . substr($nom, 0) . '%')
            ->get();

        return response()->json($fournisseurs);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $this->validate($request, [
                'name' => 'required|string'
            ]);

            $fournisseur = Fournisseur::findOrFail($id);
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
        try {
            $this->validate($request, [
                'ids' => 'required|array', // Vérifiez que 'ids' est un tableau
                'ids.*' => 'required|integer|exists:fournisseurs,id' // Vérifiez chaque ID de fournisseur individuellement
            ]);

            $ids = $request->input('ids');
            Fournisseur::whereIn('id', $ids)->delete();

            return response()->json(['message' => 'Fournisseurs supprimés']);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 400);
        }
    }
}
