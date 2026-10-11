import { TestBed } from '@angular/core/testing';

import { FilteredcharacterserviceService } from './filteredcharacterservice.service';

describe('FilteredcharacterserviceService', () => {
  let service: FilteredcharacterserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilteredcharacterserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
