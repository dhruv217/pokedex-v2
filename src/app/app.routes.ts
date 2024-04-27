import { Routes } from '@angular/router';
import { pokemonResolver } from './shared/pokemon-resolver.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component'),
    data: { animation: 'Home' },
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./details/details.component'),
    data: { animation: 'Details' },
    resolve: { pokemon: pokemonResolver },
  },
];
