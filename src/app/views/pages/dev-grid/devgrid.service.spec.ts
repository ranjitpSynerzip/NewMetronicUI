import { TestBed } from '@angular/core/testing';

import { DevgridService } from './devgrid.service';

describe('DevgridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevgridService = TestBed.get(DevgridService);
    expect(service).toBeTruthy();
  });
});
