import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { PostDTO } from "src/app/Models/post.dto";
import { PostService } from "src/app/Services/post.service";
import { SharedService } from "src/app/Services/shared.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  posts!: PostDTO[];

  numLikes: number = 0;
  numDislikes: number = 0;

  constructor(
    private postService: PostService,
    private sharedService: SharedService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadPosts();
  }

  private async loadPosts(): Promise<void> {
    let errorResponse: any;

    this.postService
      .getPosts()
      .pipe(
        catchError((err: any) => {
          if (!(err instanceof HttpErrorResponse)) {
            console.error("Dashboard loadPosts", err);
          }
          return throwError(err);
        })
      )
      .subscribe(
        (res) => {
          this.posts = res;

          this.posts.forEach((post) => {
            this.numLikes = this.numLikes + post.num_likes;
            this.numDislikes = this.numDislikes + post.num_dislikes;
          });
        },
        (err: HttpErrorResponse) => {
          errorResponse = err.error;
          this.sharedService.errorLog(errorResponse);
        },
        () => {}
      );
  }
}
