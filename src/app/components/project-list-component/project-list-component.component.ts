import { Component, OnInit, ɵsetAlternateWeakRefImpl } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Project } from 'src/app/interfaces/Project';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectComponentComponent } from '../project-component/project-component.component';

@Component({
  selector: 'app-project-list-component',
  templateUrl: './project-list-component.component.html',
  styleUrls: ['./project-list-component.component.css'],
})
export class ProjectListComponentComponent implements OnInit {
  projects: Project[] | undefined;
  dictOpenedTask: any;

  constructor (
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      forkJoin(
        this.projectService.getAll(""),
        this.projectService.getOpenedTask()
      )
      .subscribe(([projects, dict]) => {
        console.dir(projects);
        this.projects = projects;
        this.dictOpenedTask = dict;
      })
  }

  handleFilterByEnter (phrase: string): void {
    this.projectService.getAll(phrase).subscribe((projects) => {
      this.projects = projects;
    })
  }

  openProjectInfo (id: number): void {
    console.dir(id);
    if (!id) {
      alert("Идентификатор проекта утерян!");
      return;
    }
    this.router.navigate(['tasks', id]);
  }
}
