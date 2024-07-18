import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CategoriesListComponent } from "./categories-list.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { CategoryDTO } from "src/app/Models/category.dto";
import { of } from "rxjs";
import { CategoryService } from "src/app/Services/category.service";
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

class TemporalComponentForRoutes {}

describe("CategoriesListComponent", () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: "user/category/",
            component: TemporalComponentForRoutes,
          },
        ]),
      ],
      declarations: [CategoriesListComponent],
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
    fixture = TestBed.createComponent(CategoriesListComponent);
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

  it("loadCategories success", () => {
    const categorySvc = fixture.debugElement.injector.get(CategoryService);
    const listCategories: CategoryDTO[] = [];

    const userId = "1";
    localStorageService.get.and.returnValue(userId);

    const spy = spyOn(categorySvc, "getCategoriesByUserId").and.returnValue(
      of(listCategories)
    );

    component["loadCategories"]();

    expect(localStorageService.get).toHaveBeenCalledWith("user_id");
    expect(spy).toHaveBeenCalled();
    expect(component.categories).toEqual(listCategories);
  });

  it("createCategory success call to navigateByUrl", () => {
    const spy = spyOn(router, 'navigateByUrl');

    component["createCategory"]();

    expect(spy).toHaveBeenCalledWith('/user/category/');
  });

  it("upateCategory success call with arg to navigateByUrl", () => {
    const spy = spyOn(router, 'navigateByUrl');
    const categoryId = "1"

    component["updateCategory"](categoryId);

    expect(spy).toHaveBeenCalledWith(`/user/category/${categoryId}`);
  });
});
