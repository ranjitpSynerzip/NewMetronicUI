import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFundAllocationComponent } from './update-fund-allocation.component';

describe('UpdateFundAllocationComponent', () => {
  let component: UpdateFundAllocationComponent;
  let fixture: ComponentFixture<UpdateFundAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFundAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFundAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
