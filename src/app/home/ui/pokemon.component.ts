import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Pokemon } from '../../shared/pokemon-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  template: `
    <mat-card class="px-2" style="flex-direction: row">
      <img
        [src]="pokemon.pokemon_v2_pokemonsprites[0].sprites"
        width="96px"
        height="96px"
        class="pl-2 pr-4"
      />
      <div class="flex flex-col justify-center">
        <h2 mat-h2 style="text-transform: capitalize;">
          #{{ pokemon.id }}: {{ pokemon.name }}
        </h2>
        <mat-chip-set aria-label="Pokemon Types">
          <mat-chip
            *ngFor="let type of pokemon.pokemon_v2_pokemontypes"
            [class]="[type.pokemon_v2_type.name, 'type']"
            >{{ type.pokemon_v2_type.name }}</mat-chip
          >
        </mat-chip-set>
      </div>
    </mat-card>
  `,
  imports: [CommonModule, MatCardModule, MatChipsModule],
})
export default class PokemonComponent {
  @Input({ required: true }) pokemon!: Pokemon;
}
