import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { HeaderMenus } from "src/app/Models/header-menus.dto";
import { UserDTO } from "src/app/Models/user.dto";
import { HeaderMenusService } from "src/app/Services/header-menus.service";
import { SharedService } from "src/app/Services/shared.service";
import { UserService } from "src/app/Services/user.service";
import { formatDate } from "@angular/common";
import { regexValidator } from "src/app/Services/regex-validator";
import { logFormErrors } from "src/app/Services/log.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerUser: UserDTO;

  name: FormControl;
  surname_1: FormControl;
  surname_2: FormControl;
  alias: FormControl;
  birth_date: FormControl;
  email: FormControl;
  password: FormControl;

  registerForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private router: Router
  ) {
    this.registerUser = new UserDTO("", "", "", "", new Date(0), "", "");
    this.isValidForm = null;

    this.name = new FormControl(this.registerUser.name, [
      Validators.required,
      Validators.min(5),
      Validators.max(25),
    ]);
    this.surname_1 = new FormControl(this.registerUser.surname_1, [
      Validators.required,
      Validators.min(5),
      Validators.max(25),
    ]);
    this.surname_2 = new FormControl(this.registerUser.surname_2, [
      Validators.min(5),
      Validators.max(25),
    ]);
    this.alias = new FormControl(this.registerUser.alias, [
      Validators.required,
      Validators.min(5),
      Validators.max(25),
    ]);
    this.birth_date = new FormControl(this.registerUser.birth_date, [
      Validators.required,
      regexValidator(/^\d{4}-\d{2}-\d{2}$/),
    ]);
    this.email = new FormControl(this.registerUser.email, [Validators.email]);
    this.password = new FormControl(this.registerUser.password, [
      Validators.required,
      Validators.min(8),
      Validators.max(16),
    ]);

    this.registerForm = this.formBuilder.group({
      name: this.name,
      surname_1: this.surname_1,
      surname_2: this.surname_2,
      alias: this.alias,
      birth_date: this.birth_date,
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  async register(): Promise<void> {
    console.log("register()", this.registerForm.value);

    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;

    if (this.registerForm.invalid) {
      logFormErrors(this.registerForm);
      return;
    }

    this.isValidForm = true;
    this.registerUser = this.registerForm.value;

    try {
      await this.userService.register(this.registerUser);
      responseOK = true;
    } catch (error: any) {
      responseOK = false;
      errorResponse = error.error;

      const headerInfo: HeaderMenus = {
        showAuthSection: false,
        showNoAuthSection: true,
      };
      this.headerMenusService.headerManagement.next(headerInfo);

      this.sharedService.errorLog(errorResponse);
    }

    await this.sharedService.managementToast(
      "registerFeedback",
      responseOK,
      errorResponse
    );

    if (responseOK) {
      // Reset the form
      this.registerForm.reset();
      // After reset form we set birthDate to today again (is an example)
      this.birth_date.setValue(formatDate(new Date(), "yyyy-MM-dd", "en"));
      this.router.navigateByUrl("home");
    }
  }
}
