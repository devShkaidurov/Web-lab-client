import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { EditProjectComponentComponent } from './components/edit-project-component/edit-project-component.component';
import { ProjectListComponentComponent } from './components/project-list-component/project-list-component.component';
import { TaskListComponentComponent } from './components/task-list-component/task-list-component.component';

const routes: Routes = [
  { path: 'projects', component: ProjectListComponentComponent, pathMatch: 'full'},
  { path: 'projects/:id', component: EditProjectComponentComponent},
  { path: 'projects/new',  component: EditProjectComponentComponent},
  { path: 'tasks/:projectId', component: TaskListComponentComponent},
  { path: 'tasks/:projectId/new', component: AddTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withComponentInputBinding())
  ]
})
export class AppRoutingModule {}




