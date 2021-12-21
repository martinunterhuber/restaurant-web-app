import { Component } from '@angular/core';
import { Table } from '../models/table';
import { TableListService } from '../table-list.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent {
  tableList: Table[] = [];

  isAdd = false;
  errorMessage = "";

  constructor(private listService: TableListService) {
    this.refresh();
  }

  public refresh() {
    this.tableList = this.listService.getTableList();
  }

  public add() {
    this.errorMessage = "";
    this.isAdd = true;
  }

  public cancelAdd() {
    this.isAdd = false;
  }

  public saveTable(table: Table, oldNumber: number) {
    if (table.number != oldNumber && this.listService.getTableByNumber(table.number) !== undefined) {
      this.errorMessage = "Duplicate table number!"
    } else if (oldNumber == 0) {
      this.errorMessage = "";
      this.listService.addTable(table);
      this.cancelAdd();
    } else {
      this.errorMessage = "";
      this.listService.updateTable(table, oldNumber);
    }
  }

  public deleteTable(number: number) {
    this.listService.deleteTable(number);
  }
}
