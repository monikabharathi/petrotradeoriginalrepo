import { TestBed } from '@angular/core/testing';

import { ForecastdataService } from './forecastdata.service';

describe('ForecastdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForecastdataService = TestBed.get(ForecastdataService);
    expect(service).toBeTruthy();
  });
});
