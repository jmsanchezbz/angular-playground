import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducers";
import { SharedService } from "src/app/Shared/Services/shared.service";
import * as PostsAction from "../../actions";
import { PostDTO } from "../../models/post.dto";
import { PostService } from "../../services/post.service";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  posts: PostDTO[];
  showButtons: boolean;
  private userId: string;

  constructor(
    private postService: PostService,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) {
    this.userId = "";
    this.posts = new Array<PostDTO>();
    this.showButtons = false;

    this.store.select("posts").subscribe((posts) => {
      this.posts = posts.posts;
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.store.dispatch(PostsAction.getPosts());
  }

  handleEdit(value: boolean) {
    if (value) {
      this.loadPosts();
    }
  }

}
