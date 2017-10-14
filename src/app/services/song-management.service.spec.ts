import { TestBed, inject } from '@angular/core/testing';

import { SongManagementService } from './song-management.service';

describe('SongManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SongManagementService]
    });
  });

  it('should be created', inject([SongManagementService], (service: SongManagementService) => {
    expect(service).toBeTruthy();
  }));
});
