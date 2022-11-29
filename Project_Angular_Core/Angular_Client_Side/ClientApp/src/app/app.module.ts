import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './components/home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthorService } from './services/data/author.service';
import { MatImportModule } from './modules/mat-import/mat-import.module';
import { AuthorViewComponent } from './components/author/author-view/author-view.component';
import { NotifyService } from './services/shared/notify.service';
import { AuthorCreateComponent } from './components/author/author-create/author-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorEditComponent } from './components/author/author-edit/author-edit.component';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { GenreViewComponent } from './components/genre/genre-view/genre-view.component';
import { GenreEditComponent } from './components/genre/genre-edit/genre-edit.component';
import { GenreCreateComponent } from './components/genre/genre-create/genre-create.component';
import { BookViewComponent } from './components/book/book-view/book-view.component';
import { BookCreateComponent } from './components/book/book-create/book-create.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { DatePipe } from '@angular/common';
import { BookEditComponent } from './components/book/book-edit/book-edit.component';
import { CustomerViewComponent } from './components/customer/customer-view/customer-view.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { SaleDetailsComponent } from './components/customer/sale-details/sale-details.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AuthorViewComponent,
    AuthorCreateComponent,
    AuthorEditComponent,
    ConfirmDialogComponent,
    GenreViewComponent,
    GenreEditComponent,
    GenreCreateComponent,
    BookViewComponent,
    BookCreateComponent,
    BookEditComponent,
    CustomerViewComponent,
    CustomerCreateComponent,
    SaleDetailsComponent,
    CustomerEditComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatImportModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MaterialFileInputModule,
    DatePipe
  ],
  entryComponents:[ConfirmDialogComponent],
  providers: [HttpClient,AuthorService,NotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
