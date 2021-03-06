import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category, CategoryType } from '../models/category';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  readonly TYPES = CategoryType;
  readonly TYPE_KEYS = Object.values(CategoryType);

  @Input()
  category!: Category;
  
  editedCategory: Category | undefined;

  @Output()
  cancelEvent = new EventEmitter<void>()

  @Output()
  deleteEvent = new EventEmitter<number>()

  @Output()
  saveEvent = new EventEmitter<Category>()
  
  isDelete = false;
  isEdit = false;
  isNew = false;

  @Input()
  listErrorMessage!: string;

  errorMessage = "";

  ngOnInit(): void {
    if (this.category.id == 0) {
      this.isNew = true;
      this.edit();
    }
  }

  public tryDelete() {
    this.isDelete = true;
  }

  public confirmDelete() {
    this.deleteEvent.emit(this.category.id);
  }

  public cancelDelete() {
    this.isDelete = false;
  }

  public edit() {
    this.editedCategory = {...this.category};
    this.isEdit = true;
  }

  public save() {
    if (this.editedCategory!.name == ''){
      this.errorMessage = "Category name can not be empty!";
    } else {
      this.errorMessage = "";
      this.saveEvent.emit(this.editedCategory!);
    }
  }

  public cancel() {
    this.isEdit = false;
    this.cancelEvent.emit();
  }
}
