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
  projectId: number | undefined;
  tasks: Task[] | undefined;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    if (!this.projectId) {
      alert("Не удалось получить идентификатор проекта!");
      this.router.navigate(['projects']);
      return;
    }

    this.taskService.get(this.projectId)
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

  deleteTaskByEvent(taskId: number):void {
    this.taskService.deleteTaskById(this.projectId, taskId)
      .subscribe({
        next: () => {
          const index = this.tasks?.findIndex((task) => {
            return task.id === taskId;
          });
          if (!index)
            return;
          this.tasks?.splice(index, 1);
          setTimeout(() => {
            alert("Задача успешно удалена!");
          }, 100);
        },
        error: (err: any) => {
          alert(err);
        }
      })
  }
}
