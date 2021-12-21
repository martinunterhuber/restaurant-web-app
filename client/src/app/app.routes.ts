import { Routes } from "@angular/router";
import { CategoryDetailComponent } from "./category-detail/category-detail.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { TableDetailComponent } from "./table-detail/table-detail.component";
import { TableListComponent } from "./table-list/table-list.component";


export const ROUTES: Routes = [ 
    { path: 'tables', component: TableListComponent }, 
    { path: 'tables/:number', component: TableDetailComponent },
    { path: 'categories', component: CategoryListComponent }, 
    { path: 'categories/:name', component: CategoryDetailComponent },
];