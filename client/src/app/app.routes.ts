import { Routes } from "@angular/router";
import { CategoryListComponent } from "./category-list/category-list.component";
import { MenuItemListComponent } from "./menu-item-list/menu-item-list.component";
import { TableListComponent } from "./table-list/table-list.component";
import { UserListComponent } from "./user-list/user-list.component";


export const ROUTES: Routes = [ 
    { path: 'tables', component: TableListComponent }, 
    { path: 'categories', component: CategoryListComponent }, 
    { path: 'menu-items', component: MenuItemListComponent }, 
    { path: 'users', component: UserListComponent }, 
];