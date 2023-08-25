<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\artiFournisController;
use App\Http\Controllers\FournisseurController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('restaurer',[CategorieController::class,'restaurer']);
Route::get('categories/{libelle}/recherche', [CategorieController::class, 'show']);
Route::post('fournisseurs/search', [FournisseurController::class, 'search']);
Route::put('/articles/{id}',[ArticleController::class,'update']);
Route::delete('supprimerCategories',[CategorieController::class,'supprimerCategories']);
Route::apiResource('/articleFournisseur',artiFournisController::class);
Route::apiResource('/categories',CategorieController::class);
Route::apiResource('/fournisseurs',FournisseurController::class);
Route::apiResource('articles',ArticleController::class)->only('index','destroy','store');

