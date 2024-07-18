import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducers";
import * as AuthAction from "../actions";
import { AuthDTO } from "../models/auth.dto";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [
    trigger("fadeInOut", [
      // Initial state when element enters the view
      state("void", style({ opacity: 0.2 })),
      // Transition when element enters or leaves the view
      transition("void => *", [
        // Animate the change in opacity over 1500ms
        animate(1500),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.email = new FormControl("", [
      Validators.required,
      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
    ]);

    this.password = new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  login(): void {
    const credentials: AuthDTO = {
      email: this.email.value,
      password: this.password.value,
      user_id: "",
      access_token: "",
    };

    this.store.dispatch(AuthAction.login({ credentials }));
  }
}
