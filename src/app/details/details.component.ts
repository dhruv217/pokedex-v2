import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { TypeColorDirective } from '../shared/ui/type-color.directive';
import { StatNamePipe } from './ui/stat-name.pipe';
import PokemonStatsComponent from './ui/pokemon-stats.component';
import PokemonProfileComponent from './ui/pokemon-profile.component';
import PokemonMovesComponent from './ui/pokemon-moves.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { LoadingComponent } from '../shared/ui/loading.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-full p-2 relative" *ngIf="pokemon$ | async as pokemon">
      <div
        class="absolute inset-0 z-10"
        [typeColor]="pokemon.pokemon_v2_pokemontypes"
        [style]="'view-transition-name: bg-' + pokemon.id"
      ></div>
      <div class="absolute top-1.5 -left-1 z-20" @backButtonTrigger>
        <button mat-icon-button [routerLink]="['/']">
          <mat-icon style="color: white; transform: scale(1.5)"
            >arrow_back</mat-icon
          >
        </button>
      </div>
      <div
        @contentTrigger
        class="absolute top-0 left-2 right-2 bottom-0 z-20 flex flex-col mt-14 mb-2 mx-auto mat-app-background max-w-2xl list"
      >
        <span
          class="h-12 text-2xl flex justify-center items-center"
          [class]="[
            pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name + '-darker'
          ]"
          >{{ pokemon.name | titlecase }}</span
        >
        <div class="flex flex-row p-4">
          <img
            [src]="pokemon.pokemon_v2_pokemonsprites[0].sprites"
            [style]="'view-transition-name: img-' + pokemon.id"
            style="width: 120px;height: 120px;transform: scale(1.5)"
            width="120px"
            height="120px"
            class="self-center px-2 my-2 ml-2 mr-6"
          />
          <div class="flex-1">
            <div class="w-full flex flex-row justify-between">
              <mat-chip-set aria-label="Pokemon Types">
                <mat-chip
                  *ngFor="let type of pokemon.pokemon_v2_pokemontypes"
                  [class]="[type.pokemon_v2_type.name, 'type']"
                  >{{ type.pokemon_v2_type.name }}</mat-chip
                >
              </mat-chip-set>
              <span class="text-xl flex items-center">#{{ pokemon.id }}</span>
            </div>
            <app-pokemon-stats
              [stats]="pokemon.pokemon_v2_pokemonstats"
              [type]="pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name"
            />
          </div>
        </div>
        <div>
          <p class="mb-4 mx-8 mt-0">
            {{
              pokemon.pokemon_v2_pokemonspecy
                .pokemon_v2_pokemonspeciesflavortexts[0].flavor_text
            }}
          </p>
        </div>
        <app-pokemon-profile [pokemon]="pokemon" />
        <app-pokemon-moves [pokemon]="pokemon" />
      </div>
    </div>
  `,
  animations: [
    trigger('backButtonTrigger', [
      transition(':enter', [
        style({ left: '-2rem' }),
        animate('250ms', style({ left: '-0.25rem' })),
      ]),
      transition(':leave', [animate('250ms', style({ left: '-2rem' }))]),
    ]),
    trigger('contentTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('500ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatChipsModule,
    TypeColorDirective,
    StatNamePipe,
    PokemonStatsComponent,
    PokemonProfileComponent,
    PokemonMovesComponent,
    LoadingComponent,
    ScrollingModule,
  ],
})
export default class DetailsComponent {
  #route = inject(ActivatedRoute);
  pokemon$ = this.#route.data.pipe(map((x) => x['pokemon']));
}
