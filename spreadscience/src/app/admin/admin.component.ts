import { AuthService } from './../auth.service';
import { BlogpostService } from './../blogpost.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Blogpost } from '../models/blogpost';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  //blogpost$: Observable<Blogpost[]>;
  allBlogPosts: Blogpost[];
  errorFromServer = '';

  constructor(private blogPostService: BlogpostService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/auth']);
    }
    this.blogPostService.getBlogPosts().subscribe(data => this.refresh(data));
    this.blogPostService.handleBlogPostCreated().subscribe(data => {
      console.log('AdminComponent received', data);
    });
  }

  deleteBlogPosts(selectedOptions) {
    const ids = selectedOptions.map(so => so.value);
      if(ids.length === 1) {
        this.blogPostService.deleteSinglePost(ids[0]).subscribe(data => this.refresh(data), err => console.log(err));
    } else {
      return this.blogPostService.deleteBlogPosts(ids).subscribe(data => this.refresh(data), err => console.log(err));
    }
  }

  refresh(data) {
    console.log('data', data);
    this.blogPostService.getBlogPosts().subscribe(data => {
      this.allBlogPosts = data;
    });
  }

  logout() {
    this.authService.logout().subscribe(data => {
      console.log(data);
      this.router.navigate(['/auth']);
    }, err => console.error(err));
  }

}
