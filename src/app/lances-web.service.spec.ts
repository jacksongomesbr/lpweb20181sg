import { TestBed, inject } from '@angular/core/testing';

import { LancesWebService } from './lances-web.service';

describe('LancesWebService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LancesWebService]
    });
  });

  it('should be created', inject([LancesWebService], (service: LancesWebService) => {
    expect(service).toBeTruthy();
  }));
});
