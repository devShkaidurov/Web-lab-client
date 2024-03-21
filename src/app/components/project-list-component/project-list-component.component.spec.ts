import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponentComponent } from './project-list-component.component';

describe('ProjectListComponentComponent', () => {
  let component: ProjectListComponentComponent;
  let fixture: ComponentFixture<ProjectListComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListComponentComponent]
    });
    fixture = TestBed.createComponent(ProjectListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
