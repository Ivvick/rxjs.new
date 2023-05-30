import { TestBed } from '@angular/core/testing';

import { RestinterceptorsService } from './restinterceptors.service';

describe('RestinterceptorsService', () => {
  let service: RestinterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestinterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
