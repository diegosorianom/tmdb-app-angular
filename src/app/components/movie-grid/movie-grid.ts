import { Component } from '@angular/core';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { phosphorFilmSlateFill } from '@ng-icons/phosphor-icons/fill';
import { phosphorPlus } from '@ng-icons/phosphor-icons/regular';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-movie-grid',
  imports: [NgIcon, RouterLink],
  templateUrl: './movie-grid.html',
  styleUrl: './movie-grid.css',
  viewProviders: [provideIcons({ phosphorPlus, phosphorFilmSlateFill })]
})
export class MovieGrid {

}
