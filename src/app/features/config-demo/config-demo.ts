import { ChangeDetectionStrategy, Component, effect, inject, Signal } from '@angular/core';
import { Config } from '../../core/services/config';
import { Header } from '../header/header';

@Component({
  selector: 'app-config-demo',
  templateUrl: './config-demo.html',
  styleUrl: './config-demo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigDemo {
  protected readonly configService: Config = inject(Config);

  protected readonly theme: Signal<'light' | 'dark'> = this.configService.theme;
  protected readonly language: Signal<string> = this.configService.language;
  protected readonly username: Signal<string> = this.configService.username;

  protected toggleTheme(): void {
    const newTheme: 'light' | 'dark' = this.theme() === 'light' ? 'dark' : 'light';
    this.configService.setTheme(newTheme);
  }

  protected changeLanguage(lang: string): void {
    this.configService.setLanguage(lang);
  }

  protected onUsernameChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.configService.setUsername(input.value);
  }
}
