import { TestBed } from '@angular/core/testing';

import { FavCarService } from './fav-car.service';

describe('FavCarService', () => {
  let service: FavCarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavCarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
