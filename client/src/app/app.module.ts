import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableListService } from './table-list.service';
import { TableListComponent } from './table-list/table-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatCardModule } from '@angular/material/card'; 
import { TableDetailComponent } from './table-detail/table-detail.component';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryListService } from './category-list.service';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [				
    AppComponent,
      TableListComponent,
      TableDetailComponent,
      CategoryListComponent,
      CategoryDetailComponent
   ],
  imports: [
    RouterModule.forRoot(ROUTES, { useHash: true }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule
  ],
  providers: [TableListService, CategoryListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
