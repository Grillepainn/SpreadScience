import { Observable } from 'rxjs';
import { Blogpost } from './../models/blogpost';
import { BlogpostService } from './../blogpost.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {
  Blogpost$: Observable<Blogpost>;

  constructor(private activatedRoute: ActivatedRoute, private blogPostService: BlogpostService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.Blogpost$ = this.blogPostService.getBlogPostById(id);
  }

}
