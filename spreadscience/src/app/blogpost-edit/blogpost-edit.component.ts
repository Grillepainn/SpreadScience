import { Blogpost } from './../models/blogpost';
import { ActivatedRoute } from '@angular/router';
import { BlogpostService } from './../blogpost.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-blogpost-edit',
  templateUrl: './blogpost-edit.component.html',
  styleUrls: ['./blogpost-edit.component.css']
})
export class BlogpostEditComponent implements OnInit {
  editForm: FormGroup;
  blogPostId: string;
  blogpost: Blogpost;

  constructor(private fb: FormBuilder, private blogpostservice: BlogpostService, el: ElementRef, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.blogPostId = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogpostservice.getBlogPostById(this.blogPostId).subscribe(data => {
      this.blogpost = data;
    },
    error => console.error(error));
    this.createForm();
  }

  createForm() {
    this.editForm = this.fb.group({
      titre: '',
      categorie: '',
      image: '',
      content: ''
    });
  }

  updateBlogPost(formDirective: FormGroupDirective) {
    if(this.editForm.valid) {
      console.log(this.editForm.value);
      this.blogpostservice.updateBlogPost(this.blogPostId, this.editForm.value)
      .subscribe(data => this.handleSuccess(data, formDirective), error => this.handleError(error));
    }
  }

  handleSuccess(data, formDirective) {
    console.log('ok handlesuccess - blog post updated', data);
    this.editForm.reset();
    formDirective.resetForm();
    this.blogpostservice.dispatchBlogPostCreated(data._id);

  }

  handleError(error) {
    console.error('KO handleError - blog post NOT updated', error);
  }

}
