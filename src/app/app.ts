import { Component, signal } from '@angular/core';
import { ConfigDemo } from './features/config-demo/config-demo';
import { Header } from './features/header/header';

@Component({
  selector: 'app-root',
  imports: [ConfigDemo, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
