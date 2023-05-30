import { TestBed } from '@angular/core/testing';

import { OrdersRestService } from './orders-rest.service';

describe('OrdersRestService', () => {
  let service: OrdersRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
