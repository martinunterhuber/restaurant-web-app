import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Table } from '../models/table';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent implements OnInit {
  @Input()
  table!: Table;
  
  editedTable: Table | undefined;

  @Output()
  cancelEvent = new EventEmitter<void>()

  @Output()
  deleteEvent = new EventEmitter<number>()

  @Output()
  saveEvent = new EventEmitter<{table: Table, oldNumber: number}>()
  
  isDelete = false;
  isEdit = false;
  isNew = false;

  @Input()
  listErrorMessage!: string;

  errorMessage = "";

  ngOnInit(): void {
    if (this.table.number == 0) {
      this.isNew = true;
      this.edit();
    }
  }

  public tryDelete() {
    this.isDelete = true;
  }

  public confirmDelete() {
    this.deleteEvent.emit(this.table.number);
  }

  public cancelDelete() {
    this.isDelete = false;
  }

  public edit() {
    this.editedTable = {...this.table};
    this.isEdit = true;
  }

  public save() {
    if (this.editedTable!.number <= 0){
      this.errorMessage = "Table number must be greater than 0!";
    } else if (this.editedTable!.seats <= 0) {
      this.errorMessage = "Number of seats must be greater than 0!";
    } else {
      this.errorMessage = "";
      this.saveEvent.emit({table: this.editedTable!, oldNumber: this.table.number});
    }
  }

  public cancel() {
    this.isEdit = false;
    this.cancelEvent.emit();
  }
}
