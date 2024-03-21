import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { ProjectListComponentComponent } from './app/components/project-list-component/project-list-component.component';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
