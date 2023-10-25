import { TestBed } from '@angular/core/testing';

import { RestaurantHomeService } from './restaurant-home.service';

describe('RestaurantHomeService', () => {
  let service: RestaurantHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
