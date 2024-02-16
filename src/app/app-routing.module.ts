import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {LibraryListComponent} from "./components/library-list/library-list.component";
import {AuthGuardGuard} from "./guards/auth-guard.guard";
import {EditBookComponent} from "./components/edit-book/edit-book.component";
import {AddBookComponent} from "./components/add-book/add-book.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //{ path: 'library', component: LibraryListComponent, canActivate:[AuthGuardGuard] },
  //{ path: 'edit-book', component: EditBookComponent, canActivate:[AuthGuardGuard] },
  //{ path: 'add-book', component: AddBookComponent, canActivate:[AuthGuardGuard] },
  { path: 'library', component: LibraryListComponent },
  { path: 'edit-book', component: EditBookComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }

