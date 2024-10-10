import { TestBed } from '@angular/core/testing';

import { CatechisteService } from './catechiste.service';

describe('CatechisteService', () => {
  let service: CatechisteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatechisteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
