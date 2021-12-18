/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TableListService } from './table-list.service';

describe('Service: TableList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableListService]
    });
  });

  it('should ...', inject([TableListService], (service: TableListService) => {
    expect(service).toBeTruthy();
  }));
});
