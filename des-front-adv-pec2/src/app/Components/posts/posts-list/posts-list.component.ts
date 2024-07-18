import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppState } from "src/app/app.reducer";
import { PostDTO } from "src/app/Models/post.dto";
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { PostService } from "src/app/Services/post.service";
import { SharedService } from "src/app/Services/shared.service";

@Component({
  selector: "app-posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-list.component.scss"],
})
export class PostsListComponent {
  posts!: PostDTO[];
  private userId: string = "";

  constructor(
    private postService: PostService,
    private router: Router,
    private store: Store<AppState>,
    //private localStorageService: LocalStorageService,
    private sharedService: SharedService
  ) {
    this.store
      .select((AppState) => AppState.auth.credentials.user_id)
      .subscribe((user_id) => {
        this.userId = user_id;
        console.log("post-list user:" + this.userId);
      });
    this.loadPosts();
  }

  private async loadPosts(): Promise<void> {
    let errorResponse: any;
    //const userId = this.localStorageService.get("user_id");

    if (this.userId) {
      this.postService
        .getPostsByUserId(this.userId)
        .pipe(
          catchError((err: any) => {
            if (!(err instanceof HttpErrorResponse)) {
              console.error("Post list loadPosts", err);
            }
            return throwError(err);
          })
        )
        .subscribe(
          (res) => {
            this.posts = res;
          },
          (err: HttpErrorResponse) => {
            errorResponse = err.error;
            this.sharedService.errorLog(errorResponse);
          },
          () => {}
        );
    }
  }

  createPost(): void {
    this.router.navigateByUrl("/user/post/");
  }

  updatePost(postId: string): void {
    this.router.navigateByUrl("/user/post/" + postId);
  }

  async deletePost(postId: string): Promise<void> {
    let errorResponse: any;

    // show confirmation popup
    let result = confirm("Confirm delete post with id: " + postId + " .");
    if (result) {
      this.postService
        .deletePost(postId)
        .pipe(
          catchError((err: any) => {
            if (!(err instanceof HttpErrorResponse)) {
              console.error("Post list deletePost", err);
            }
            return throwError(err);
          })
        )
        .subscribe(
          (res) => {
            const rowsAffected = res;
            if (rowsAffected.affected > 0) {
              this.loadPosts();
            }
          },
          (err: HttpErrorResponse) => {
            errorResponse = err.error;
            this.sharedService.errorLog(errorResponse);
          },
          () => {}
        );
    }
  }
}
