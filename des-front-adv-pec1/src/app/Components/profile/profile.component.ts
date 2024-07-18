import { formatDate } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";
import { UserDTO } from "src/app/Models/user.dto";
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { logFormErrors } from "src/app/Services/log.service";
import { regexValidator } from "src/app/Services/regex-validator";
import { SharedService } from "src/app/Services/shared.service";
import { UserService } from "src/app/Services/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  profileUser: UserDTO;

  name: FormControl;
  surname_1: FormControl;
  surname_2: FormControl;
  alias: FormControl;
  birth_date: FormControl;
  email: FormControl;
  password: FormControl;

  profileForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService
  ) {
    this.profileUser = new UserDTO("", "", "", "", new Date(0), "", "");
    this.isValidForm = null;

    this.name = new FormControl(this.profileUser.name, [
      Validators.required,
      Validators.min(5),
      Validators.max(25),
    ]);
    this.surname_1 = new FormControl(this.profileUser.surname_1, [
      Validators.required,
      Validators.min(5),
      Validators.max(25),
    ]);
    this.surname_2 = new FormControl(this.profileUser.surname_2, [
      Validators.min(5),
      Validators.max(25),
    ]);
    this.alias = new FormControl(this.profileUser.alias, [
      Validators.required,
      Validators.min(5),
      Validators.max(25),
    ]);
    this.birth_date = new FormControl(this.profileUser.birth_date, [
      Validators.required,
      regexValidator(/^\d{4}-\d{2}-\d{2}$/),
    ]);
    this.email = new FormControl(this.profileUser.email, [Validators.email]);
    this.password = new FormControl(this.profileUser.password, [
      Validators.required,
      Validators.min(8),
      Validators.max(16),
    ]);

    this.profileForm = this.formBuilder.group({
      name: this.name,
      surname_1: this.surname_1,
      surname_2: this.surname_2,
      alias: this.alias,
      birth_date: this.birth_date,
      email: this.email,
      password: this.password,
    });
  }

  async ngOnInit(): Promise<void> {
    let errorResponse: any;

    // load user data
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      try {
        const userData = await this.userService.getUSerById(userId);

        this.name.setValue(userData.name);
        this.surname_1.setValue(userData.surname_1);
        this.surname_2.setValue(userData.surname_2);
        this.alias.setValue(userData.alias);
        this.birth_date.setValue(
          formatDate(userData.birth_date, 'yyyy-MM-dd', 'en')
        );
        this.email.setValue(userData.email);

        this.profileForm = this.formBuilder.group({
          name: this.name,
          surname_1: this.surname_1,
          surname_2: this.surname_2,
          alias: this.alias,
          birth_date: this.birth_date,
          email: this.email,
          password: this.password,
        });
      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    }
  }

  async updateUser(): Promise<void> {
    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;

    if (this.profileForm.invalid) {
      logFormErrors(this.profileForm);
      return;
    }

    this.isValidForm = true;
    this.profileUser = this.profileForm.value;

    const userId = this.localStorageService.get("user_id");

    if (userId) {
      try {
        await this.userService.updateUser(userId, this.profileUser);
        responseOK = true;
      } catch (error: any) {
        responseOK = false;
        errorResponse = error.error;

        this.sharedService.errorLog(errorResponse);
      }
    }

    await this.sharedService.managementToast(
      "profileFeedback",
      responseOK,
      errorResponse
    );
  }
}
