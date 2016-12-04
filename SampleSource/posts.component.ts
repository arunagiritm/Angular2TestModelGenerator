import {Component}      from "angular2/core";
import {PostService}    from './posts.service'
import {SpinnerComponent }       from './spinner.component'

@Component({
    templateUrl : "app/posts.component.html",
    styles: [`
        .posts li { cursor: default; }
        .posts li:hover { background: #ecf0f1; } 
        .list-group-item.active, 
        .list-group-item.active:hover, 
        .list-group-item.active:focus { 
            background-color: #ecf0f1;
            border-color: #ecf0f1; 
            color: #2c3e50;
        }
    `],
    providers : [PostService],
    directives :[SpinnerComponent]
})

export class PostsComponent{
    posts : any[];
    postsLoading : boolean=true;
    commentsLoading : boolean = true;
    currentPost;
    comments;
    constructor(private postService : PostService ){
       this.postService
        .getPosts()
        .subscribe(
            post => this.posts = post,
            null,
            ()=> {this.postsLoading=false}
        );
    }
    selectPost(post){
        this.commentsLoading=true;
        this.currentPost=post;
        this.postService.getComments(post.id)
            .subscribe(
                comment => this.comments= comment,
                null,
                ()=>{
                    this.commentsLoading=false;
                }
            );
    }
    
}