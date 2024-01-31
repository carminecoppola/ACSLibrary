import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {LibraryListComponent} from "./components/library-list/library-list.component";
import {AuthGuardGuard} from "./guards/auth-guard.guard";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'library', component: LibraryListComponent, canActivate:[AuthGuardGuard] },
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
