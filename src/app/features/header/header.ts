import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Config } from '../../core/services/config';

@Component({
  selector: 'app-header',
  providers: [Config],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly configService: Config = inject(Config);
  protected readonly theme: Signal<'light' | 'dark'> = this.configService.theme;
  protected readonly username: Signal<string> = this.configService.username;
}
