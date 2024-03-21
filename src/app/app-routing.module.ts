import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProjectComponentComponent } from './components/edit-project-component/edit-project-component.component';
import { ProjectListComponentComponent } from './components/project-list-component/project-list-component.component';
import { TaskListComponentComponent } from './components/task-list-component/task-list-component.component';

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full'},
  { path: 'projects', component: ProjectListComponentComponent, pathMatch: 'full'},
  { path: 'projects/:id', component: EditProjectComponentComponent},
  { path: 'projects/new',  component: EditProjectComponentComponent},
  { path: 'tasks/:id', component: TaskListComponentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}




