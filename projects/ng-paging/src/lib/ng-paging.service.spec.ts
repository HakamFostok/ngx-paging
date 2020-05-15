import { TestBed } from '@angular/core/testing';

import { NgPagingService } from './ng-paging.service';

describe('NgPagingService', () => {
  let service: NgPagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgPagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
