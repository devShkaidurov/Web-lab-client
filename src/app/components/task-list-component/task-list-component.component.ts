import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/interfaces/Project';
import { Task } from 'src/app/interfaces/Task';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list-component',
  templateUrl: './task-list-component.component.html',
  styleUrls: ['./task-list-component.component.css']
})
export class TaskListComponentComponent implements OnInit {
  // Сделал для себя: передаем project как пропс, чтобы отобразить название и описание проекта
  // Отсюда можно взять также и ID проекта, но по заданию надо из URL
  // Поэтому ниже реализовал это через projectId
  project: Project | undefined;
  
  // Так надо было по заданию (берем ID проекта из URL)
  projectId: number | undefined; 
  tasks: Task[] | undefined;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    // Наверное, это может быть неправильно. И лучше прокидывать метод удаления извне или вызывать событие какое-то
    // Однако пока не придумал менее костыльного решения, чем напрямую дернуть сюда сервис проектов 
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.project = history.state.project;
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

  deleteTaskByEvent(taskId: number): void {
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

  setCompleteTaskEvent(task: Task): void {
    this.taskService.setCompleteTask(this.projectId, task.id, task)
      .subscribe({
        next: (task) => {
          alert(`Задача ${task.nameTask} помечена как выполненная!`);
        },
        error: () => {
          alert("Ошибка изменения статуса задачи!");
        }
      })
  }

  handleRemoveProject(projectId: number | undefined): void {
    this.projectService.deleteById(projectId)
      .subscribe({
        next: () => {
          alert("Проект успешно удален!");
          this.handleGoToBack();
        },
        error: () => {
          alert("Ошибка удаления проекта!");
        }
      })
  }

  handleCreateNewTask(): void {
    this.router.navigate(['tasks', this.projectId, 'new'], {state: { project: this.project }});
  }
}
