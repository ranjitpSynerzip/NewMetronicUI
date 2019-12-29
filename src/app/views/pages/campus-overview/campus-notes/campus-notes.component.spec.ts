import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusNotesComponent } from './campus-notes.component';

describe('CampusNotesComponent', () => {
  let component: CampusNotesComponent;
  let fixture: ComponentFixture<CampusNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
