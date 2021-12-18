import { Routes } from "@angular/router";
import { TableDetailComponent } from "./table-detail/table-detail.component";
import { TableListComponent } from "./table-list/table-list.component";


export const ROUTES: Routes = [ 
    { path: 'tables', component: TableListComponent }, 
    { path: 'tables/:id', component: TableDetailComponent } 
];