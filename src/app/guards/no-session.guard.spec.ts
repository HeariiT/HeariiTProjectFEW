import { TestBed, async, inject } from '@angular/core/testing';

import { NoSessionGuard } from './no-session.guard';

describe('NoSessionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoSessionGuard]
    });
  });

  it('should ...', inject([NoSessionGuard], (guard: NoSessionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
