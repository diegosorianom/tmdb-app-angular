import { Component, signal } from '@angular/core';
import { ReturnComponent } from "../../components/return-component/return-component";
import { SearchBar } from "../../components/search-bar/search-bar";

@Component({
  selector: 'app-search-page',
  imports: [ReturnComponent, SearchBar],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css'
})
export class SearchPage {
}
