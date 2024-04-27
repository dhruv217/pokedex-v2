import { Component, Input, OnInit } from '@angular/core';
import { StatNamePipe } from './stat-name.pipe';
import { Pokemonstat } from '../../shared/pokemon-data.service';
import { CommonModule } from '@angular/common';
import { StatRatioPipe } from './stat-ratio.pipe';

@Component({
  selector: 'app-pokemon-stats',
  standalone: true,
  template: `
    <div class="mt-2 max-w-52 min-w-24">
      <div class="flex mt-1 ml-1" *ngFor="let stat of stats">
        <span class="basis-0 grow">{{
          stat.pokemon_v2_stat.name | statName
        }}</span
        ><span
          class="relative basis-0 grow"
          style="background: rgba(0, 0, 0, 0.2)"
          ><div
            [style.transform]="'scaleX(' + (stat.base_stat | statRatio) + ')'"
            class="absolute top-0 bottom-0 left-0 right-0 origin-left"
            [class]="[type]"
          ></div>
          <div
            style="color: #fff"
            class="absolute top-0 bottom-0 left-0 right-0 ml-2"
          >
            {{ stat.base_stat }}
          </div></span
        >
      </div>
    </div>
  `,
  imports: [CommonModule, StatNamePipe, StatRatioPipe],
})
export default class PokemonStatsComponent {
  @Input({ required: true }) stats!: Pokemonstat[];
  @Input({ required: true }) type!: string;
}
