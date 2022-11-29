import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorCreateComponent } from './components/author/author-create/author-create.component';
import { AuthorEditComponent } from './components/author/author-edit/author-edit.component';
import { AuthorViewComponent } from './components/author/author-view/author-view.component';
import { BookCreateComponent } from './components/book/book-create/book-create.component';
import { BookEditComponent } from './components/book/book-edit/book-edit.component';
import { BookViewComponent } from './components/book/book-view/book-view.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';

import { CustomerViewComponent } from './components/customer/customer-view/customer-view.component';
import { SaleDetailsComponent } from './components/customer/sale-details/sale-details.component';
import { GenreCreateComponent } from './components/genre/genre-create/genre-create.component';
import { GenreEditComponent } from './components/genre/genre-edit/genre-edit.component';
import { GenreViewComponent } from './components/genre/genre-view/genre-view.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'authors',component:AuthorViewComponent},
  {path:'author-create',component:AuthorCreateComponent},
  {path:'author-edit/:id',component:AuthorEditComponent},
  {path:'genres',component:GenreViewComponent},
  {path:'genre-edit/:id',component:GenreEditComponent},
  {path:'genre-create',component:GenreCreateComponent},
  {path:'books',component:BookViewComponent},
  {path:'book-create',component:BookCreateComponent},
  {path:'book-edit/:id', component:BookEditComponent},
  {path:'customers', component:CustomerViewComponent},
  {path:'customer-create',component:CustomerCreateComponent},
  {path: 'sale-details/:id', component:SaleDetailsComponent},
  {path:'customer-edit/:id', component:CustomerEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
