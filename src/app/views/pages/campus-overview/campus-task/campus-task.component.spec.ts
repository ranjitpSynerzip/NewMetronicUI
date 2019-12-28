import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusTaskComponent } from './campus-task.component';

describe('CampusTaskComponent', () => {
  let component: CampusTaskComponent;
  let fixture: ComponentFixture<CampusTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
