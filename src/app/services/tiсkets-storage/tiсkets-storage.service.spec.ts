import { TestBed } from '@angular/core/testing';

import { TiсketsStorageService } from './tiсkets-storage.service';

describe('TiсketsStorageService', () => {
  let service: TiсketsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiсketsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
