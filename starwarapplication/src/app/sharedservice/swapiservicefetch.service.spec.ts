import { TestBed } from '@angular/core/testing';

import { SwapiservicefetchService } from './swapiservicefetch.service';

describe('SwapiservicefetchService', () => {
  let service: SwapiservicefetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwapiservicefetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
