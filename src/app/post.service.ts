import { Post } from './post.model'
import { Injectable} from '@angular/core'
import { Subject} from 'rxjs'
import { HttpClient} from '@angular/common/http'
import { strict } from 'assert';
@Injectable()
export class PostService {
  private posts: Post[] = [];
  private postupdated = new Subject<Post[]>();

  constructor (private http: HttpClient) {}

  //Angular gửi request to node js, '{message: string, posts: Post[]}': loại dữ liệu cần quan tâm//
  getPost(){
    this.http.get<{message: string, posts: Post[]}>('http://localhost:4000/api/posts')
    .subscribe((postData) => {
      this.posts = postData.posts;
      this.postupdated.next([...this.posts]);
    });
  }

  getPostUpdateListener () {
    return this.postupdated.asObservable();
  }
  addPost(title: string, content:string){
    const post: Post ={id: null, title: title, content: content}
    this.http.post<{message: string}>('http://localhost:4000/api/posts', post)
    .subscribe((responseData)=>{
      console.log(responseData.message);
      this.posts.push(post)
      this.postupdated.next([...this.posts]);
    });

  }
}
