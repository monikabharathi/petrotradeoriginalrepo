import { TestBed } from '@angular/core/testing';

import { PassdataService } from './passdata.service';

describe('PassdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassdataService = TestBed.get(PassdataService);
    expect(service).toBeTruthy();
  });
});
