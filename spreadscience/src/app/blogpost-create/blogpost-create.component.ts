import { BlogpostService } from './../blogpost.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-blogpost-create',
  templateUrl: './blogpost-create.component.html',
  styleUrls: ['./blogpost-create.component.css']
})
export class BlogpostCreateComponent implements OnInit {

  creationForm: FormGroup;

  constructor(private fb: FormBuilder, private blogpostservice: BlogpostService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.creationForm = this.fb.group({
      title: '',
      categorie: '',
      image: '',
      content: ''
    });
  }

  createBlogPost(formDirective: FormGroupDirective) {
    if (this.creationForm.valid) {
      this.blogpostservice.createBlogPost(this.creationForm.value)
      .subscribe(data => this.handleSuccess(data, formDirective), error => this.handleError(error));
    }
  }

  handleSuccess(data, formDirective) {
    console.log('le blog post à bien était créé', data);
    this.creationForm.reset();
    formDirective.resetForm();
    this.blogpostservice.dispatchBlogPostCreated(data.id);
  }

  handleError(error) {
    console.error('Blog post not created', error);
  }
}
