import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorAcorn } from '@ng-icons/phosphor-icons/regular'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIcon],
  templateUrl: './app.html',
  styleUrl: './app.css',
  viewProviders: [provideIcons({ phosphorAcorn})]
})
export class App {
  protected readonly title = signal('tmdb-app-angular');
}
