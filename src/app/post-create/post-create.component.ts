import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms'
import { Post } from '../post.model'
import { PostService} from '../post.service'
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredtitle= "";
  enteredcontent= "";
  // @Output() postcreated = new EventEmitter();

  constructor(public postservice: PostService) { }
  OnAddPost(form: NgForm) {
    if (form.invalid){
      return;
    }

    this.postservice.addPost(form.value.title, form.value.content)
  }


  ngOnInit(): void {
  }

}
