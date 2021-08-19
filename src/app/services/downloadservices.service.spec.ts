import { TestBed } from '@angular/core/testing';

import { DownloadservicesService } from './downloadservices.service';

describe('DownloadservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloadservicesService = TestBed.get(DownloadservicesService);
    expect(service).toBeTruthy();
  });
});
