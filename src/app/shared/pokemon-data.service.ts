import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokemonDataService {
  apollo = inject(Apollo);
  pokemons$ = (variables: { offset: number; limit: number }) =>
    this.apollo
      .query<{ pokemon_v2_pokemon: Pokemon[] }>({
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
        variables,
      })
      .pipe(map((x) => x.data.pokemon_v2_pokemon));
  pokemonById$ = (variables: { id: number }) =>
    this.apollo
      .query<{ pokemon_v2_pokemon_by_pk: PokemonByPk }>({
        query: gql`
          query Pokemon_v2_pokemon_by_pk($id: Int!) {
            pokemon_v2_pokemon_by_pk(id: $id) {
              id
              height
              weight
              name
              pokemon_v2_pokemonabilities {
                pokemon_v2_ability {
                  name
                }
              }
              pokemon_v2_pokemonstats {
                base_stat
                pokemon_v2_stat {
                  name
                  game_index
                }
              }
              pokemon_v2_pokemonsprites {
                sprites(path: "front_shiny")
              }
              pokemon_v2_pokemontypes(order_by: { slot: asc }) {
                pokemon_v2_type {
                  name
                }
              }
              pokemon_v2_pokemonmoves {
                pokemon_v2_move {
                  id
                  name
                  accuracy
                  pp
                  power
                  pokemon_v2_type {
                    name
                  }
                }
                level
              }
              pokemon_v2_pokemonspecy {
                pokemon_v2_pokemonspeciesflavortexts(
                  where: {
                    language_id: { _eq: 9 }
                    pokemon_v2_version: { id: { _eq: 12 } }
                  }
                ) {
                  flavor_text
                }
                capture_rate
                gender_rate
                hatch_counter
                pokemon_v2_pokemonegggroups {
                  pokemon_v2_egggroup {
                    name
                  }
                }
                pokemon_v2_pokemonhabitat {
                  name
                }
              }
            }
          }
        `,
        variables,
      })
      .pipe(map((x) => x.data.pokemon_v2_pokemon_by_pk));
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

export interface PokemonByPk {
  id: number;
  name: string;
  height: number;
  weight: number;
  isLoaded: boolean;
  pokemon_v2_pokemonabilities: Pokemonability[];
  pokemon_v2_pokemonstats: Pokemonstat[];
  pokemon_v2_pokemonsprites: Pokemonsprite[];
  pokemon_v2_pokemontypes: Pokemontype[];
  pokemon_v2_pokemonmoves: Pokemonmfe[];
  pokemon_v2_pokemonspecy: {
    pokemon_v2_pokemonspeciesflavortexts: {
      flavor_text: string;
    }[];
    capture_rate: number;
    gender_rate: number;
    hatch_counter: number;
    pokemon_v2_pokemonegggroups: {
      pokemon_v2_egggroup: {
        name: string;
      };
    }[];
    pokemon_v2_pokemonhabitat: {
      name: string;
    };
  };
}

export interface Pokemonability {
  pokemon_v2_ability: PokemonV2Ability;
}

export interface PokemonV2Ability {
  name: string;
}

export interface Pokemonstat {
  base_stat: number;
  pokemon_v2_stat: PokemonV2Stat;
}

export interface PokemonV2Stat {
  name: string;
  game_index: number;
}

export interface Pokemonsprite {
  sprites: string;
}

export interface Pokemontype {
  pokemon_v2_type: PokemonV2Type;
}

export interface Pokemonmfe {
  pokemon_v2_move: PokemonV2Move;
  level: number;
}

export interface PokemonV2Move {
  id: number;
  name: string;
  accuracy?: number;
  pp: number;
  power?: number;
  pokemon_v2_type: PokemonV2Type;
}
