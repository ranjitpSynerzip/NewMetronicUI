import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusInfoComponent } from './campus-info.component';

describe('CampusInfoComponent', () => {
  let component: CampusInfoComponent;
  let fixture: ComponentFixture<CampusInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
