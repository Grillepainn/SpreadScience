import { BlogpostService } from './../blogpost.service';
import { ActivatedRoute } from '@angular/router';
import { Blogpost } from './../models/blogpost';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blogpost-cat',
  templateUrl: './blogpost-cat.component.html',
  styleUrls: ['./blogpost-cat.component.css']
})
export class BlogpostCatComponent implements OnInit {

  BlogPostByCat$: Observable<Blogpost>;

  constructor(private activatedRoute: ActivatedRoute, private blogPostService: BlogpostService) {
  }

  ngOnInit() {
    const cat = this.activatedRoute.snapshot.paramMap.get('categorie');
    console.log('categorie', cat);
    this.BlogPostByCat$ = this.blogPostService.getBlogPostByCat(cat);
  }

}
