import { Component, OnInit, Renderer2, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z2 sticky z-10">
      <picture>
        <source
          srcset="assets/icons/pokemon-logo-small.webp"
          type="image/webp"
        />
        <source srcset="assets/icons/pokemon-logo-small.png" type="image/png" />
        <img
          src="assets/icons/pokemon-logo-small.png"
          height="64"
          width="155"
          alt="Pokemon Logo"
        />
      </picture>
      <span class="flex-auto"></span>
      <button mat-icon-button aria-label="Change Theme" (click)="changeTheme()">
        <mat-icon> brightness_6 </mat-icon>
      </button>
    </mat-toolbar>
  `,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule],
})
export class ToolbarComponent {
  renderer = inject(Renderer2);
  #darktheme = signal(false);
  changeTheme = () => {
    const darktheme = this.#darktheme();
    if (darktheme) this.renderer.removeClass(document.body, 'light-theme');
    else this.renderer.addClass(document.body, 'light-theme');
    this.#darktheme.set(!darktheme);
  };
}
