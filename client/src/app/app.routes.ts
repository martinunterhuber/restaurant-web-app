import { Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { CategoryListComponent } from "./category-list/category-list.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { MenuItemListComponent } from "./menu-item-list/menu-item-list.component";
import { TableListComponent } from "./table-list/table-list.component";
import { UserListComponent } from "./user-list/user-list.component";


export const ROUTES: Routes = [ 
    { path: 'tables', component: TableListComponent, canActivate: [AuthGuard] }, 
    { path: 'categories', component: CategoryListComponent, canActivate: [AuthGuard] }, 
    { path: 'menu-items', component: MenuItemListComponent, canActivate: [AuthGuard] }, 
    { path: 'users', component: UserListComponent, canActivate: [AuthGuard] }, 
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent }, 
];