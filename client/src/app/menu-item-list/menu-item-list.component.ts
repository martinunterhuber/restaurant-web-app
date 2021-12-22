import { Component, OnInit } from '@angular/core';
import { MenuItemListService } from '../menu-item-list.service';
import { MenuItem } from '../models/menu_item';

@Component({
  selector: 'app-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.css']
})
export class MenuItemListComponent {
  menuItemList: MenuItem[] = [];

  isAdd = false;
  errorMessage = "";

  constructor(private listService: MenuItemListService) {
    this.refresh();
  }

  public refresh() {
    this.menuItemList = this.listService.getMenuItemList();
  }

  public add() {
    this.errorMessage = "";
    this.isAdd = true;
  }

  public cancelAdd() {
    this.isAdd = false;
  }

  public saveMenuItem(menuItem: MenuItem) {
    // if (menuItem.name != oldName && this.listService.getMenuItemByName(menuItem.name) !== undefined) {
    //   this.errorMessage = "Duplicate menuItem name!"
    // } else 
    if (menuItem.itemId == 0) {
      this.errorMessage = "";
      this.listService.addMenuItem(menuItem);
      this.cancelAdd();
    } else {
      this.errorMessage = "";
      this.listService.updateMenuItem(menuItem);
    }
  }

  public deleteMenuItem(id: number) {
    this.listService.deleteMenuItem(id);
  }

  public createMenuItem(): MenuItem {
    return {"itemId": 0, "title": "", "desc": "", price: 0, category: [], allergens: [], status: "available"}
  }
}
