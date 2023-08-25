<?php

namespace App\Models;

use App\Models\Categorie;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Article extends Model
{
    use HasFactory;
    protected $fillable = ['libelle', 'quantiteStock', 'categorie_id', 'fournisseur_id', 'photo'];

    public function categorie(): BelongsTo
    {
        return $this->belongsTo(Categorie::class);
    }


    public function fournisseurs()
    {
        return $this->belongsToMany(Fournisseur::class );
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($article) {
            $article->reference = $article->generateReference();
        });

        static::created(function ($article) {
            $fournisseurs = request()->input('fournisseur_id');
            $article->fournisseurs()->attach($fournisseurs);
        });

        static::addGlobalScope('withRelations', function ($builder) {
            $builder->with('fournisseurs', 'categorie');
        });

        static::updating(function ($user) {
        });


        static::deleting(function ($user) {
            // Code pour supprimer un utilisateur
        });
    }


    public function generateReference()
    {
        $categorie = $this->categorie ? $this->categorie->libelle : 'NOCAT';
        return 'REF-' . substr($this->libelle, 0, 3) . '-' . strtoupper($categorie) . '-' . sprintf('%04d', static::count() + 1);
    }
}
