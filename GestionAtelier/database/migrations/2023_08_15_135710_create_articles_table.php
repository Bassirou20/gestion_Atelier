<?php

use App\Models\Categorie;
use App\Models\Fournisseur;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('libelle');
            $table->integer('quantiteStock');
            $table->foreignIdFor(Categorie::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Fournisseur::class)->constrained()->cascadeOnDelete();
            $table->string('photo')->nullable();
            $table->string('reference');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
