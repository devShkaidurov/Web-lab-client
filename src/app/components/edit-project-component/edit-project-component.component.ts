import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/interfaces/Project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-edit-project-component',
  templateUrl: './edit-project-component.component.html',
  styleUrls: ['./edit-project-component.component.css']
})
export class EditProjectComponentComponent implements OnInit {
  @Input() project!: Project;
  @Input() projectId: string | undefined;
  // projectId: number | undefined;
  constructor(
    private projectService: ProjectService,
    ) {
    // this.route.queryParams.subscribe(params => {
    //     console.dir(params);
    //     this.projectId = params['id'];
    // });
}

  ngOnInit(): void {
    const params = window.location.pathname.split('/');
    if (params.length === 3) {
      const id = Number(params[2]);
      // get project from database
      this.projectService.get(id)
        .subscribe(project => {
          console.dir(project);
          this.project = project;
        })
      return;
    }
    if (!this.project) {
      // create
      const proj: Project = {
        id: 0,
        nameProject: "",
        descriptionProject: "",
        startDate: null,
        finishDate: null
      };
      this.project = proj;
    }
  }
}
