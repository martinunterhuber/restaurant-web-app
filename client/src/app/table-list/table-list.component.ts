import { Component } from '@angular/core';
import { MessageResponse } from '../models/message';
import { Table } from '../models/table';
import { TableListService } from '../table-list.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent {
  tableList: Table[] | null = null;

  isAdd = false;
  errorMessage = "";

  constructor(private listService: TableListService) {
    this.refresh();
  }

  public refresh() {
    this.listService.getTableList().subscribe({
      next: (tableList: Table[]) => this.tableList = tableList,
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

  public saveTable(table: Table, oldId: number) {
    if (oldId == 0) {
      this.errorMessage = "";
      this.listService.addTable(table).subscribe({
        next: (message) => this.refresh(),
        error: (error) => this.errorMessage = error.error.message
      });
      this.cancelAdd();
    } else {
      this.errorMessage = "";
      this.listService.updateTable(table, oldId).subscribe({
        next: (message) => this.refresh(),
        error: (error) => this.errorMessage = error.error.message
      });
    }
  }

  public deleteTable(number: number) {
    this.listService.deleteTable(number).subscribe({
      next: (message) => this.refresh(),
      error: (error) => this.errorMessage = error.error.message
    });
  }
}
