import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UnaryFunction } from 'rxjs';
import { Task } from 'src/app/interfaces/Task';

@Component({
  selector: 'app-task-component',
  templateUrl: './task-component.component.html',
  styleUrls: ['./task-component.component.css']
})
export class TaskComponentComponent {
  @Input() task: Task | undefined;
  @Output() deleteTaskEvent = new EventEmitter<number>();
  // Необязательно, решил добавить. Нужен для изменения состояния задачи на выполненную
  @Output() completTaskEvent = new EventEmitter<Task>();

  isIndicate(date: Date | undefined): boolean {
    if (!date) 
      return false;
    return (new Date(date).valueOf() < new Date().valueOf() && !this.task?.completed);
  }

  handleDeleteTask (taskId: number | undefined) {
    this.deleteTaskEvent.emit(taskId);
  } 

  handleCompleteTask () {
    if (this.task) {
      this.task.completed = true;
      this.completTaskEvent.emit(this.task);
    }
  }
}
