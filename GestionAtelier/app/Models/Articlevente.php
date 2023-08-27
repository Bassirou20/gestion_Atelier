<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Articlevente extends Model
{
    use HasFactory;

    protected $guarded=[
        'id'
    ];

    public function categorie(): BelongsTo
    {
        return $this->belongsTo(Categorie::class);
    }
     public function article()
    {
        return $this->belongsToMany(Article::class, 'article_articleventes')
        ->withTimestamps();
    }


    public function generateReference()
    {
        $categorie = $this->categorie ? $this->categorie->libelle : 'NOCAT';
        return 'REF-' . substr($this->libelle, 0, 3) . '-' . strtoupper($categorie) . '-' . sprintf('%04d', static::count() + 1);
    }


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($article) {
            $article->reference = $article->generateReference();
        });

        static::created(function ($articlevente) {
            $article = request()->input('article_id');
            $articlevente->article()->attach($article);
        });

        static::updating(function ($user) {
        });

    }
}
