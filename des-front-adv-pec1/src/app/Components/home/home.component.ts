import { Component } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from "@angular/forms";
import { Router } from "@angular/router";
import { HeaderMenus } from "src/app/Models/header-menus.dto";
import { PostDTO } from "src/app/Models/post.dto";
import { HeaderMenusService } from "src/app/Services/header-menus.service";
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { PostService } from "src/app/Services/post.service";
import { SharedService } from "src/app/Services/shared.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  posts!: PostDTO[];
  filteredPosts!: PostDTO[];
  showButtons: boolean;
  filterForm: UntypedFormGroup;
  filterText: UntypedFormControl;
  filterDate: UntypedFormControl;

  searchFilter!: Filter;

  constructor(
    private postService: PostService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private router: Router,
    private headerMenusService: HeaderMenusService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.showButtons = false;
    this.searchFilter = { date: new Date(0), text: "" };
    this.filterText = new UntypedFormControl(this.searchFilter.text);
    this.filterDate = new UntypedFormControl(this.searchFilter.date);
    this.filterForm = this.formBuilder.group({
      text: this.filterText,
      date: this.filterDate,
    });
    this.filter();
  }

  ngOnInit(): void {
    this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showButtons = headerInfo.showAuthSection;
        }
      }
    );
    this.isLogged();
  }

  clear() {
    this.filterText.setValue("");
    this.filterDate.setValue(new Date(0));
  }

  private async loadPosts(): Promise<void> {
    let errorResponse: any;
    const userId = this.localStorageService.get("user_id");

    if (userId) {
      try {
        this.posts = await this.postService.getPosts();
      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    }
  }

  async filter() {

    await this.loadPosts();
    this.filteredPosts = this.posts.filter((p) => {
      const text = this.filterText.value.toLowerCase();
      const textMatch =
        !text ||
        p.title.toLowerCase().includes(text) ||
        p.description.toLowerCase().includes(text.toLowerCase()) ||
        p.userAlias.toLowerCase().includes(text.toLowerCase());

      const date = new Date(this.filterDate.value);
      const pdate = new Date(p.publication_date);
      const dateMatch =
        !date ||
        date.getTime() == 0 ||
        (pdate.getFullYear() === date.getFullYear() &&
          pdate.getMonth() === date.getMonth() &&
          pdate.getDay() === date.getDay());

      return textMatch && dateMatch;
    });
  }

  async like(postId: string): Promise<void> {
    let errorResponse: any;
    try {
      await this.postService.likePost(postId);
      this.filter();
    } catch (error: any) {
      errorResponse = error.error;
      this.sharedService.errorLog(errorResponse);
    }
  }

  async dislike(postId: string): Promise<void> {
    let errorResponse: any;
    try {
      await this.postService.dislikePost(postId);
      this.filter();
    } catch (error: any) {
      errorResponse = error.error;
      this.sharedService.errorLog(errorResponse);
    }
  }

  isLogged() {
    const userId = this.localStorageService.get("user_id");

    if (userId) {
      this.showButtons = true;
    }
  }
}

interface Filter {
  text: string;
  date: Date;
}
