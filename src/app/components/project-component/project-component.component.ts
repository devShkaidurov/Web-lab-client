import { Component, Inject, Injectable, Input } from '@angular/core';
import { Project } from 'src/app/interfaces/Project';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-component',
  standalone: true,
  templateUrl: './project-component.component.html',
  styleUrls: ['./project-component.component.css'],
  imports: [DatePipe]
})

export class ProjectComponentComponent {
  @Input() project: Project | undefined;
  @Input() countOpenTask: number | undefined;
  constructor(private router: Router) { }

  goToUpdate(): void {
      if (this?.project?.id) {
        const navigationDetails = ['/projects', this.project.id];
        this.router.navigate(navigationDetails);
      }
  }

}
