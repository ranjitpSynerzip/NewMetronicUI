import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusOverviewComponent } from './campus-overview.component';

describe('CampusOverviewComponent', () => {
  let component: CampusOverviewComponent;
  let fixture: ComponentFixture<CampusOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
