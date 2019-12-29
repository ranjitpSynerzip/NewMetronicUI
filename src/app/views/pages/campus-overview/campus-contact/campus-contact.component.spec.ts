import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusContactComponent } from './campus-contact.component';

describe('CampusContactComponent', () => {
  let component: CampusContactComponent;
  let fixture: ComponentFixture<CampusContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
