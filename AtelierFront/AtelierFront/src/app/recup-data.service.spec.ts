import { TestBed } from '@angular/core/testing';

import { RecupDataService } from './recup-data.service';

describe('RecupDataService', () => {
  let service: RecupDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecupDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
