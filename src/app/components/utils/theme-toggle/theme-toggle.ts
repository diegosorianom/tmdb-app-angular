import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorSunFill, phosphorMoonFill } from '@ng-icons/phosphor-icons/fill'

@Component({
  selector: 'app-theme-toggle',
  imports: [NgIcon],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
  viewProviders: [provideIcons({ phosphorSunFill, phosphorMoonFill})]
})
export class ThemeToggle {
  isDarkMode = false;

  ngOnInit() {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.applyTheme()
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme()
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private applyTheme() {
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }
}
