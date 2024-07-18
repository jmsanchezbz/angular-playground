import { Component, OnInit } from "@angular/core";
import { PostDTO } from "src/app/Models/post.dto";
import { PostService } from "src/app/Services/post.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  num_likes: number;
  num_dislikes: number;
  private posts: PostDTO[];

  constructor(private postService: PostService) {
    this.num_likes = 0;
    this.num_dislikes = 0;
    this.posts = [];
  }

  async ngOnInit() {
    this.posts = await this.postService.getPosts();

    this.num_likes = this.posts.reduce((sum, p) => sum + p.num_likes, 0);
    this.num_dislikes = this.posts.reduce((sum, p) => sum + p.num_dislikes, 0);
  }
}
