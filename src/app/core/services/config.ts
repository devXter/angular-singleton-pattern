import { computed, effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';

interface AppConfig {
  theme: 'light' | 'dark';
  language: string;
  username: string;
}

@Injectable()
export class Config {
  // Encapsulación: Para que nadie modifique el estado interno
  private readonly config: WritableSignal<AppConfig> = signal<AppConfig>({
    theme: 'light',
    language: 'en',
    username: 'admin',
  });

  public readonly theme: Signal<'light' | 'dark'> = computed(
    (): 'light' | 'dark' => this.config().theme,
  );
  public readonly language: Signal<string> = computed((): string => this.config().language);
  public readonly username: Signal<string> = computed((): string => this.config().username);

  constructor() {
    this.loadConfig();

    effect(() => {
      localStorage.setItem('app-config', JSON.stringify(this.config()));
    });
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.config.update((config: AppConfig): AppConfig => ({ ...config, theme }));
  }

  setLanguage(language: string): void {
    this.config.update((config: AppConfig): AppConfig => ({ ...config, language }));
  }

  setUsername(username: string): void {
    this.config.update((config: AppConfig): AppConfig => ({ ...config, username }));
  }

  private loadConfig(): void {
    const saved: string | null = localStorage.getItem('app-config');
    if (saved) {
      this.config.set(JSON.parse(saved));
    }
  }
}
