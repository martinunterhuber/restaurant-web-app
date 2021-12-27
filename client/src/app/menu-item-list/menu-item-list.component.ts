import { Component, OnInit } from '@angular/core';
import { CategoryListService } from '../category-list.service';
import { MenuItemListService } from '../menu-item-list.service';
import { Category } from '../models/category';
import { MenuItem } from '../models/menu_item';

@Component({
  selector: 'app-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.css']
})
export class MenuItemListComponent {
  menuItemList: MenuItem[] | null = null;
  categoryList: Category[] = [];

  isAdd = false;
  errorMessage = "";

  constructor(private listService: MenuItemListService, private categoryListService: CategoryListService) {
    this.refresh();
  }

  public refresh() {
    this.listService.getMenuItemList().subscribe({
      next: (menuItemList: MenuItem[]) => this.menuItemList = menuItemList,
      error: (error) => console.log(error)
    });
    this.categoryListService.getCategoryList().subscribe({
      next: (categoryList: Category[]) => this.categoryList = categoryList,
      error: (error) => console.log(error)
    });
  }

  public add() {
    this.errorMessage = "";
    this.isAdd = true;
  }

  public cancelAdd() {
    this.isAdd = false;
  }

  public saveMenuItem(menuItem: MenuItem) {
    if (menuItem.id == 0) {
      this.errorMessage = "";
      this.listService.addMenuItem(menuItem).subscribe({
        next: (message) => {
          this.cancelAdd();
          this.refresh();
        },
        error: (error) => this.errorMessage = error.error.message
      });
    } else {
      this.errorMessage = "";
      this.listService.updateMenuItem(menuItem).subscribe({
        next: (message) => this.refresh(),
        error: (error) => this.errorMessage = error.error.message
      });
    }
  }

  public deleteMenuItem(id: number) {
    this.listService.deleteMenuItem(id).subscribe({
      next: (message) => this.refresh(),
      error: (error) => this.errorMessage = error.error.message
    });
  }

  public createMenuItem(): MenuItem {
    return {"id": 0, "title": "", "description": "", price: 0, categories: [], allergens: [], status: "available"}
  }
}
