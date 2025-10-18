import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorArrowBendUpLeftBold } from '@ng-icons/phosphor-icons/bold';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-return-component',
  imports: [NgIcon, RouterLink],
  templateUrl: './return-component.html',
  styleUrl: './return-component.css',
  viewProviders: [provideIcons({ phosphorArrowBendUpLeftBold })]
})
export class ReturnComponent {
  pageName = input.required<string>()
}
