import { TestBed } from '@angular/core/testing';

import { ApiPlayerService } from './api-player.service';

describe('ApiPlayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiPlayerService = TestBed.get(ApiPlayerService);
    expect(service).toBeTruthy();
  });
});
