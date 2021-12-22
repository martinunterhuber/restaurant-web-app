import { Injectable } from '@angular/core';
import globalMenuItemList from '../assets/menu_Items.json';
import { MenuItem } from './models/menu_item';

@Injectable({
  providedIn: 'root'
})
export class MenuItemListService {
  static id = 11;
  private menuItemList: MenuItem[] = [];

  constructor() {
    this.menuItemList = globalMenuItemList as MenuItem[];
  }

  public getMenuItemList(): MenuItem[] {
    return this.menuItemList;
  }

  public getMenuItemById(id: number): MenuItem | undefined {
    return this.menuItemList.find(menuItem => menuItem.itemId == id);
  }

  public addMenuItem(menuItem: MenuItem) {
    // This should be handle by the database later
    menuItem.itemId = MenuItemListService.id++;
    this.menuItemList.push(menuItem);
  }

  public updateMenuItem(menuItem: MenuItem) {
    this.menuItemList[this.menuItemList.findIndex(c => c.itemId == menuItem.itemId)] = menuItem;
  }

  public deleteMenuItem(id: number) {
    let menuItemIndex = this.menuItemList.findIndex(menuItem => menuItem.itemId == id);
    if (menuItemIndex >= 0) {
      this.menuItemList.splice(menuItemIndex, 1);
    }
  }

}
