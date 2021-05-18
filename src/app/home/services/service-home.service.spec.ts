import { TestBed } from '@angular/core/testing';

import { ServiceHomeService } from './service-home.service';

describe('ServiceHomeService', () => {
  let service: ServiceHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
