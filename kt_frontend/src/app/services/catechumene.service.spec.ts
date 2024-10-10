import { TestBed } from '@angular/core/testing';

import { CatechumeneService } from './catechumene.service';

describe('CatechumeneService', () => {
  let service: CatechumeneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatechumeneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
