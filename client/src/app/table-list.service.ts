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

  public getTableByNumber(number: number): Table | undefined {
    return this.tableList.find(table => table.number == number);
  }

  public addTable(table: Table) {
    this.tableList.push(table);
  }

  public updateTable(table: Table, oldNumber: number) {
    this.tableList[this.tableList.findIndex(table => table.number == oldNumber)] = table;
  }

  public deleteTable(number: number) {
    let tableIndex = this.tableList.findIndex(table => table.number == number);
    if (tableIndex >= 0) {
      this.tableList.splice(tableIndex, 1);
    }
  }
}
