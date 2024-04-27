import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PokemonByPk, Pokemonmfe } from '../../shared/pokemon-data.service';
import { GenderRatioPipe } from './gender-ratio.pipe';

@Component({
  selector: 'app-pokemon-moves',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <h2
        class="mx-4 sm:mx-8 my-4 text-xl px-2 py-1"
        [class]="[
          pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type.name + '-darker'
        ]"
      >
        Moves
      </h2>
      <div class="px-6 sm:px-14">
        <mat-list class="moves">
          <cdk-virtual-scroll-viewport class="h-full" itemSize="64">
            <mat-list-item
              *cdkVirtualFor="let move of pokemon.pokemon_v2_pokemonmoves"
              class="move"
            >
              <div class="w-full flex items-center">
                <span class="basis-1/12 grow shrink">{{ move.level }}</span>
                <div class="basis-9/12 grow shrink">
                  <span class="w-full">{{
                    move.pokemon_v2_move.name | titlecase
                  }}</span>
                  <div class="flex">
                    <span class="basis-1/3"
                      ><strong>Pow:</strong>
                      {{ move.pokemon_v2_move.power ?? 'NA' }}</span
                    >
                    <span class="basis-1/3"
                      ><strong>Acc:</strong>
                      {{ move.pokemon_v2_move.accuracy }}%</span
                    >
                    <span class="basis-1/3"
                      ><strong>PP:</strong> {{ move.pokemon_v2_move.pp }}</span
                    >
                  </div>
                </div>
                <span
                  class="basis-2/12 px-4 text-white grow shrink"
                  [class]="move.pokemon_v2_move.pokemon_v2_type.name"
                  >{{
                    move.pokemon_v2_move.pokemon_v2_type.name | titlecase
                  }}</span
                >
              </div>
            </mat-list-item>
          </cdk-virtual-scroll-viewport>
        </mat-list>
      </div>
    </div>
  `,
  styles: `
    .moves {
      height: 64vh;
    }
    .move {
      --mdc-list-list-item-one-line-container-height: 64px;
      border-bottom: 1px solid #ddd;
    }
    .move:last-child {
      border-bottom: none
    }
  `,
  imports: [CommonModule, GenderRatioPipe, MatListModule, ScrollingModule],
})
export default class PokemonMovesComponent {
  @Input({ required: true }) pokemon!: PokemonByPk;
  track_by_move = (move: Pokemonmfe) => move.pokemon_v2_move.id;
}
