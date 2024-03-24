import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/interfaces/Project';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../interfaces/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  projectId: number | undefined;
  // Приходить тащить его везде за собой
  project: Project | undefined;
  
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.project = history.state.project;
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    if (!this.projectId) {
      alert("Не удалось получить идентификатор проекта!");
      this.router.navigate(['projects']);
      return;
    }
  }

  handleAddTask(name: string, desc: string, date: string): void {
    const task: Task = {
      id: 0,
      nameTask: name,
      descriptionTask: desc,
      plannedFinishDate: new Date(date),
      completed: false
    };

    this.taskService.createTask(this.projectId, task)
      .subscribe({
        next: () => {
          alert("Задача успешно создана!");
          this.handleGoBack();
        },
        error: () => {
          alert("Ошибка при создании задачи!");
        }
      })
    
  }

  handleGoBack(): void {
    this.router.navigate(["tasks", this.projectId], {state: { project: this.project }});
  }
}
