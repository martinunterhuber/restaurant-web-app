import { Injectable } from '@angular/core';
import globalMenuItemList from '../assets/menu_Items.json';
import { MenuItem } from './models/menu_item';
import { HttpClient } from '@angular/common/http';
import { MessageResponse } from './models/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuItemListService {
  constructor(private client: HttpClient) { }

  public getMenuItemList(): Observable<MenuItem[]> {
    return this.client.get<MenuItem[]>("http://localhost:3000/menuitems");
  }

  public getMenuItemById(id: number): Observable<MenuItem> {
    return this.client.get<MenuItem>("http://localhost:3000/menuitems/" + id);
  }

  public addMenuItem(menuItem: MenuItem): Observable<MessageResponse> {
    return this.client.post<MessageResponse>("http://localhost:3000/menuitems", menuItem);
  }

  public updateMenuItem(menuItem: MenuItem): Observable<MessageResponse> {
    return this.client.put<MessageResponse>("http://localhost:3000/menuitems/" + menuItem.id, menuItem);
  }

  public deleteMenuItem(id: number): Observable<MessageResponse> {
    return this.client.delete<MessageResponse>("http://localhost:3000/menuitems/" + id);
  }
}
