import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectgroupComponent } from './add-projectgroup.component';

describe('AddProjectgroupComponent', () => {
  let component: AddProjectgroupComponent;
  let fixture: ComponentFixture<AddProjectgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
