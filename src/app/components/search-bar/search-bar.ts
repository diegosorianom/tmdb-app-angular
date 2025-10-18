import { Component, input, output, signal } from '@angular/core';
import { timeout } from 'rxjs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorMagnifyingGlass, phosphorX } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'app-search-bar',
  imports: [NgIcon],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
  viewProviders: [provideIcons({ phosphorX, phosphorMagnifyingGlass })]
})
export class SearchBar {
  placeholder = input('Buscar...')
  searchMode = input<'api' | 'local'>('api')
  debounceTime = input(300)

  search = output<string>()
  searchTermChanged = output<string>()

  protected searchTerm = signal('')

  private timeoutId: any;

  protected onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.searchTerm.set(value)
    this.handleSearch(value)
  }

  private handleSearch(term: string): void {
    clearTimeout(this.timeoutId)

    this.timeoutId = setTimeout(() => {
      this.searchTermChanged.emit(term)

      if (term.length >= 2 || term.length === 0) {
        this.search.emit(term)
      }
    }, this.debounceTime());
  }
}
