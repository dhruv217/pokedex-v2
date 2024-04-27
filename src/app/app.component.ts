import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/ui/toolbar.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent],
  template: `
    <div class="w-full h-full flex flex-col">
      <app-toolbar />
      <div class="flex-auto">
        <router-outlet />
      </div>
    </div>
  `,
})
export class AppComponent {}
