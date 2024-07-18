import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
} from "@angular/core";
import { AppState } from "./app.reducers";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  title = "blog-uoc-project-front";

  private authLoading: boolean = false;
  private userLoading: boolean = false;
  private postsLoading: boolean = false;
  private categoriesLoading: boolean = false;

  isLoading: boolean = false;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.store.select("auth").subscribe((auth) => {
      this.authLoading = auth.loading;
      this.checkLoading();
      this.cdr.detectChanges();
    });

    this.store.select("user").subscribe((user) => {
      this.userLoading = user.loading;
      this.checkLoading();
      this.cdr.detectChanges();
    });

    this.store.select("posts").subscribe((posts) => {
      this.postsLoading = posts.loading;
      this.checkLoading();
      this.cdr.detectChanges();
    });

    this.store.select("categories").subscribe((categories) => {
      this.categoriesLoading = categories.loading;
      this.checkLoading();
      this.cdr.detectChanges();
    });
  }

  private checkLoading() {
    this.isLoading =
      this.authLoading ||
      this.userLoading ||
      this.postsLoading ||
      this.categoriesLoading;
  }
}
