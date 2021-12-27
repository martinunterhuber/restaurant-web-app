import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User, UserRole } from '../models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  readonly ROLES = UserRole;
  readonly ROLE_KEYS = Object.values(UserRole);

  @Input()
  user!: User;
  
  editedUser: User | undefined;

  @Output()
  cancelEvent = new EventEmitter<void>()

  @Output()
  deleteEvent = new EventEmitter<number>()

  @Output()
  saveEvent = new EventEmitter<User>()
  
  isDelete = false;
  isEdit = false;
  isNew = false;

  @Input()
  listErrorMessage!: string;

  errorMessage = "";

  ngOnInit(): void {
    if (this.user.id == 0) {
      this.isNew = true;
      this.edit();
    }
  }

  public tryDelete() {
    this.isDelete = true;
  }

  public confirmDelete() {
    this.deleteEvent.emit(this.user.id);
  }

  public cancelDelete() {
    this.isDelete = false;
  }

  public edit() {
    this.editedUser = {...this.user};
    this.isEdit = true;
  }

  public save() {
    // TODO: handle password change
    if (this.editedUser!.name == ''){
      this.errorMessage = "User name can not be empty!";
    } else {
      this.errorMessage = "";
      this.saveEvent.emit(this.editedUser!);
    }
  }

  public cancel() {
    this.isEdit = false;
    this.cancelEvent.emit();
  }
}
