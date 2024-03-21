import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectListComponentComponent } from './components/project-list-component/project-list-component.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TaskListComponentComponent } from './components/task-list-component/task-list-component.component';
import { EditProjectComponentComponent } from './components/edit-project-component/edit-project-component.component';
import { ProjectComponentComponent } from './components/project-component/project-component.component';

@NgModule({
  declarations: [
    ProjectListComponentComponent,
    TaskListComponentComponent,
    EditProjectComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProjectComponentComponent
  ],
  providers: [],
  bootstrap: [ProjectListComponentComponent]
})
export class AppModule { 
  
}
