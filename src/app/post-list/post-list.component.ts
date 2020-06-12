import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model'
import { PostService } from '../post.service'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postservice: PostService) {};

  ngOnInit() {
    this.postservice.getPost();
    this.postsSub = this.postservice.getPostUpdateListener()
    .subscribe ((posts: Post[]) => {
      this.posts= posts;
    })
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
