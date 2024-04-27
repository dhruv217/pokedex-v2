import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Pokemon } from '../../shared/pokemon-data.service';
import { TypeColorDirective } from '../../shared/ui/type-color.directive';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card
      class="pokemon px-2 items-center mx-auto"
      [style]="'view-transition-name: bg-' + pokemon.id"
      [typeColor]="pokemon.pokemon_v2_pokemontypes"
    >
      <img
        [src]="pokemon.pokemon_v2_pokemonsprites[0].sprites"
        style="width: 96px; height: 96px; margin-top: 1rem;"
        [style]="'view-transition-name: img-' + pokemon.id"
        width="96px"
        height="96px"
      />
      <div
        class="absolute left-0 right-0 bottom-0 text-white text-center bg-gray-600/80"
      >
        {{ pokemon.name | titlecase }}
      </div>
    </mat-card>
  `,
  styles: `
    .pokemon {
      height: 140px;
      width: 140px;
    }
  `,
  imports: [CommonModule, MatCardModule, TypeColorDirective],
})
export default class PokemonComponent {
  @Input({ required: true }) pokemon!: Pokemon;
}
