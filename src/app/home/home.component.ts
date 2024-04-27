import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Pokemon, PokemonDataService } from '../shared/pokemon-data.service';
import { ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  Subject,
  filter,
  map,
  scan,
  startWith,
  switchMap,
  takeWhile,
  tap,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import PokemonComponent from './ui/pokemon.component';
import { LoadingComponent } from '../shared/ui/loading.component';
import {
  BreakpointObserver,
  Breakpoints,
  MediaMatcher,
} from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <div class="list h-full gap-4 p-8" cdkScrollable>
      <app-pokemon
        *ngFor="let pokemon of pokemons$ | async; trackBy: tracker"
        [pokemon]="pokemon"
        [routerLink]="['pokemon', pokemon.id]"
        [state]="pokemon"
      />
      @if (!reachedEnd()) {
      <div class="grid place-content-center">
        <app-loading />
      </div>
      }
    </div>
  `,
  styles: `
    .list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      overflow: auto;
      contain: strict;
      transform: translateZ(0);
      will-change: scroll-position;
      -webkit-overflow-scrolling: touch;
      @media(max-width: 360px) {
        padding: 1rem 0.64rem;
      }
    }
  `,
  imports: [
    CommonModule,
    ScrollingModule,
    PokemonComponent,
    LoadingComponent,
    RouterModule,
  ],
})
export default class HomeComponent {
  #data = inject(PokemonDataService);
  #scroller = inject(ScrollDispatcher);
  #breakpoints = inject(BreakpointObserver);
  #limit = toSignal(
    this.#breakpoints.observe([...displayNameMap.keys()]).pipe(
      map((x) => {
        for (const key of displayNameMap.keys()) {
          if (x.breakpoints[key]) {
            console.log(key, x.breakpoints[key]);
            return displayNameMap.get(key);
          }
        }
        return 25;
      })
    )
  );
  #reachedEnd = signal(false);
  reachedEnd = this.#reachedEnd.asReadonly();
  #loadMore = toSignal<number>(
    this.#scroller.scrolled(100).pipe(
      filter((event) =>
        event ? event.measureScrollOffset('bottom') === 0 : false
      ),
      takeWhile((x) => !this.#reachedEnd()),
      map((x) => (x ? x.measureScrollOffset('bottom') : 0)),
      startWith(0),
      map((_, i) => i)
    )
  );
  offset$ = new Subject<{ offset: number; limit: number }>();
  pokemons$ = this.offset$.asObservable().pipe(
    switchMap((x) => this.#data.pokemons$(x)),
    tap((x) => {
      if (x.length !== this.#limit()) this.#reachedEnd.set(true);
    }),
    scan((all, newEntires) => [...all, ...newEntires])
  );
  constructor() {
    console.log(this.#limit());
    effect(() => {
      const limit = this.#limit() ?? 25;
      const page = this.#loadMore() ?? 0;
      this.offset$.next({ offset: page * limit, limit });
    });
  }
  tracker = (_: number, pokemon: Pokemon) => pokemon.id;
}
const displayNameMap = new Map([
  [Breakpoints.XSmall, 16],
  [Breakpoints.Small, 21],
  [Breakpoints.Medium, 50],
  [Breakpoints.Large, 60],
  [Breakpoints.XLarge, 120],
]);
