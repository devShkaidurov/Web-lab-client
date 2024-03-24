import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/interfaces/Project';
import { ProjectService } from 'src/app/services/project.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-project-component',
  templateUrl: './edit-project-component.component.html',
  styleUrls: ['./edit-project-component.component.css'],
})
export class EditProjectComponentComponent implements OnInit {
  projectForm = new FormGroup({
    nameProject: new FormControl(''),
    descriptionProject: new FormControl(''),
    startDate: new FormControl(''),
    finishDate: new FormControl(''),
  })
  id: number | undefined;
  
  // projectId: number | undefined;
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
    ) {}


  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.projectService.get(this.id)
        .subscribe(project => {
          console.dir(project);
          this.projectForm.setValue({nameProject: project.nameProject, descriptionProject: project.descriptionProject, startDate: project.startDate, finishDate: project.finishDate});
        })
      return;
    }
  }

  goBack(): void {
    this.router.navigate(['projects']);
  }

  saveAndBack(): void {
    const project: Project = {
      id: 0,
      nameProject: String(this.projectForm.value.nameProject),
      descriptionProject: String(this.projectForm.value.descriptionProject),
      startDate: this.projectForm.value.startDate,
      finishDate: this.projectForm.value.finishDate
    }
    if (this.id) {
      this.projectService.updateProject(this.id, project)
        .subscribe({
          next: (project) => {
            this.goBack();
            alert("Проект успешно изменён")
            console.dir(project);
          },
          error: (error) => {
            alert("Произошла ошибка при изменении проекта")
            console.dir(error);
          }
        })
    } else {
      this.projectService.createProject(project)
        .subscribe({
          next: (project) => {
            this.goBack();
            alert("Проект успешно создан")
            console.dir(project);
          },
          error: (error) => {
            alert("Произошла ошибка при создании проекта")
            console.dir(error);
          }
        })
    }
  }
}
