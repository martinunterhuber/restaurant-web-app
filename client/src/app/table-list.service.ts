import { Injectable } from '@angular/core';
import { Table } from './models/table';
import globalTableList from '../assets/tables.json';

@Injectable({
  providedIn: 'root'
})
export class TableListService {
  private tableList: Table[] = [];

  constructor() {
    this.tableList = globalTableList;
  }

  public getTableList(): Table[] {
    return this.tableList;
  }

  public getTableById(id: number): Table | undefined {
    return this.tableList.find(table => table.id == id);
  }

  public addTable(table: Table) {
    this.tableList.push(table);
  }

  public updateTable(table: Table, oldId: number) {
    this.tableList[this.tableList.findIndex(table => table.id == oldId)] = table;
  }

  public deleteTable(id: number) {
    let tableIndex = this.tableList.findIndex(table => table.id == id);
    if (tableIndex >= 0) {
      this.tableList.splice(tableIndex, 1);
    }
  }
}
