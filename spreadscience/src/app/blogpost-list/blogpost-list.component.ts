import { BlogpostService } from './../blogpost.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blogpost } from '../models/blogpost';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {
  blogPostList$: Observable<Blogpost[]>;

  constructor(private blogPostService: BlogpostService) { }

  ngOnInit() {
    this.blogPostList$ =  this.blogPostService.getBlogPosts();
  }

}
