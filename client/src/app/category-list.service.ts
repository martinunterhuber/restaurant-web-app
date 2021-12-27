import { Injectable } from '@angular/core';
import { Category } from './models/category';
import globalCategoryList from '../assets/categories.json';
import { HttpClient } from '@angular/common/http';
import { MessageResponse } from './models/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryListService {
  constructor(private client: HttpClient) { }

  public getCategoryList(): Observable<Category[]> {
    return this.client.get<Category[]>("http://localhost:3000/categories");
  }

  public getCategoryById(id: number): Observable<Category> {
    return this.client.get<Category>("http://localhost:3000/categories/" + id);
  }

  public addCategory(category: Category): Observable<MessageResponse> {
    return this.client.post<MessageResponse>("http://localhost:3000/categories", category);
  }

  public updateCategory(category: Category): Observable<MessageResponse> {
    return this.client.put<MessageResponse>("http://localhost:3000/categories/" + category.id, category);
  }

  public deleteCategory(id: number): Observable<MessageResponse> {
    return this.client.delete<MessageResponse>("http://localhost:3000/categories/" + id);
  }
}
