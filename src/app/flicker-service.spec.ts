import { TestBed } from '@angular/core/testing';

import { FlickerService } from './flicker-service';

describe('FlickerService', () => {
  let service: FlickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
