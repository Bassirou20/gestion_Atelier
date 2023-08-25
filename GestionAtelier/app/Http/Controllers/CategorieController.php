<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use GuzzleHttp\Psr7\Message;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categorie=Categorie::paginate($request->elementnumber);
        return response()->json($categorie);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Categorie::where('libelle',$request->libelle)->exists()) {

            return response()->json(['message'=>'ce libelle existe déjà']);
        }
        $categorie=Categorie::create([
            'libelle'=>$request->libelle
        ]);

        return response()->json($categorie);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $exist = Categorie::where('libelle', "like",$id)->first();
        if (strlen($id)<3)
        {
            return response()->json(['message'=>"La recherche doit commencer par 3 caracteres"]);
        }

        if (!$exist) {
            return response()->json(['message'=>"Article n'existe pas encore", "data"=>""]);
        }


        if ($exist) {
            return response()->json(["status"=>200,'message'=>"L'article existe deja", 'data'=>$exist]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
            $categorie=Categorie::find($id);
            if ($categorie){
                $categorie->update(['libelle' =>  $request['libelle']]);
            }
            return Response()->json(['Message'=>'libelle modifié']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $categorie=Categorie::findOrFail($id);
        $categorie->delete();
        return "suppression effectuée";
    }
    public function restaurer(){
       $categorie= Categorie::onlyTrashed()->restore();
       return response()->json($categorie);
    }

    public function supprimerCategories(Request $request)
    {
        $ids = $request->input('ids'); // Tableau d'IDs à supprimer

        if (empty($ids)) {
            return response()->json(['message' => 'Aucune catégorie sélectionnée.'], 400);
        }

        Categorie::whereIn('id', $ids)->delete();

        return response()->json(['message' => 'Suppression effectuée avec succès.'], 200);
    }
}


