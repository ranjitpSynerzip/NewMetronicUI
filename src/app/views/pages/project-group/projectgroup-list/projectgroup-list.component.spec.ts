import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectgroupListComponent } from './projectgroup-list.component';

describe('ProjectgroupListComponent', () => {
  let component: ProjectgroupListComponent;
  let fixture: ComponentFixture<ProjectgroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectgroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectgroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
