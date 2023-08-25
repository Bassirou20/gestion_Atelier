<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleRequest extends FormRequest
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
            'libelle' => 'required|string',
            'prix' => 'required|numeric',
            'quantiteStock' => 'required|integer',
            'categorie_id' => 'required|exists:categories,id',
            'photo' => 'nullable|string'
        ];
    }
}
