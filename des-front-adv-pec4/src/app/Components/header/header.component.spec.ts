import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HeaderComponent } from "./header.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Router } from "@angular/router";

class TemporalComponentForRoutes {}

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: "home",
            component: TemporalComponentForRoutes,
          },
          {
            path: "login",
            component: TemporalComponentForRoutes,
          },
          {
            path: "register",
            component: TemporalComponentForRoutes,
          },
          {
            path: "posts",
            component: TemporalComponentForRoutes,
          },
          {
            path: "categories",
            component: TemporalComponentForRoutes,
          },
          {
            path: "profile",
            component: TemporalComponentForRoutes,
          },
        ]),
      ],
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    //instancia y pasa onInit
    fixture.detectChanges();
  });

  it("Should navigate to home", () => {
    const route = "home";
    const router = TestBed.inject(Router);
    const spy = spyOn(router, "navigateByUrl");
    component.navigationTo(route);
    expect(spy).toHaveBeenCalledWith(route);
  });

  it("Should navigate to login", () => {
    const route = "login";
    const router = TestBed.inject(Router);
    const spy = spyOn(router, "navigateByUrl");
    component.navigationTo(route);
    expect(spy).toHaveBeenCalledWith(route);
  });

  it("Should navigate to register", () => {
    const route = "register";
    const router = TestBed.inject(Router);
    const spy = spyOn(router, "navigateByUrl");
    component.navigationTo(route);
    expect(spy).toHaveBeenCalledWith(route);
  });

  it("Should navigate to posts", () => {
    const route = "posts";
    const router = TestBed.inject(Router);
    const spy = spyOn(router, "navigateByUrl");
    component.navigationTo(route);
    expect(spy).toHaveBeenCalledWith(route);
  });

  it("Should navigate to categories", () => {
    const route = "categories";
    const router = TestBed.inject(Router);
    const spy = spyOn(router, "navigateByUrl");
    component.navigationTo(route);
    expect(spy).toHaveBeenCalledWith(route);
  });

  it("Should navigate to profile", () => {
    const route = "profile";
    const router = TestBed.inject(Router);
    const spy = spyOn(router, "navigateByUrl");
    component.navigationTo(route);
    expect(spy).toHaveBeenCalledWith(route);
  });

  it("View header checked unauthenticated  menu items", () => {
    const compiled = fixture.nativeElement;

    const dashboardBtn = compiled.querySelector("button#btnDashboard");
    const homeBtn = compiled.querySelector("button#btnHome");
    const loginBtn = compiled.querySelector("button#btnLogin");
    const registerBtn = compiled.querySelector("button#btnRegister");

    expect(dashboardBtn).toBeTruthy();
    expect(dashboardBtn.textContent).toContain('Dashboard');

    expect(homeBtn).toBeTruthy();
    expect(homeBtn.textContent).toContain('Home');

    expect(loginBtn).toBeTruthy();
    expect(loginBtn.textContent).toContain('Login');

    expect(registerBtn).toBeTruthy();
    expect(registerBtn.textContent).toContain('Register');
  });

  it("View header checked authenticated  menu items", () => {
    component.showAuthSection = true;
    component.showNoAuthSection = false;

    //renderizamos la pantalla con los cambios de las variables
    fixture.detectChanges();

    const compiled = fixture.nativeElement;

    const dashboardBtn = compiled.querySelector("button#btnDashboard");
    const homeBtn = compiled.querySelector("button#btnHome");
    const postsBtn = compiled.querySelector("button#btnPosts");
    const categoriesBtn = compiled.querySelector("button#btnCategories");
    const profileBtn = compiled.querySelector("button#btnProfile");
    const logoutBtn = compiled.querySelector("button#btnLogout");

    expect(dashboardBtn).toBeTruthy();
    expect(dashboardBtn.textContent).toContain('Dashboard');

    expect(homeBtn).toBeTruthy();
    expect(homeBtn.textContent).toContain('Home');

    expect(postsBtn).toBeTruthy();
    expect(postsBtn.textContent).toContain('Admin posts');

    expect(categoriesBtn).toBeTruthy();
    expect(categoriesBtn.textContent).toContain('Admin categories');

    expect(profileBtn).toBeTruthy();
    expect(profileBtn.textContent).toContain('Profile');

    expect(logoutBtn).toBeTruthy();
    expect(logoutBtn.textContent).toContain('Logout');
  });
});
