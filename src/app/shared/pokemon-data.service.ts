import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class PokemonDataService {
  apollo = inject(Apollo);
  pokemons$ = this.apollo.watchQuery<{ pokemon_v2_pokemon: Pokemon[] }>({
    query: gql`
      query Pokemon_v2_pokemon($offset: Int, $limit: Int) {
        pokemon_v2_pokemon(offset: $offset, limit: $limit) {
          id
          name
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
          pokemon_v2_pokemonsprites {
            sprites(path: "front_shiny")
          }
        }
      }
    `,
    variables: { offset: 0, limit: 25 },
  });
}

export interface Pokemon {
  id: number;
  name: string;
  pokemon_v2_pokemontypes: Pokemontype[];
  pokemon_v2_pokemonsprites: Pokemonsprite[];
}

export interface Pokemontype {
  pokemon_v2_type: PokemonV2Type;
}

export interface PokemonV2Type {
  name: string;
}

export interface Pokemonsprite {
  sprites: string;
}
