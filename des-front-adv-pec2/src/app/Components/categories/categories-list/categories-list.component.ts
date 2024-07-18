import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppState } from "src/app/app.reducer";
import { CategoryDTO } from "src/app/Models/category.dto";
import { CategoryService } from "src/app/Services/category.service";
//import { LocalStorageService } from "src/app/Services/local-storage.service";
import { SharedService } from "src/app/Services/shared.service";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html",
  styleUrls: ["./categories-list.component.scss"],
})
export class CategoriesListComponent {
  categories!: CategoryDTO[];
  private userId: string = "";

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private store: Store<AppState>,
    //private localStorageService: LocalStorageService,
    private sharedService: SharedService
  ) {
    this.store
      .select((AppState) => AppState.auth.credentials.user_id)
      .subscribe((user_id) => {
        this.userId = user_id;
      });
    this.loadCategories();
  }

  private async loadCategories(): Promise<void> {
    let errorResponse: any;
    //const userId = this.localStorageService.get("user_id");
    if (this.userId) {
      this.categoryService
        .getCategoriesByUserId(this.userId)
        .pipe(
          catchError((err: any) => {
            if (!(err instanceof HttpErrorResponse)) {
              console.error("Categories list loadCategories", err);
            }
            return throwError(err);
          })
        )
        .subscribe(
          (response) => {
            this.categories = response;
          },
          (err: HttpErrorResponse) => {
            errorResponse = err.error;
            this.sharedService.errorLog(errorResponse);
          },
          () => {}
        );
    }
  }

  createCategory(): void {
    this.router.navigateByUrl("/user/category/");
  }

  updateCategory(categoryId: string): void {
    this.router.navigateByUrl("/user/category/" + categoryId);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    let errorResponse: any;

    // show confirmation popup
    let result = confirm(
      "Confirm delete category with id: " + categoryId + " ."
    );
    if (result) {
      this.categoryService
        .deleteCategory(categoryId)
        .pipe(
          catchError((err: any) => {
            if (!(err instanceof HttpErrorResponse)) {
              console.error("Categories list deleteCategory", err);
            }
            return throwError(err);
          })
        )
        .subscribe(
          (response) => {
            const rowsAffected = response.affected;
            if (rowsAffected > 0) {
              this.loadCategories();
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
