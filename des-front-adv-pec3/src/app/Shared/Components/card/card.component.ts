import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PostDTO } from "src/app/Post/models/post.dto";
import { PostService } from "src/app/Post/services/post.service";
import { SharedService } from "../../Services/shared.service";
import { AppState } from "src/app/app.reducers";
import { Store } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
  animations: [
    trigger("fadeInOut", [
      state("void", style({ opacity: 0.2 })),
      transition("void => *", [
        animate(1500),
      ]),
    ]),
  ]
})
export class CardComponent {
  @Input() post: PostDTO = new PostDTO("", "", 0, 0, new Date());
  @Output() event = new EventEmitter<boolean>();

  showButtons: boolean;
  private userId: string;

  constructor(
    private postService: PostService,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) {
    this.userId = "";
    this.showButtons = false;

    this.store.select("auth").subscribe((auth) => {
      this.showButtons = false;

      if (auth.credentials.user_id) {
        this.userId = auth.credentials.user_id;
      }
      if (auth.credentials.access_token) {
        this.showButtons = true;
      }
    });
  }

  like(postId: string): void {
    let errorResponse: any;

    this.postService.likePost(postId).subscribe(
      () => {
        this.event.emit(true);
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  dislike(postId: string): void {
    let errorResponse: any;

    this.postService.dislikePost(postId).subscribe(
      () => {
        this.event.emit(true);
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }
}
