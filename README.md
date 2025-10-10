# Angular Singleton Pattern

Proyecto de demostración que implementa el **patrón de diseño Singleton** en Angular usando las características modernas del framework, incluyendo Angular Signals y Dependency Injection.

## Descripción

Este proyecto muestra cómo implementar correctamente el patrón Singleton en Angular para gestionar el estado global de la aplicación. Utiliza un servicio de configuración centralizado que mantiene preferencias del usuario (tema, idioma, nombre de usuario) y demuestra las mejores prácticas de Angular moderno.

## Características principales

- **Patrón Singleton**: Implementado mediante `providedIn: 'root'` garantizando una única instancia del servicio
- **Angular Signals**: Manejo de estado reactivo con las nuevas Signals de Angular
- **Encapsulación**: Estado privado con exposición controlada mediante computed signals
- **Persistencia**: Guardado automático en localStorage usando effects
- **Reactividad**: Actualización automática de múltiples componentes al cambiar el estado
- **TypeScript**: Fuertemente tipado para mayor seguridad
- **TailwindCSS**: Estilos modernos y responsivos

## Tecnologías

- **Angular**: 20.3.0
- **TypeScript**: ~5.9.2
- **TailwindCSS**: ^4.1.14
- **RxJS**: ~7.8.0
- **Bun**: Como runtime alternativo

## Estructura del proyecto

```
src/
├── app/
│   ├── core/
│   │   └── services/
│   │       ├── config.ts          # Servicio Singleton de configuración
│   │       └── config.spec.ts     # Tests del servicio
│   ├── features/
│   │   ├── config-demo/           # Componente de demostración
│   │   │   ├── config-demo.ts
│   │   │   ├── config-demo.html
│   │   │   └── config-demo.css
│   │   └── header/                # Componente de header
│   │       ├── header.ts
│   │       └── header.html
│   ├── app.ts                     # Componente raíz
│   └── app.config.ts              # Configuración de la app
└── main.ts                        # Punto de entrada
```

## Implementación del patrón Singleton

### Servicio de configuración (src/app/core/services/config.ts)

```typescript
@Injectable({
  providedIn: 'root',  // ← Clave para el patrón Singleton
})
export class Config {
  // Estado privado encapsulado
  private readonly config: WritableSignal<AppConfig> = signal<AppConfig>({
    theme: 'light',
    language: 'en',
    username: 'admin',
  });

  // Exposición controlada mediante computed signals
  public readonly theme: Signal<'light' | 'dark'> = computed(() => this.config().theme);
  public readonly language: Signal<string> = computed(() => this.config().language);
  public readonly username: Signal<string> = computed(() => this.config().username);

  constructor() {
    this.loadConfig();

    // Persistencia automática
    effect(() => {
      localStorage.setItem('app-config', JSON.stringify(this.config()));
    });
  }

  // Métodos públicos para modificar el estado
  setTheme(theme: 'light' | 'dark'): void {
    this.config.update((config) => ({ ...config, theme }));
  }
}
```

### Ventajas de esta implementación

1. **Una única instancia**: Angular garantiza que solo exista una instancia del servicio en toda la aplicación
2. **Estado compartido**: Múltiples componentes pueden acceder al mismo estado
3. **Reactividad automática**: Los componentes se actualizan automáticamente cuando cambia el estado
4. **Encapsulación**: El estado interno está protegido y solo se expone mediante signals de solo lectura
5. **Persistencia**: El estado se guarda automáticamente en localStorage
6. **Type-safety**: TypeScript proporciona validación de tipos en tiempo de compilación

## Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd angular-singleton-pattern

# Instalar dependencias
npm install
# o con bun
bun install
```

## Comandos disponibles

### Servidor de desarrollo

```bash
npm start
# o
ng serve
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente al modificar archivos.

### Build

```bash
npm run build
# o
ng build
```

Los artefactos de compilación se almacenarán en el directorio `dist/`.

### Tests

```bash
npm test
# o
ng test
```

Ejecuta los tests unitarios con [Karma](https://karma-runner.github.io).

### Desarrollo con watch mode

```bash
npm run watch
```

Compila el proyecto en modo desarrollo con recarga automática.

## Uso del patrón en la aplicación

### Inyección del servicio

```typescript
export class ConfigDemo {
  protected readonly configService: Config = inject(Config);

  // Acceso a los signals
  protected readonly theme: Signal<'light' | 'dark'> = this.configService.theme;
  protected readonly language: Signal<string> = this.configService.language;

  // Modificación del estado
  protected toggleTheme(): void {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.configService.setTheme(newTheme);
  }
}
```

### Reactividad en templates

```html
<div [class.bg-gray-900]="theme() === 'dark'">
  <p>Usuario: {{ username() }}</p>
  <p>Idioma: {{ language() }}</p>
</div>
```

## Conceptos demostrados

- **Patrón Singleton**: Una única instancia compartida en toda la aplicación
- **Dependency Injection**: Inyección de dependencias con `inject()`
- **Signals**: Manejo de estado reactivo con `signal()` y `computed()`
- **Effects**: Efectos secundarios con `effect()`
- **Encapsulación**: Separación entre estado privado y API pública
- **OnPush Change Detection**: Optimización de rendimiento
- **Standalone Components**: Componentes sin módulos

## Recursos adicionales

- [Angular Documentation](https://angular.dev)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [Dependency Injection in Angular](https://angular.dev/guide/di)
- [Design Patterns: Singleton](https://refactoring.guru/design-patterns/singleton)

## Licencia

Este proyecto es de código abierto y está disponible para fines educativos.
