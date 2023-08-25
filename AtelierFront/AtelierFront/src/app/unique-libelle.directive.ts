import { Directive,Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appUniqueLibelle]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UniqueLibelleDirective, multi: true }]
})
export class UniqueLibelleDirective implements Validator{
  validate(control: AbstractControl): ValidationErrors | null {
    const libelleValue = control.value;

    if (!libelleValue || libelleValue.length < 3) {
      return { minlength: true };
    }

    // Ici, vous pouvez implémenter la logique pour vérifier si la valeur existe déjà

    return null; // Aucune erreur de validation
  }

  constructor() { }

}
