import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { AppState } from "src/app/app.reducer";
import { CategoryDTO } from "src/app/Models/category.dto";
import { CategoryService } from "src/app/Services/category.service";
//import { LocalStorageService } from "src/app/Services/local-storage.service";
import { SharedService } from "src/app/Services/shared.service";

@Component({
  selector: "app-category-form",
  templateUrl: "./category-form.component.html",
  styleUrls: ["./category-form.component.scss"],
})
export class CategoryFormComponent implements OnInit {
  category: CategoryDTO;
  title: UntypedFormControl;
  description: UntypedFormControl;
  css_color: UntypedFormControl;

  categoryForm: UntypedFormGroup;
  isValidForm: boolean | null;

  private access_token: string | null = null;
  private userId: string = "";

  private isUpdateMode: boolean;
  private validRequest: boolean;
  private categoryId: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private store: Store<AppState> //private localStorageService: LocalStorageService
  ) {
    this.isValidForm = null;
    this.categoryId = this.activatedRoute.snapshot.paramMap.get("id");
    this.category = new CategoryDTO("", "", "");
    this.isUpdateMode = false;
    this.validRequest = false;

    this.title = new UntypedFormControl(this.category.title, [
      Validators.required,
      Validators.maxLength(55),
    ]);

    this.description = new UntypedFormControl(this.category.description, [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.css_color = new UntypedFormControl(this.category.css_color, [
      Validators.required,
      Validators.maxLength(7),
    ]);

    this.categoryForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      css_color: this.css_color,
    });
  }

  async ngOnInit(): Promise<void> {
    let errorResponse: any;

    this.store
      .select((AppState) => AppState.auth.credentials.user_id)
      .subscribe((user_id) => {
        this.userId = user_id;
      });

    // update
    if (this.categoryId) {
      this.isUpdateMode = true;

      this.categoryService
        .getCategoryById(this.categoryId)
        .pipe(
          catchError((err: any) => {
            if (!(err instanceof HttpErrorResponse)) {
              console.error("Categories form init", err);
            }
            return throwError(err);
          }),
          finalize(() => {
            this.title.setValue(this.category.title);

            this.description.setValue(this.category.description);

            this.css_color.setValue(this.category.css_color);

            this.categoryForm = this.formBuilder.group({
              title: this.title,
              description: this.description,
              css_color: this.css_color,
            });
          })
        )
        .subscribe(
          (res) => {
            this.category = res;
          },
          (err: HttpErrorResponse) => {
            errorResponse = err.error;
            this.sharedService.errorLog(errorResponse);
          },
          () => {}
        );
    }
  }

  private async editCategory(): Promise<boolean> {
    let errorResponse: any;
    let responseOK: boolean = false;
    if (this.categoryId) {
      //const userId = this.localStorageService.get("user_id");
      if (this.userId) {
        this.category.userId = this.userId;

        this.categoryService
          .updateCategory(this.categoryId, this.category)
          .pipe(
            catchError((err: any) => {
              if (!(err instanceof HttpErrorResponse)) {
                console.error("Categories form editCategory", err);
              }
              return throwError(err);
            }),
            finalize(async () => {
              await this.sharedService.managementToast(
                "categoryFeedback",
                responseOK,
                errorResponse
              );

              if (responseOK) {
                this.router.navigateByUrl("categories");
              }
            })
          )
          .subscribe(
            (response) => {
              responseOK = true;
            },
            (err: HttpErrorResponse) => {
              errorResponse = err.error;
              this.sharedService.errorLog(errorResponse);
            },
            () => {}
          );
      }
    }
    return responseOK;
  }

  private async createCategory(): Promise<boolean> {
    let errorResponse: any;
    let responseOK: boolean = false;
    //const userId = this.localStorageService.get("user_id");
    if (this.userId) {
      this.category.userId = this.userId;
      this.categoryService
        .createCategory(this.category)
        .pipe(
          catchError((err: any) => {
            if (!(err instanceof HttpErrorResponse)) {
              console.error("Categories form createCategory", err);
            }
            return throwError(err);
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              "categoryFeedback",
              responseOK,
              errorResponse
            );

            if (responseOK) {
              this.router.navigateByUrl("categories");
            }
          })
        )
        .subscribe(
          (res) => {
            responseOK = true;
          },
          (err: HttpErrorResponse) => {
            errorResponse = err.error;
            this.sharedService.errorLog(errorResponse);
          },
          () => {}
        );
    }

    return responseOK;
  }

  async saveCategory() {
    this.isValidForm = false;

    if (this.categoryForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.category = this.categoryForm.value;

    if (this.isUpdateMode) {
      this.validRequest = await this.editCategory();
    } else {
      this.validRequest = await this.createCategory();
    }
  }
}
