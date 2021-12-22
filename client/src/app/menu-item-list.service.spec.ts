/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MenuItemListService } from './menu-item-list.service';

describe('Service: MenuItemList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuItemListService]
    });
  });

  it('should ...', inject([MenuItemListService], (service: MenuItemListService) => {
    expect(service).toBeTruthy();
  }));
});
