import { Injectable } from '@angular/core';
import { Category } from './models/category';
import globalCategoryList from '../assets/categories.json';

@Injectable({
  providedIn: 'root'
})
export class CategoryListService {
  static id = 3;
  private categoryList: Category[] = [];

  constructor() {
    this.categoryList = globalCategoryList as Category[];
  }

  public getCategoryList(): Category[] {
    return this.categoryList;
  }

  public getCategoryById(id: number): Category | undefined {
    return this.categoryList.find(category => category.categoryId == id);
  }

  public addCategory(category: Category) {
    // This should be handle by the database later
    category.categoryId = CategoryListService.id++;
    this.categoryList.push(category);
  }

  public updateCategory(category: Category) {
    this.categoryList[this.categoryList.findIndex(c => c.categoryId == category.categoryId)] = category;
  }

  public deleteCategory(id: number) {
    let categoryIndex = this.categoryList.findIndex(category => category.categoryId == id);
    if (categoryIndex >= 0) {
      this.categoryList.splice(categoryIndex, 1);
    }
  }

}
