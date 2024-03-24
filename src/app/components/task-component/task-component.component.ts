import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/interfaces/Task';

@Component({
  selector: 'app-task-component',
  templateUrl: './task-component.component.html',
  styleUrls: ['./task-component.component.css']
})
export class TaskComponentComponent {
  @Input() task: Task | undefined;
  @Output() deleteTaskEvent = new EventEmitter<number>();

  isExpired(date: Date | undefined): boolean {
    if (!date) 
      return false;
    return new Date(date).valueOf() < new Date().valueOf();
  }

  handleDeleteTask (taskId: number | undefined) {
    this.deleteTaskEvent.emit(taskId);
  } 
}
