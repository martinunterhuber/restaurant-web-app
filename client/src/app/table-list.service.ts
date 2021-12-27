import { Injectable } from '@angular/core';
import { Table } from './models/table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageResponse } from './models/message';

@Injectable({
  providedIn: 'root'
})
export class TableListService {
  constructor(private client: HttpClient) { }

  public getTableList(): Observable<Table[]> {
    return this.client.get<Table[]>("http://localhost:3000/tables");
  }

  public getTableById(id: number): Observable<Table> {
    return this.client.get<Table>("http://localhost:3000/tables/" + id);
  }

  public addTable(table: Table): Observable<MessageResponse> {
    return this.client.post<MessageResponse>("http://localhost:3000/tables", table);
  }

  public updateTable(table: Table, oldId: number): Observable<MessageResponse> {
    return this.client.put<MessageResponse>("http://localhost:3000/tables/" + oldId, table);
  }

  public deleteTable(id: number): Observable<MessageResponse> {
    return this.client.delete<MessageResponse>("http://localhost:3000/tables/" + id);
  }
}
