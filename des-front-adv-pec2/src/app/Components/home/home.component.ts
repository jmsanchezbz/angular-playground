import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppState } from "src/app/app.reducer";
//import { HeaderMenus } from "src/app/Models/header-menus.dto";
import { PostDTO } from "src/app/Models/post.dto";
//import { HeaderMenusService } from "src/app/Services/header-menus.service";
//import { LocalStorageService } from "src/app/Services/local-storage.service";
import { PostService } from "src/app/Services/post.service";
import { SharedService } from "src/app/Services/shared.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  posts!: PostDTO[];
  showButtons: boolean;
  private userId: string = "";

  constructor(
    private postService: PostService,
    private store: Store<AppState>,
    //private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private router: Router //private headerMenusService: HeaderMenusService
  ) {
    this.showButtons = false;
    this.loadPosts();
  }

  ngOnInit(): void {
    this.store
      .select((AppState) => AppState.auth.credentials.user_id)
      .subscribe((user_id) => {
        this.userId = user_id;

        if (user_id.length > 0) {
          this.showButtons = true;
        } else {
          this.showButtons = false;
        }
      });

    /*this.store.select
    this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showButtons = headerInfo.showAuthSection;
        }
      }
    );*/
  }
  private async loadPosts(): Promise<void> {
    let errorResponse: any;
    //const userId = this.localStorageService.get("user_id");
    /*if (userId) {
      this.showButtons = true;
    }*/

    this.postService
      .getPosts()
      .pipe()
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

  async like(postId: string): Promise<void> {
    let errorResponse: any;

    this.postService
      .likePost(postId)
      .pipe(
        catchError((err: any) => {
          if (!(err instanceof HttpErrorResponse)) {
            console.error("Home like", err);
          }
          return throwError(err);
        })
      )
      .subscribe(
        (res) => {
          this.loadPosts();
        },
        (err: HttpErrorResponse) => {
          errorResponse = err.error;
          this.sharedService.errorLog(errorResponse);
        },
        () => {}
      );
  }

  async dislike(postId: string): Promise<void> {
    let errorResponse: any;

    this.postService
      .dislikePost(postId)
      .pipe(
        catchError((err: any) => {
          if (!(err instanceof HttpErrorResponse)) {
            console.error("Home dislike", err);
          }
          return throwError(err);
        })
      )
      .subscribe(
        (res) => {
          this.loadPosts();
        },
        (err: HttpErrorResponse) => {
          errorResponse = err.error;
          this.sharedService.errorLog(errorResponse);
        },
        () => {}
      );
  }
}
