import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgOptimizedImage } from "@angular/common";
import { MatListModule } from '@angular/material/list';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LibraryListComponent } from './components/library-list/library-list.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {provideRouter} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LibraryListComponent,
    PageNotFoundComponent,
    NavbarComponent,
    EditBookComponent
  ],
    imports: [
        BrowserModule, BrowserAnimationsModule, AppRoutingModule,
        MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatInputModule,
        MatFormFieldModule, MatTableModule, NgOptimizedImage, ReactiveFormsModule, FormsModule, MatCardModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
