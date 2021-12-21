import { Injectable } from '@angular/core';
import { Category } from './models/category';
import globalCategoryList from '../assets/categories.json';

@Injectable({
  providedIn: 'root'
})
export class CategoryListService {
  private categoryList: Category[] = [];

  constructor() {
    this.categoryList = globalCategoryList as Category[];
  }

  public getCategoryList(): Category[] {
    return this.categoryList;
  }

  public getCategoryByName(name: string): Category | undefined {
    return this.categoryList.find(category => category.name == name);
  }

  public addCategory(category: Category) {
    this.categoryList.push(category);
  }

  public updateCategory(category: Category, oldName: string) {
    this.categoryList[this.categoryList.findIndex(category => category.name == oldName)] = category;
  }

  public deleteCategory(name: string) {
    let categoryIndex = this.categoryList.findIndex(category => category.name == name);
    if (categoryIndex >= 0) {
      this.categoryList.splice(categoryIndex, 1);
    }
  }

}
