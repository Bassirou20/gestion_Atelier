<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArtventeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'libelle' => 'required|string|unique:articleventes,libelle,',
            'prix_confection' => 'required|numeric',
            'prix_vente' => 'numeric',
            'marge' => 'numeric',
            'categorie_id' => 'required|exists:categories,id',
            'photo' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'libelle.required' => 'Le champ libellé est requis.',
            'libelle.unique' => 'Ce libellé est déjà utilisé.',
            'prix_confection.required' => 'Le champ prix de confection est requis.',
            'prix_confection.numeric' => 'Le champ prix de confection doit être un nombre.',
            'prix_vente.numeric' => 'Le champ prix de vente doit être un nombre.',
            'marge.numeric' => 'Le champ marge doit être un nombre.',
            'categorie_id.required' => 'Le champ catégorie est requis.',
            'categorie_id.exists' => 'La catégorie sélectionnée n\'existe pas.',
            'photo.required' => 'Le champ photo est requis.',
        ];
    }
}
