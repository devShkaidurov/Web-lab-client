import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/interfaces/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list-component',
  templateUrl: './task-list-component.component.html',
  styleUrls: ['./task-list-component.component.css']
})
export class TaskListComponentComponent implements OnInit {
  id: number | undefined;
  tasks: Task[] | undefined;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('projectId'));
    if (!this.id) {
      alert("Не удалось получить идентификатор проекта!");
      this.router.navigate(['projects']);
      return;
    }

    this.taskService.get(this.id)
      .subscribe({
        next: (tasks) => {
          console.dir(tasks);
          this.tasks = tasks;
        },
        error: (err) => {
          alert("Ошибка получения данных!");
        }
      })
  }

  handleGoToBack(): void {
    this.router.navigate(['projects']);
  }
}
