import { Component, OnInit } from '@angular/core';
import { CategoryListService } from '../category-list.service';
import { Category, CategoryType } from '../models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  categoryList: Category[] | null = null;

  isAdd = false;
  errorMessage = "";

  constructor(private listService: CategoryListService) {
    this.refresh();
  }

  public refresh() {
    this.listService.getCategoryList().subscribe({
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

  public saveCategory(category: Category) {
    if (category.id == 0) {
      this.errorMessage = "";
      this.listService.addCategory(category).subscribe({
        next: (message) => {
          this.cancelAdd();
          this.refresh();
        },
        error: (error) => this.errorMessage = error.error.message
      });
    } else {
      this.errorMessage = "";
      this.listService.updateCategory(category).subscribe({
        next: (message) => this.refresh(),
        error: (error) => this.errorMessage = error.error.message
      });
    }
  }

  public deleteCategory(id: number) {
    this.listService.deleteCategory(id).subscribe({
      next: (message) => this.refresh(),
      error: (error) => this.errorMessage = error.error.message
    });
  }

  public createCategory(): Category {
    return {"id": 0, "name": "", "type": CategoryType.food}
  }
}
