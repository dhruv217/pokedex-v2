import { Directive, ElementRef, Input, inject } from '@angular/core';
import { Pokemontype } from '../pokemon-data.service';

@Directive({
  standalone: true,
  selector: '[typeColor]',
})
export class TypeColorDirective {
  #el = inject(ElementRef);
  #types: string[] = [];
  @Input() set typeColor(types: Pokemontype[]) {
    this.#types = types.map((x) => x.pokemon_v2_type.name);
    this.setBackgroundColor();
  }

  private setBackgroundColor() {
    if (this.#types.length > 1) {
      this.#el.nativeElement.style.background = `linear-gradient(90deg, ${
        color_dict[this.#types[0] as keyof typeof color_dict]
      } 50%, ${color_dict[this.#types[1] as keyof typeof color_dict]} 50%)`;
      return;
    }
    this.#el.nativeElement.style.background =
      color_dict[this.#types[0] as keyof typeof color_dict];
  }
}

const color_dict = {
  normal: '#a8a878',
  fire: '#f08030',
  fighting: '#c03028',
  water: '#6890f0',
  grass: '#78c850',
  poison: '#a040a0',
  electric: '#f8d030',
  ground: '#e0c068',
  rock: '#b8a038',
  bug: '#a8b820',
  dragon: '#7038f8',
  ghost: '#705898',
  dark: '#705848',
  fairy: '#ee99ac',
  steel: '#b8b8d0',
  psychic: '#f85888',
  ice: '#98d8d8',
  flying: '#a890f0',
};
