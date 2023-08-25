use Faker\Generator as Faker;
use App\Models\Fournisseur;

$factory->define(Fournisseur::class, function (Faker $faker) {
    return [
        'name' => $faker->company,

    ];
});
