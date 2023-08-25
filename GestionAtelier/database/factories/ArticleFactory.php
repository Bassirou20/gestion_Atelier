use Faker\Generator as Faker;
use App\Models\Article;

$factory->define(Article::class, function (Faker $faker) {
    return [
        'libelle' => $faker->sentence,
        'quantiteStock' => $faker->numberBetween(10, 100),
        // Ajoutez d'autres attributs ici
    ];
});
