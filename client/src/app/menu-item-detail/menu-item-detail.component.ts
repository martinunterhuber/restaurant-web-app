import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryListService } from '../category-list.service';
import { Category } from '../models/category';
import { Allergen, MenuItem } from '../models/menu_item';

@Component({
  selector: 'app-menu-item-detail',
  templateUrl: './menu-item-detail.component.html',
  styleUrls: ['./menu-item-detail.component.css']
})
export class MenuItemDetailComponent implements OnInit {
  readonly ALLERGENS = Allergen;
  readonly ALLERGEN_KEYS = Object.keys(Allergen);

  @Input()
  menuItem!: MenuItem;

  @Input()
  categoryList!: Category[];
  
  editedMenuItem: MenuItem | undefined;

  @Output()
  cancelEvent = new EventEmitter<void>()

  @Output()
  deleteEvent = new EventEmitter<number>()

  @Output()
  saveEvent = new EventEmitter<MenuItem>()
  
  isDelete = false;
  isEdit = false;
  isNew = false;

  @Input()
  listErrorMessage!: string;

  errorMessage = "";

  constructor(private categoryListService: CategoryListService) {

  }

  ngOnInit(): void {
    if (this.menuItem.id == 0) {
      this.isNew = true;
      this.edit();
    }
  }

  public tryDelete() {
    this.isDelete = true;
  }

  public confirmDelete() {
    this.deleteEvent.emit(this.menuItem.id);
  }

  public cancelDelete() {
    this.isDelete = false;
  }

  public edit() {
    this.editedMenuItem = {...this.menuItem};
    this.isEdit = true;
  }

  public save() {
    if (this.editedMenuItem!.title == ''){
      this.errorMessage = "MenuItem name can not be empty!";
    } else {
      this.errorMessage = "";
      this.saveEvent.emit(this.editedMenuItem!);
    }
  }

  public cancel() {
    this.isEdit = false;
    this.cancelEvent.emit();
  }

  public getAllergen(allergen: string) {
    return this.ALLERGENS[allergen as keyof typeof Allergen]
  }

  public getCategory(id: number): string {
    let category = this.categoryList.find((cat) => cat.id == id);
    return category ? category.name : "";
  }
}
