import {
  Component,
  OnInit,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducers";
import * as PostsAction from "../../actions";
import { PostDTO } from "../../models/post.dto";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  posts: PostDTO[];
  numLikes: number;
  numDislikes: number;

  chartOptions1: any;
  chartOptions2: any;

  constructor(private store: Store<AppState>) {
    this.posts = new Array<PostDTO>();
    this.numLikes = 0;
    this.numDislikes = 0;
  }

  ngOnInit(): void {
    this.loadPosts();

    this.store.select("posts").subscribe((posts) => {
      this.posts = posts.posts;

      this.numLikes = 0;
      this.numDislikes = 0;

      this.posts.forEach((post) => {
        this.numLikes = this.numLikes + post.num_likes;
        this.numDislikes = this.numDislikes + post.num_dislikes;
      });

      let perLikes: number =
        (this.numLikes / (this.numLikes + this.numDislikes)) * 100;
      let perDislikes: number =
        (this.numDislikes / (this.numLikes + this.numDislikes)) * 100;

      this.chartOptions1 = {
        title: {
          text: "Stats",
        },
        data: [
          {
            type: "column",
            dataPoints: [
              {
                label: "Likes",
                y: this.numLikes,
              },
              {
                label: "Dislikes",
                y: this.numDislikes,
              },
            ],
          },
        ],
      };

      this.chartOptions2 = {
        title: {
          text: "Stats",
        },
        data: [
          {
            indexLabelPlacement: "inside",
            type: "doughnut",
            dataPoints: [
              {
                label: "Likes",
                y: this.numLikes,
                indexLabel: perLikes.toPrecision(2) + "%",
              },
              {
                label: "Dislikes",
                y: this.numDislikes,
                indexLabel: perDislikes.toPrecision(2) + "%",
              },
            ],
          },
        ],
      };
    });
  }

  private loadPosts(): void {
    this.store.dispatch(PostsAction.getPosts());
  }
}
