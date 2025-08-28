import { TestBed } from '@angular/core/testing';

import { ManagerLogService } from './manager-log.service';

describe('ManagerLogService', () => {
  let service: ManagerLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
