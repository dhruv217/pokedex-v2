import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PokemonByPk } from '../../shared/pokemon-data.service';
import { GenderRatioPipe } from './gender-ratio.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-profile',
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
        Profile
      </h2>
      <div class="flex mx-6 sm:mx-14 mb-4">
        <strong class="basis-1/5 grow shrink">Height:</strong>
        <span class="grow shrink" style="flex-basis: 30%"
          >{{ pokemon.height / 10 }} m</span
        >
        <strong class="basis-1/5 grow shrink">Weight:</strong>
        <span class="grow shrink" style="flex-basis: 30%"
          >{{ pokemon.weight / 10 | number : '1.1-1' }} kg</span
        >
      </div>
      <div class="flex mx-6 sm:mx-14 mb-4">
        <strong class="basis-1/5 grow shrink">Catch Rate:</strong>
        <span class="grow shrink" style="flex-basis: 30%"
          >{{ pokemon.pokemon_v2_pokemonspecy.capture_rate }}%</span
        >
        <strong class="basis-1/5 grow shrink">Gender Ratio:</strong>
        <span class="grow shrink" style="flex-basis: 30%">{{
          pokemon.pokemon_v2_pokemonspecy.gender_rate | genderRatio
        }}</span>
      </div>
      <div class="flex mx-6 sm:mx-14 mb-4">
        <strong class="basis-1/5 grow shrink">Egg Groups:</strong>
        <span class="grow shrink" style="flex-basis: 30%">
          @for (grp of
          pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonegggroups; track
          grp.pokemon_v2_egggroup.name;let i = $index) {
          {{ grp.pokemon_v2_egggroup.name | titlecase }}@if (i !=
          pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonegggroups.length -
          1) {,} }
        </span>
        <strong class="basis-1/5 grow shrink">Hatch Steps:</strong>
        <span class="grow shrink" style="flex-basis: 30%">{{
          pokemon.pokemon_v2_pokemonspecy.hatch_counter * 255 | number : '1.0-0'
        }}</span>
      </div>
      <div class="flex mx-6 sm:mx-14 mb-4">
        <strong class="basis-1/5 grow shrink">Abilities:</strong>
        <span class="grow shrink" style="flex-basis: 30%">
          @for (grp of pokemon.pokemon_v2_pokemonabilities; track
          grp.pokemon_v2_ability.name;let i = $index) {
          {{ grp.pokemon_v2_ability.name | titlecase }}@if (i !=
          pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonegggroups.length -
          1) {,} }
        </span>
        <strong class="basis-1/5 grow shrink">Habitat:</strong>
        <span class="grow shrink" style="flex-basis: 30%">{{
          pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonhabitat.name | titlecase
        }}</span>
      </div>
    </div>
  `,
  imports: [CommonModule, GenderRatioPipe],
})
export default class PokemonProfileComponent {
  @Input({ required: true }) pokemon!: PokemonByPk;
}
