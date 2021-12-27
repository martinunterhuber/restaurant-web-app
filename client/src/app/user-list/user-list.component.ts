import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  userList: User[] | null = null;

  isAdd = false;
  errorMessage = "";

  constructor(private listService: UserListService) {
    this.refresh();
  }

  public refresh() {
    this.listService.getUserList().subscribe({
      next: (userList: User[]) => this.userList = userList,
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

  public saveUser(user: User) {
    if (user.id == 0) {
      this.errorMessage = "";
      this.listService.addUser(user).subscribe({
        next: (message) => {
          this.cancelAdd();
          this.refresh();
        },
        error: (error) => this.errorMessage = error.error.message
      });
    } else {
      this.errorMessage = "";
      this.listService.updateUser(user).subscribe({
        next: (message) => this.refresh(),
        error: (error) => this.errorMessage = error.error.message
      });
    }
  }

  public deleteUser(id: number) {
    this.listService.deleteUser(id).subscribe({
      next: (message) => this.refresh(),
      error: (error) => this.errorMessage = error.error.message
    });
  }

  public createUser(): User {
    return {"id": 0, "role": [], "name": "", "password": ""}
  }
}
