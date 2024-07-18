import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from "rxjs";
import { CategoryService } from "src/app/Services/category.service";
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { PostsListComponent } from "./posts-list.component";
import { PostService } from "src/app/Services/post.service";
import { PostDTO } from "src/app/Models/post.dto";

class TemporalComponentForRoutes {}

describe("PostsListComponent", () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: "user/post/",
            component: TemporalComponentForRoutes,
          },
        ]),
      ],
      declarations: [PostsListComponent],
      providers: [
        CategoryService,
        {
          provide: LocalStorageService,
          useValue: jasmine.createSpyObj("LocalStorageService", ["get"]),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    localStorageService = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it("Should create", () => {
    expect(component).toBeTruthy();
  });

  it("loadPosts success", () => {
    const postSvc = fixture.debugElement.injector.get(PostService);
    const listPosts: PostDTO[] = [];

    const userId = "1";
    localStorageService.get.and.returnValue(userId);

    const spy = spyOn(postSvc, "getPostsByUserId").and.returnValue(
      of(listPosts)
    );

    component["loadPosts"]();

    expect(localStorageService.get).toHaveBeenCalledWith("user_id");
    expect(spy).toHaveBeenCalled();
    expect(component.posts).toEqual(listPosts);
  });

  it("createPost success call to navigateByUrl", () => {
    const spy = spyOn(router, "navigateByUrl");

    component["createPost"]();

    expect(spy).toHaveBeenCalledWith("/user/post/");
  });

  it("upatePost success call with arg to navigateByUrl", () => {
    const spy = spyOn(router, "navigateByUrl");
    const postId = "1";

    component["updatePost"](postId);

    expect(spy).toHaveBeenCalledWith(`/user/post/${postId}`);
  });
});
