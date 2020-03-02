import { BlogpostEditComponent } from './blogpost-edit/blogpost-edit.component';
import { ModelBlogComponent } from './model-blog/model-blog.component';
import { AdminComponent } from './admin/admin.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { BlogpostListComponent } from './blogpost-list/blogpost-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogpostCatComponent } from './blogpost-cat/blogpost-cat.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', component: ModelBlogComponent, children: [
    { path: '', component: BlogpostListComponent },
    { path: 'blog-posts/:id', component: BlogpostComponent },
    { path: 'blog-posts/cat/:categorie', component: BlogpostCatComponent}
  ]},
  { path: 'admin', component: AdminComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'admin/blog-posts/:id', component: BlogpostEditComponent },
  { path: '**', component: ErrorpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
