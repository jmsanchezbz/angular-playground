import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryDTO } from "src/app/Models/category.dto";
import { PostDTO } from "src/app/Models/post.dto";
import { CategoryService } from "src/app/Services/category.service";
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { PostService } from "src/app/Services/post.service";
import { regexValidator } from "src/app/Services/regex-validator";
import { SharedService } from "src/app/Services/shared.service";

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"],
})
export class PostFormComponent implements OnInit {
  post: PostDTO;
  title: UntypedFormControl;
  description: UntypedFormControl;
  publication_date: UntypedFormControl;
  categories: UntypedFormControl;
  selectedCategories: string[];

  lst_categories: CategoryDTO[];

  postForm: FormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private validRequest: boolean;
  private postId: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    private categoryService: CategoryService,
    private datePipe: DatePipe
  ) {
    this.isValidForm = null;
    this.isUpdateMode = false;
    this.validRequest = false;
    this.postId = this.activatedRoute.snapshot.paramMap.get("id");
    this.selectedCategories = [];
    this.lst_categories = [];

    this.post = new PostDTO("", "", 0, 0, new Date(0));

    this.title = new UntypedFormControl(this.post.title, [
      Validators.required,
      Validators.max(55),
    ]);
    this.description = new UntypedFormControl(this.post.description, [
      Validators.required,
      Validators.max(255),
    ]);
    this.publication_date = new UntypedFormControl(this.post.publication_date, [
      Validators.required,
      regexValidator(/^\d{4}-\d{2}-\d{2}$/),
    ]);
    this.categories = new UntypedFormControl(this.post.categories);

    this.postForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      publication_date: this.publication_date,
      categories: this.categories,
    });
  }

  async ngOnInit(): Promise<void> {
    let errorResponse: any;

    const user_id = this.localStorageService.get("user_id");
    if (user_id) {
      this.lst_categories = await this.categoryService.getCategoriesByUserId(
        user_id
      );
    }

    // update
    if (this.postId) {
      this.isUpdateMode = true;
      try {
        this.post = await this.postService.getPostById(this.postId);
        console.log("onInit", this.post);

        this.title.setValue(this.post.title);
        this.description.setValue(this.post.description);
        this.publication_date.setValue(
          this.datePipe.transform(this.post.publication_date, "yyyy-MM-dd")
        );
        this.categories.setValue(this.post.categories);
        this.selectedCategories = this.post.categories.map(c => c.categoryId);

        this.postForm = this.formBuilder.group({
          title: this.title,
          description: this.description,
          publication_date: this.publication_date,
          categories: this.categories,
        });
      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    }
  }

  private async editPost(): Promise<boolean> {
    console.log("editPost:", this.postForm.value);

    let errorResponse: any;
    let responseOK: boolean = false;

    if (this.postId) {
      const userId = this.localStorageService.get("user_id");
      if (userId) {
        this.post.userId = userId;
        try {
          await this.postService.updatePost(this.postId, this.post);
          responseOK = true;
        } catch (error: any) {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }

        await this.sharedService.managementToast(
          "postFeedback",
          responseOK,
          errorResponse
        );

        if (responseOK) {
          this.router.navigateByUrl("posts");
        }
      }
    }
    return responseOK;
  }

  private async createPost(): Promise<boolean> {
    console.log("createPost:", this.postForm.value);

    let errorResponse: any;
    let responseOK: boolean = false;
    const userId = this.localStorageService.get("user_id");

    if (userId) {
      this.post.userId = userId;

      try {
        await this.postService.createPost(this.post);
        responseOK = true;
      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }

      await this.sharedService.managementToast(
        "postFeedback",
        responseOK,
        errorResponse
      );

      if (responseOK) {
        this.router.navigateByUrl("posts");
      }
    }

    return responseOK;
  }

  async savePost() {
    console.log("savePost:", this.postForm.value);

    this.isValidForm = false;

    if (this.postForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.post = this.postForm.value;

    if (this.isUpdateMode) {
      this.validRequest = await this.editPost();
    } else {
      this.validRequest = await this.createPost();
    }
  }
}
