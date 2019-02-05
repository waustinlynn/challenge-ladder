import { TestBed } from '@angular/core/testing';

import { LadderService } from './ladder.service';

describe('LadderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LadderService = TestBed.get(LadderService);
    expect(service).toBeTruthy();
  });
});
