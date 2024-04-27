import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PokemonDataService } from './pokemon-data.service';

export const pokemonResolver: ResolveFn<Object> = (route, state) => {
  const id = Number(route.paramMap.get('id'));
  return inject(PokemonDataService).pokemonById$({ id });
};
