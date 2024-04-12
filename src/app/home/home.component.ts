import { Component, Renderer2, effect, inject, signal } from '@angular/core';
import { PokemonDataService } from '../shared/pokemon-data.service';
import { ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, scan, startWith, takeWhile, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import PokemonComponent from './ui/pokemon.component';
import { LoadingComponent } from './ui/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="w-full h-full flex flex-col">
      <mat-toolbar color="primary" class="shrink-0">
        <picture>
          <source
            srcset="assets/icons/pokemon-logo-small.webp"
            type="image/webp"
          />
          <source
            srcset="assets/icons/pokemon-logo-small.png"
            type="image/png"
          />
          <img
            src="assets/icons/pokemon-logo-small.png"
            height="64"
            width="155"
            alt="Pokemon Logo"
          />
        </picture>
        <span class="flex-auto"></span>
        <button
          mat-icon-button
          aria-label="Change Theme"
          (click)="changeTheme()"
        >
          <mat-icon> brightness_6 </mat-icon>
        </button>
      </mat-toolbar>
      <div class="flex-auto list" cdkScrollable>
        <ng-container *ngIf="pokemons$ | async as pokemons">
          <app-pokemon [pokemon]="pokemon" *ngFor="let pokemon of pokemons" />
        </ng-container>
        <ng-container *ngIf="!reachedEnd()"></ng-container>
        <app-loading />
      </div>
    </div>
  `,
  styles: `
    .list {
      height: 100%;
      padding: 1rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-gap: 1rem;
    }
  `,
  imports: [
    CommonModule,
    ScrollingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    PokemonComponent,
    LoadingComponent,
  ],
})
export default class HomeComponent {
  data = inject(PokemonDataService);
  scroller = inject(ScrollDispatcher);
  renderer = inject(Renderer2);
  #limit = 25;
  #reachedEnd = signal(false);
  reachedEnd = this.#reachedEnd.asReadonly();
  #darktheme = signal(false);
  #pokemons = this.data.pokemons$;
  pokemons$ = this.#pokemons.valueChanges.pipe(
    map((x) => x.data.pokemon_v2_pokemon),
    tap((x) => {
      if (x.length !== this.#limit) this.#reachedEnd.set(true);
    }),
    scan((all, newEntires) => [...all, ...newEntires])
  );
  #loadMore = toSignal(
    this.scroller.scrolled().pipe(
      filter((event) =>
        event ? event.measureScrollOffset('bottom') === 0 : false
      ),
      takeWhile((x) => !this.#reachedEnd()),
      map((x) => (x ? x.measureScrollOffset('bottom') : 0)),
      startWith(0),
      map((_, i) => i)
    )
  );
  changeTheme = () => {
    const darktheme = this.#darktheme();
    if (darktheme) this.renderer.removeClass(document.body, 'dark-theme');
    else this.renderer.addClass(document.body, 'dark-theme');
    this.#darktheme.set(!darktheme);
  };
  constructor() {
    effect(() => {
      const val = this.#loadMore() ?? 0;
      const offset = val * this.#limit;
      this.#pokemons.setVariables({ offset: offset, limit: this.#limit });
    });
  }
}
