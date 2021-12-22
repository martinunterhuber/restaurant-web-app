import { Component, OnInit } from '@angular/core';
import { CategoryListService } from '../category-list.service';
import { Category, CategoryType } from '../models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  categoryList: Category[] = [];

  isAdd = false;
  errorMessage = "";

  constructor(private listService: CategoryListService) {
    this.refresh();
  }

  public refresh() {
    this.categoryList = this.listService.getCategoryList();
  }

  public add() {
    this.errorMessage = "";
    this.isAdd = true;
  }

  public cancelAdd() {
    this.isAdd = false;
  }

  public saveCategory(category: Category) {
    // if (category.name != oldName && this.listService.getCategoryByName(category.name) !== undefined) {
    //   this.errorMessage = "Duplicate category name!"
    // } else 
    if (category.categoryId == 0) {
      this.errorMessage = "";
      this.listService.addCategory(category);
      this.cancelAdd();
    } else {
      this.errorMessage = "";
      this.listService.updateCategory(category);
    }
  }

  public deleteCategory(id: number) {
    this.listService.deleteCategory(id);
  }

  public createCategory(): Category {
    return {"categoryId": 0, "name": "", "type": CategoryType.food}
  }
}
