import { AddCookieInterceptor } from './add-cookie.interceptor';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { BlogpostListComponent } from './blogpost-list/blogpost-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { AdminComponent } from './admin/admin.component';
import { ModelBlogComponent } from './model-blog/model-blog.component';
import { BlogpostCreateComponent } from './blogpost-create/blogpost-create.component';
import { BlogpostEditComponent } from './blogpost-edit/blogpost-edit.component';

import {NgxEditorModule } from 'ngx-editor';
import { BlogpostCatComponent } from './blogpost-cat/blogpost-cat.component';
import { AuthComponent } from './auth/auth.component';


@NgModule({
  declarations: [
    AppComponent,
    BlogpostComponent,
    BlogpostListComponent,
    ErrorpageComponent,
    AdminComponent,
    ModelBlogComponent,
    BlogpostCreateComponent,
    BlogpostEditComponent,
    BlogpostCatComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    NgxEditorModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddCookieInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
