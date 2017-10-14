import { TestBed, async, inject } from '@angular/core/testing';

import { AlreadyInGuard } from './already-in.guard';

describe('AlreadyInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlreadyInGuard]
    });
  });

  it('should ...', inject([AlreadyInGuard], (guard: AlreadyInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
